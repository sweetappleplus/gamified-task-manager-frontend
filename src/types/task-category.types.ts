export type TaskCategory = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskCategoryRequest = {
  name: string;
  description?: string;
};

export type UpdateTaskCategoryRequest = {
  name?: string;
  description?: string;
};
