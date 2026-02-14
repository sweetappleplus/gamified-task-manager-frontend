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
    bg: "grayscale.0",
    text: "grayscale.950",
  },
  [TASK_STATUSES.IN_ACTION]: {
    bg: "primary.main",
    text: "grayscale.0",
  },
  [TASK_STATUSES.IN_REVIEW]: {
    bg: "additional.pink.main",
    text: "grayscale.0",
  },
  [TASK_STATUSES.COMPLETED]: {
    bg: "additional.green.main",
    text: "grayscale.0",
  },
  [TASK_STATUSES.LATE]: {
    bg: "additional.orange.main",
    text: "grayscale.0",
  },
  [TASK_STATUSES.PAID]: {
    bg: "additional.green.main",
    text: "grayscale.0",
  },
  [TASK_STATUSES.FAILED]: {
    bg: "additional.yellow.main",
    text: "grayscale.0",
  },
  [TASK_STATUSES.CANCELLED]: {
    bg: "additional.red.main",
    text: "grayscale.0",
  },
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
