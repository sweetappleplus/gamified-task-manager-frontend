import {
  TaskStatus,
  TaskPriority,
  TaskType,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_TYPES,
} from "types";

export const STATUS_COLORS: Record<TaskStatus, { bg: string; text: string }> = {
  [TASK_STATUSES.NEW]: { bg: "primary.50", text: "primary.600" },
  [TASK_STATUSES.PENDING]: {
    bg: "additional.yellow.200",
    text: "additional.yellow.main",
  },
  [TASK_STATUSES.IN_ACTION]: {
    bg: "additional.blue.200",
    text: "primary.main",
  },
  [TASK_STATUSES.IN_REVIEW]: {
    bg: "additional.pink.200",
    text: "additional.pink.main",
  },
  [TASK_STATUSES.COMPLETED]: {
    bg: "additional.green.200",
    text: "additional.green.main",
  },
  [TASK_STATUSES.LATE]: {
    bg: "additional.red.200",
    text: "additional.red.main",
  },
  [TASK_STATUSES.PAID]: {
    bg: "additional.green.100",
    text: "additional.green.main",
  },
  [TASK_STATUSES.FAILED]: {
    bg: "additional.red.200",
    text: "additional.red.main",
  },
  [TASK_STATUSES.CANCELLED]: { bg: "grayscale.50", text: "grayscale.600" },
};

export const PRIORITY_COLORS: Record<
  TaskPriority,
  { bg: string; text: string }
> = {
  [TASK_PRIORITIES.LOW]: {
    bg: "additional.green.200",
    text: "additional.green.main",
  },
  [TASK_PRIORITIES.MEDIUM]: {
    bg: "additional.orange.200",
    text: "additional.orange.main",
  },
  [TASK_PRIORITIES.HIGH]: {
    bg: "additional.red.200",
    text: "additional.red.main",
  },
};

export const TYPE_COLORS: Record<TaskType, { bg: string; text: string }> = {
  [TASK_TYPES.STANDARD]: { bg: "grayscale.50", text: "grayscale.700" },
  [TASK_TYPES.HIGH_VALUE]: {
    bg: "additional.orange.200",
    text: "additional.orange.main",
  },
  [TASK_TYPES.PREMIUM]: { bg: "primary.50", text: "primary.600" },
};
