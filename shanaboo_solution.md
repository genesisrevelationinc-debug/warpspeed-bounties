 ```diff
--- /dev/null
+++ b/src/routes/emailThreads.ts
@@ -0,0 +1,245 @@
+import { Router } from 'express';
+import { PrismaClient, Prisma } from '@prisma/client';
+import { authenticateToken } from '../middleware/auth';
+import { validateQuery } from '../middleware/validation';
+import { z } from 'zod';
+
+const router = Router();
+const prisma = new PrismaClient();
+
+const listThreadsQuerySchema = z.object({
+  page: z.coerce.number().int().min(1).default(1),
+  limit: z.coerce.number().int().min(1).max(100).default(20),
+  search: z.string().optional(),
+  isRead: z.coerce.boolean().optional(),
+  isStarred: z.coerce.boolean().optional(),
+  label: z.string().optional(),
+  accountId: z.string().optional(),
+  sortBy: z.enum(['lastMessageAt', 'createdAt']).default('lastMessageAt'),
+  sortOrder: z.enum('asc', 'desc').default('desc'),
+});
+
+const threadDetailQuerySchema = z.object({
+  includeDrafts: z.coerce.boolean().default(true),
+});
+
+// List email threads for authenticated user
+router.get(
+  '/',
+  authenticateToken,
+  validateQuery(listThreadsQuerySchema),
+  async (req, res) => {
+    const userId = req.user!.id;
+    const {
+      page,
+      limit,
+      search,
+      isRead,
+      isStarred,
+      label,
+      accountId,
+      sortBy,
+      sortOrder,
+    } = req.query as unknown as z.infer<typeof listThreadsQuerySchema>;
+
+    const skip = (page - 1) * limit;
+
+    const where: Prisma.EmailThreadWhereInput = {
+      userId,
+      isArchived: false,
+      isDeleted: false,
+      ...(accountId && { emailAccountId: accountId }),
+      ...(isRead !== undefined && { isRead }),
+      ...(isStarred !== undefined && { isStarred }),
+      ...(label && { labels: { has: label } }),
+      ...(search && {
+        OR: [
+          { subject: { contains: search, mode: 'insensitive' } },
+          { preview: { contains: search, mode: 'insensitive' } },
+          {
+            messages: {
+              some: {
+                body: { contains: search, mode: 'insensitive' },
+              },
+            },
+          },
+        ],
+      }),
+    };
+
+    const [threads, total] = await Promise.all([
+      prisma.emailThread.findMany({
+        where,
+        orderBy: { [sortBy]: sortOrder },
+        skip,
+        take: limit,
+        include: {
+          _count: {
+            select: { messages: true },
+          },
+          lastMessage: {
+            select: {
+              id: true,
+              body: true,
+              sentAt: true,
+              sender: true,
+            },
+          },
+        },
+      }),
+      prisma.emailThread.count({ where }),
+    ]);
+
+    res.json({
+      data: threads,
+      meta: {
+        page,
+        limit,
+        total,
+        totalPages: Math.ceil(total / limit),
+      },
+    });
+  }
+);
+
+// Get single thread with messages
+router.get(
+  '/:id',
+  authenticateToken,
+  validateQuery(threadDetailQuerySchema),
+  async (req, res) => {
+    const userId = req.user!.id;
+    const threadId = req.params.id;
+    const { includeDrafts } = req.query as unknown as z.infer<
+      typeof threadDetailQuerySchema
+    >;
+
+    const thread = await prisma.emailThread.findFirst({
+      where: {
+        id: threadId,
+        userId,
+        isDeleted: false,
+      },
+      include: {
+        messages: {
+          where: {
+            isDeleted: false,
+            ...(includeDrafts === false && { isDraft: false }),
+          },
+          orderBy: { sentAt: 'asc' },
+          include: {
+            attachments: true,
+            sender: true,
+            recipients: true,
+          },
+        },
+        emailAccount: {
+          select: {
+            id: true,
+            email: true,
+            provider: true,
+          },
+        },
+      },
+    });
+
+    if (!thread) {
+      return res.status(404).json({ error: 'Thread not found' });
+    }
+
+    // Update isRead status when thread is opened
+    if (!thread.isRead) {
+      await prisma.emailThread.update({
+        where: { id: threadId },
+        data: { isRead: true },
+      });
+    }
+
+    res.json({ data: thread });
+  }
+);
+
+// Update thread (star, archive, read status)
+router.patch('/:id', authenticateToken, async (req, res) => {
+  const userId = req.user!.id;
+  const threadId = req.params.id;
+  const { isRead, isStarred, isArchived, labels } = req.body;
+
+  const existingThread = await prisma.emailThread.findFirst({
+    where: { id: threadId, userId },
+  });
+
+  if (!existingThread) {
+    return res.status(404).json({ error: 'Thread not found' });
+  }
+
+  const updatedThread = await prisma.emailThread.update({
+    where: { id: threadId },
+    data: {
+      ...(isRead !== undefined && { isRead }),
+      ...(isStarred !== undefined && { isStarred }),
+      ...(isArchived !== undefined && { isArchived }),
+      ...(labels && { labels }),
+    },
+  });
+
+  res.json({ data: updatedThread });
+});
+
+// Soft delete thread
+router.delete('/:id', authenticateToken, async (req, res) => {
+  const userId = req.user!.id;
+  const threadId = req.params.id;
+
+  const existingThread = await prisma.emailThread.findFirst({
+    where: { id: threadId, userId },
+  });
+
+  if (!existingThread) {
+    return res.status(404).json({ error: 'Thread not found' });
+  }
+
+  const updatedThread = await prisma.emailThread.update({
+    where: { id: threadId },
+    data: { isDeleted: true, deletedAt: new Date()