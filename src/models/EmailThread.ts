export interface EmailThread {
  id: string;
  subject: string;
  snippet: string;
  lastMessageAt: Date;
  userId: string;
  messageCount: number;
  unreadCount: number;
  draftIds: string[];
  historyId: string;
  messages: EmailMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  historyId: string;
  userId: string;
  from: EmailParticipant;
  to: EmailParticipant[];
  cc: EmailParticipant[];
  bcc: EmailParticipant[];
  subject: string;
  snippet: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  attachments: EmailAttachment[];
}

export interface EmailParticipant {
  email: string;
  name: string;
}

export interface EmailAttachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
}

export interface ThreadParticipant {
  id: string;
  email: string;
  name: string;
  role: string;
}