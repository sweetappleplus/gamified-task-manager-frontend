import { BackendFile } from "./file.types";

export const TASK_TYPES = {
  STANDARD: "STANDARD",
  HIGH_VALUE: "HIGH_VALUE",
  PREMIUM: "PREMIUM",
} as const;

export type TaskType = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];

export const TASK_STATUSES = {
  NEW: "NEW",
  PENDING: "PENDING",
  IN_ACTION: "IN_ACTION",
  IN_REVIEW: "IN_REVIEW",
  COMPLETED: "COMPLETED",
  LATE: "LATE",
  PAID: "PAID",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const;

export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];

export const TASK_PRIORITIES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type TaskPriority =
  (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];

export type TaskUser = {
  id: string;
  email: string;
  name?: string | null;
};

export type TaskCategoryInfo = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  priority: TaskPriority;
  type: TaskType;
  budget: string;
  commissionPercent: string;
  timeToCompleteMin: number;
  deadline: string;
  maxSubmissionDelayMin: number;
  status: TaskStatus;
  assignedAt?: string | null;
  startedAt?: string | null;
  submittedAt?: string | null;
  completedAt?: string | null;
  createdById: string;
  assignedUserId?: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category?: TaskCategoryInfo;
  assignedTo?: TaskUser | null;
  createdBy?: TaskUser;
  files?: BackendFile[];
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  steps?: string[];
  priority: TaskPriority;
  type: TaskType;
  budget: number;
  commissionPercent: number;
  timeToCompleteMin: number;
  deadline: string;
  maxSubmissionDelayMin: number;
  categoryId: string;
  assignedUserId?: string;
};

export type UpdateTaskRequest = {
  title?: string;
  description?: string;
  steps?: string[];
  priority?: TaskPriority;
  type?: TaskType;
  budget?: number;
  commissionPercent?: number;
  timeToCompleteMin?: number;
  deadline?: string;
  maxSubmissionDelayMin?: number;
  categoryId?: string;
  status?: TaskStatus;
};

export type AssignTaskRequest = {
  assignedUserId: string;
};

export type ReviewTaskRequest = {
  isApproved: boolean;
  feedback?: string;
};

export type TaskFilterParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus;
  statuses?: TaskStatus[];
  priority?: TaskPriority;
  type?: TaskType;
  categoryId?: string;
};
