import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { EmailThreadService } from '../services/emailThreadService';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const emailThreadService = new EmailThreadService();

/**
 * @swagger
 * /api/email-threads:
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
 *         description: Number of threads to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Offset for pagination
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter threads
 *       - in: query
 *         name: includeArchived
 *         schema:
 *           type: boolean
 *         description: Include archived threads
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
router.get('/', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { limit = 20, offset = 0, search, includeArchived = false } = req.query;
  
  const result = await emailThreadService.listThreads(
    userId,
    parseInt(limit as string),
    parseInt(offset as string),
    search as string,
    includeArchived as boolean
  );
  
  res.json(result);
}));

/**
 * @swagger
 * /api/email-threads/{threadId}:
 *   get:
 *     summary: Get a specific email thread with all related messages
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
router.get('/:threadId', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { threadId } = req.params;
  
  const thread = await emailThreadService.getThreadById(userId, threadId);
  
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }
  
  res.json(thread);
}));

/**
 * @swagger
 * /api/email-threads/{threadId}/messages:
 *   get:
 *     summary: Get messages for a specific thread
 *     tags: [Email Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Messages in the thread
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmailMessage'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Thread not found
 */
router.get('/:threadId/messages', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { threadId } = req.params;
  const { limit = 50, offset = 0 } = req.query;
  
  const messages = await emailThreadService.getThreadMessages(
    userId, 
    threadId, 
    parseInt(limit as string), 
    parseInt(offset as string)
  );
  
  res.json({ messages });
}));

export default router;