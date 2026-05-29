import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// List email threads for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user as any;
    const threads = await prisma.emailThread.findMany({
      where: {
        userId: userId,
      },
      include: {
        messages: true,
        participants: true,
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    });
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch email threads' });
  }
});

// Get thread details with messages
router.get('/:threadId', authenticateToken, async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await prisma.emailThread.findUnique({
      where: {
        id: threadId,
      },
      include: {
        messages: {
          include: {
            attachments: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    res.json(thread);
  } catch (error) {
    res.status(500).json({ error: 'Thread not found' });
  }
});

// Create thread (for draft messages)
router.post('/', async (req, res) => {
  try {
    const { subject, messageId, userId } = req.body;
    
    const newThread = await prisma.emailThread.create({
      data: {
        subject,
        lastMessageAt: new Date(),
        userId: (req.user as any).userId,
        messages: {
          connect: { id: messageId }
        }
      },
      include: {
        messages: true
      }
    });
    
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create thread' });
  }
});

export default router;