 ```diff
--- /dev/null
+++ b/src/routes/emailThreads.ts
@@ -0,0 +1,1 @@
+import { Router } from 'express';
+import { PrismaClient } from '@prisma/client';
+import { authenticate } from '../middleware/auth';
+import { validateQuery, validateParams } from '../middleware/validation';
+import { z } from 'zod';
+
+const router = Router();
+const prisma = new PrismaClient();
+
+const listThreadsQuerySchema = z.object({
+  page: z.coerce.number().min(1).default(1),
+  limit: z.coerce.number().min(1).max(100).default(20),
+  search: z.string().optional(),
+  folder: z.string().optional(),
+  isRead: z.coerce.boolean().optional(),
+  isStarred: z.coerce.boolean().optional(),
+  hasAttachments: z.coerce.boolean().optional(),
+  accountId: z.string().uuid().optional(),
+  label: z.string().optional(),
+  sortBy: z.enum(['date', 'relevance']).default('date'),
+  sortOrder: z.enum('asc', 'desc']).default('desc'),
+});
+
+const threadParamsSchema = z.object({
+  threadId: z.string().uuid(),
+});
+
+router.get(
+  '/',
+  authenticate,
+  validateQuery(listThreadsQuerySchema),
+  async (req, res, next) => {
+    try {
+      const userId = req.user!.id;
+      const {
+        page,
+        limit,
+        search,
+        folder,
+        isRead,
+        isStarred,
+        hasAttachments,
+        accountId,
+        label,
+        sortBy,
+        sortOrder,
+      } = req.query as z.infer<typeof listThreadsQuerySchema>;
+
+      const skip = (page - 1) * limit;
+
+      const where: any = {
+        userId,
+        messages: {
+          some: {
+            isArchived: false,
+            isDeleted: false,
+          },
+        },
+      };
+
+      if (accountId) {
+        where.accountId = accountId;
+      }
+
+      if (folder) {
+        where.messages.some.folder = folder;
+      }
+
+      if (isRead !== undefined) {
+        where.messages.some.isRead = isRead;
+      }
+
+      if (isStarred !== undefined) {
+        where.messages.some.isStarred = isStarred;
+      }
+
+      if (hasAttachments !== undefined) {
+        where.messages.some.hasAttachments = hasAttachments;
+      }
+
+      if (label) {
+        where.messages.some.labels = {
+          has: label,
+        };
+      }
+
+      if (search) {
+        where.messages.some.OR = [
+          { subject: { contains: search, mode: 'insensitive' } },
+          { from: { contains: search, mode: 'insensitive' } },
+          { to: { contains: search, mode: 'insensitive' } },
+          { body: { contains: search, mode: 'insensitive' } },
+        ];
+      }
+
+      const [threads, total] = await Promise.all([
+        prisma.emailThread.findMany({
+          where,
+          include: {
+            messages: {
+              where: {
+                isArchived: false,
+                isDeleted: false,
+              },
+              orderBy: {
+                sentAt: sortOrder,
+              },
+              take: 1,
+            },
+            _count: {
+              select: {
+                messages: {
+                  where: {
+                    isArchived: false,
+                    isDeleted: false,
+                  },
+                },
+              },
+            },
+          },
+          orderBy:
+            sortBy === '_orders.date'
+              ? { lastMessageAt: sortOrder }
+              : { relevanceScore: 'desc' },
+          skip,
+          take: limit,
+        }),
+        prisma.emailThread.count({ where }),
+      ]);
+
+      const formattedThreads = threads.map((thread) => ({
+        id: thread.id,
+        subject: thread.subject,
+        accountId: thread.accountId,
+        messageCount: thread._count.messages,
+        lastMessageAt: thread.lastMessageAt,
+        isRead: thread.messages[0]?.isRead ?? false,
+        isStarred: thread.messages.some((m) => m.isStarred),
+        hasAttachments: thread.messages.some((m) => m.hasAttachments),
+        previewMessage: thread.messages[0]
+          ? {
+              id: thread.messages[0].id,
+              from: thread.messages[0].from,
+              to: thread.messages[0].to,
+              subject: thread.messages[0].subject,
+              snippet: thread.messages[0].snippet,
+              sentAt: thread.messages[0].sentAt,
+            }
+          : null,
+      }));
+
+      res.json({
+        data: formattedThreads,
+        pagination: {
+          page,
+          limit,
+          total,
+          totalPages: Math.ceil(total / limit),
+        },
+      });
+    } catch (error) {
+      next(error);
+    }
+  }
+);
+
+router.get(
+  '/:threadId',
+  authenticate,
+  validateParams(threadParamsSchema),
+  async (req, res, next) => {
+    try {
+      const userId = req.user!.id;
+      const { threadId } = req.params;
+
+      const thread = await prisma.emailThread.findFirst({
+        where: {
+          id: threadId,
+          userId,
+        },
+        include: {
+          messages: {
+            where: {
+              isArchived: false,
+              isDeleted: false,
+            },
+            orderBy: {
+              sentAt: 'asc',
+            },
+            include: {
+              attachments: true,
+              draft: true,
+            },
+          },
+          account: {
+            select: {
+              id: true,
+              email: true,
+              provider: true,
+            },
+          },
+        },
+      });
+
+      if (!thread) {
+        return res.status(404).json({ error: 'Thread not found' });
+      }
+
+      const messageCount = thread.messages.length;
+      const unreadCount = thread.messages.filter((m) => !m.isRead).length;
+      const hasDraft = thread.messages.some((m) => m.draft !== null);
+
+      res.json({
+        id: thread.id,
+        subject: thread.subject,
+        account: thread.account,
+        messageCount,
+        unreadCount,
+        has