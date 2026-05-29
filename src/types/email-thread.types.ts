export interface EmailThread {
  id: string;
  subject: string;
  snippet: string;
  messageIds: string[];
  createdAt: Date;
  updatedAt: Date;
  lastMessageTimestamp: Date;
  messageCount: number;
  unreadCount: number;
  hasUnread: boolean;
  participants: Array<{
    name: string;
    email: string;
    avatar?: string;
  }>;
  messages: EmailMessage[];
  isStarred: boolean;
  isArchived: boolean;
}