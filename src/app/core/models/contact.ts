export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export type MessageStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

export interface ContactMessage extends ContactRequest {
  id: number;
  status: MessageStatus;
  createdAt: string;
  readAt?: string;
}
