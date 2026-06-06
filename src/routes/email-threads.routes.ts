import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { EmailThreadService } from '../services/email-thread.service';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const emailThreadService = new EmailThreadService();

/**
 * @openapi
 * /api/v1/email-threads:
 *   get:
 *     summary: List email threads for the authenticated user
 *     tags: [Email Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter threads
 *       - in: query
 *         name: folder
 *         schema:
 *           type: string
 *         description: Filter by folder (inbox, sent, drafts, etc.)
 *     responses:
 *       200:
 *         description: List of email threads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 threads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmailThread'
 *                 totalCount:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, asyncHandler(async (req, res) => {
  const { limit = 20, offset = 0, search, folder } = req.query;
  const userId = req.user.id;
  
  const result = await emailThreadService.getThreads(userId, {
    limit: parseInt(limit as string),
    offset: parseInt(offset as string),
    search: search as string,
    folder: folder as string
  });
  
  res.json(result);
}));

/**
 * @openapi
 * /api/v1/email-threads/{threadId}:
 *   get:
 *     summary: Get a single email thread with all related messages
 *     tags: [Email Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email thread with messages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailThreadDetail'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Thread not found
 */
router.get('/:threadId', authenticateToken, asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const userId = req.user.id;
  
  const thread = await emailThreadService.getThreadById(threadId, userId);
  
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }
  
  res.json(thread);
}));

export default router;