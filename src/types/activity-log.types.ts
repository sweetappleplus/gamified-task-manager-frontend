export const ACTIVITY_TYPES = {
  COMPLETED_TASK: "COMPLETED_TASK",
  GET_PAID: "GET_PAID",
  WITHDRAWN: "WITHDRAWN",
  LEVEL_UP: "LEVEL_UP",
} as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[keyof typeof ACTIVITY_TYPES];

export type ActivityLog = {
  id: string;
  userId: string;
  activityType: ActivityType;
  logMessage: string;
  relatedTaskId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FilterActivityLogsParams = {
  page?: number;
  limit?: number;
  activityType?: ActivityType;
};
