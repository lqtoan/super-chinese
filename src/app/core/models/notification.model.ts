export interface Notification {
  notificationId: string;
  // _id: string; // Auto gen by MongoDB
  createdDate: Date;
  createdBy: string;
  action: string;
  content: string;
  extraContent: any | null;
  navigate: string | null;
  isRead: boolean;
}
