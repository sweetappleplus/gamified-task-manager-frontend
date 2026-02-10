export const TASK_TYPES = {
  STANDARD: "STANDARD",
  HIGH_VALUE: "HIGH_VALUE",
  PREMIUM: "PREMIUM",
};

export type TaskType = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];
