export const SPRINT_STATUSES = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type SprintStatus =
  (typeof SPRINT_STATUSES)[keyof typeof SPRINT_STATUSES];

export type SprintCreatedBy = {
  id: string;
  email: string;
  name: string | null;
};

export type SprintTaskInfo = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  status: string;
  priority: string;
  type: string;
};

export type SprintTask = {
  id: string;
  order: number;
  task: SprintTaskInfo;
};

export type SprintUserInfo = {
  id: string;
  email: string;
  name: string | null;
};

export type SprintUserProgress = {
  id: string;
  userId: string;
  tasksCompleted: number;
  totalTasks: number;
  startedAt: string | null;
  completedAt: string | null;
  user: SprintUserInfo;
};

export type Sprint = {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  status: SprintStatus;
  isActive: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: SprintCreatedBy;
  tasks?: SprintTask[];
  progress?: SprintUserProgress[];
};

export type CreateSprintRequest = {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
};

export type UpdateSprintRequest = {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

export type AddTasksToSprintRequest = {
  taskIds: string[];
};

export type SprintFilterParams = {
  status?: SprintStatus;
  isActive?: boolean;
};
