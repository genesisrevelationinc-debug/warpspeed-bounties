 ```diff
--- /dev/null
+++ b/src/routes/emailThreads.ts
@@ -0,0 +1,245 @@
+import { Router } from 'express';
+import { PrismaClient } from '@prisma/client';
+import { authenticateUser } from '../middleware/auth';
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
+  folder: z.string().optional(),
+  isRead: z.coerce.boolean().optional(),
+  isStarred: z.coerce.boolean().optional(),
+  hasAttachments: z.coerce.boolean().optional(),
+  accountId: z.string().optional(),
+  sortBy: z.enum(['lastActivityAt', 'createdAt']).default('lastActivityAt'),
+  sortOrder: z.enum(['asc', 'desc']).default('desc'),
+});
+
+const threadIdSchema = z.object({
+  threadId: z.string().uuid(),
+});
+
+/**
+ * @swagger
+ * /api/email-threads:
+ *   get:
+ *     summary: List email threads for the authenticated user
+ *     tags: [Email Threads]
+ *     security:
+ *       - bearerAuth: []
+ *     parameters:
+ *       - in: query
+ *         name: page
+ *         schema: { type: integer, default: 1 }
+ *       - in: query
+ *         name: limit
+ *         schema: { type: integer, default: 20, maximum: 100 }
+ *       - in: query
+ *         name: search
+ *         schema: { type: string }
+ *       - in: query
+ *         name: folder
+ *         schema: { type: string }
+ *       - in: query
+ *         name: isRead
+ *         schema: { type: boolean }
+ *       - in: query
+ *         name: isStarred
+ *         schema: { type: boolean }
+ *       - in: query
+ *         name: hasAttachments
+ *         schema: { type: boolean }
+ *       - in: query
+ *         name: accountId
+ *         schema: { type: string }
+ *       - in: query
+ *         name: sortBy
+ *         schema: { type: string, enum: [lastActivityAt, createdAt], default: lastActivityAt }
+ *       - in: query
+ *         name: sortOrder
+ *         schema: { type: string, enum: [asc, desc], default: desc }
+ *     responses:
+ *       200:
+ *         description: List of email threads
+ */
+router.get(
+  '/',
+  authenticateUser,
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
+        sortBy,
+        sortOrder,
+      } = req.query as z.infer<typeof listThreadsQuerySchema>;
+
+      const skip = (page - 1) * limit;
+
+      const where: any = {
+        userId,
+        isArchived: false,
+        isDeleted: false,
+      };
+
+      if (accountId) {
+        where.accountId = accountId;
+      }
+
+      // Build message-level filters for thread aggregation
+      const messageWhere: any = {
+        isArchived: false,
+        isDeleted: false,
+      };
+
+      if (folder) {
+        messageWhere.folder = folder;
+      }
+      if (isRead !== undefined) {
+        messageWhere.isRead = isRead;
+      }
+      if (isStarred !== undefined) {
+        messageWhere.isStarred = isStarred;
+      }
+      if (hasAttachments !== undefined) {
+        messageWhere.hasAttachments = hasAttachments;
+      }
+
+      // Search across subject, body, sender, recipients
+      if (search) {
+        messageWhere.OR = [
+          { subject: { contains: search, mode: 'insensitive' } },
+          { body: { contains: search, mode: 'insensitive' } },
+          { from: { contains: search, mode: 'insensitive' } },
+          { to: { contains: search, mode: 'insensitive' } },
+        ];
+      }
+
+      const threads = await prisma.emailThread.findMany({
+        where,
+        include: {
+          messages: {
+            where: messageWhere,
+            orderBy: { sentAt: 'asc' },
+            select: {
+              id: true,
+              subject: true,
+              from: true,
+              to: true,
+              isRead: true,
+              isStarred: true,
+              isDraft: true,
+              sentAt: true,
+              folder: true,
+              hasAttachments: true,
+              preview: true,
+            },
+          },
+          _count: {
+            select: { messages: true },
+          },
+        },
+        orderBy: {
+          [sortBy]: sortOrder,
+        },
+        skip,
+        take: limit,
+      });
+
+      // Filter out threads with no visible messages after filters
+      const filteredThreads = threads.filter((t) => t.messages.length > 0);
+
+      // Calculate total for pagination
+      const totalResult = await prisma.emailThread.count({
+        where: {
+          ...where,
+          messages: {
+            some: messageWhere,
+          },
+        },
+      });
+
+      res.json({
+        data: filteredThreads.map((thread) => ({
+          ...thread,
+          messageCount: thread._count.messages,
+          _count: undefined,
+        })),
+        pagination: {
+          page,
+          limit,
+          total: totalResult,
+          totalPages: Math.ceil(totalResult / limit),
+        },
+      });
+    } catch (error) {
+      next(error);
+    }
+  }
+);
+
+/**
+ * @swagger
+ * /api/email-threads/{threadId}:
+ *   get:
+ *     summary: Open a single email thread with all related messages
+ *     tags: [Email