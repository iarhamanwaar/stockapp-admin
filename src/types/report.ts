export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'rejected';
export type ReportType = 'chat' | 'product';

export interface ReportUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  image: string | null;
  video: string | null;
  senderId: string;
  senderName: string;
  createdAt: string;
}

export interface ReportProduct {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  status: string;
}

export interface ReportSeller {
  id: string;
  storeName: string;
  email: string;
  phoneNumber: string | null;
}

export interface BaseReport {
  id: string;
  type: ReportType;
  reason: string;
  status: ReportStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
  reporter: ReportUser;
}

export interface ChatReport extends BaseReport {
  type: 'chat';
  reportedUser: ReportUser;
  chatId: string;
  chatMessages: ChatMessage[];
}

export interface ProductReport extends BaseReport {
  type: 'product';
  product: ReportProduct;
  seller: ReportSeller;
}

export interface ReportStats {
  total: number;
  byStatus: {
    pending: number;
    reviewed: number;
    resolved: number;
    rejected: number;
  };
  byType: {
    chat: number;
    product: number;
  };
}
