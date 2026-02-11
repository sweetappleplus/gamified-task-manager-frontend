export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: "TASK_ASSIGNED",
  TASK_APPROVED: "TASK_APPROVED",
  TASK_REJECTED: "TASK_REJECTED",
  TASK_CANCELLED: "TASK_CANCELLED",
  PAYMENT_RECORDED: "PAYMENT_RECORDED",
  WORKER_JOINED: "WORKER_JOINED",
  TASK_SUBMITTED: "TASK_SUBMITTED",
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  isDelivered: boolean;
  relatedTaskId: string | null;
  createdAt: string;
  updatedAt: string;
};
