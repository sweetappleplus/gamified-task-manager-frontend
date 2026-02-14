import { api } from "./axios.instance";
import {
  API_URL_TASKS,
  API_URL_TASKS_BY_ID,
  API_URL_TASKS_ASSIGN,
  API_URL_TASKS_START,
  API_URL_TASKS_REVIEW,
  API_URL_TASKS_MARK_PAID,
  API_URL_TASKS_CANCEL,
  API_URL_TASKS_FILES,
  API_URL_TASKS_BULK_CREATE,
  API_URL_TASKS_BULK_ASSIGN,
} from "consts";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  AssignTaskRequest,
  ReviewTaskRequest,
  TaskFilterParams,
  BulkCreateTasksRequest,
  BulkAssignTasksRequest,
  BulkAssignTasksResponse,
  PaginatedApiResponse,
  ApiResponse,
} from "types";

export const getTasksApi = (
  params?: TaskFilterParams
): Promise<PaginatedApiResponse<Task[]>> => {
  return api
    .get<PaginatedApiResponse<Task[]>>(API_URL_TASKS, { params })
    .then((res) => res.data);
};

export const getTaskByIdApi = (id: string): Promise<ApiResponse<Task>> => {
  return api
    .get<ApiResponse<Task>>(API_URL_TASKS_BY_ID.replace(":id", id))
    .then((res) => res.data);
};

export const createTaskApi = (
  data: CreateTaskRequest
): Promise<ApiResponse<Task>> => {
  return api
    .post<ApiResponse<Task>>(API_URL_TASKS, data)
    .then((res) => res.data);
};

export const updateTaskApi = (
  id: string,
  data: UpdateTaskRequest
): Promise<ApiResponse<Task>> => {
  return api
    .patch<ApiResponse<Task>>(API_URL_TASKS_BY_ID.replace(":id", id), data)
    .then((res) => res.data);
};

export const deleteTaskApi = (id: string): Promise<ApiResponse<void>> => {
  return api
    .delete<ApiResponse<void>>(API_URL_TASKS_BY_ID.replace(":id", id))
    .then((res) => res.data);
};

export const assignTaskApi = (
  id: string,
  data: AssignTaskRequest
): Promise<ApiResponse<Task>> => {
  return api
    .post<ApiResponse<Task>>(API_URL_TASKS_ASSIGN.replace(":id", id), data)
    .then((res) => res.data);
};

export const reviewTaskApi = (
  id: string,
  data: ReviewTaskRequest
): Promise<ApiResponse<Task>> => {
  return api
    .post<ApiResponse<Task>>(API_URL_TASKS_REVIEW.replace(":id", id), data)
    .then((res) => res.data);
};

export const markTaskPaidApi = (id: string): Promise<ApiResponse<Task>> => {
  return api
    .post<ApiResponse<Task>>(API_URL_TASKS_MARK_PAID.replace(":id", id))
    .then((res) => res.data);
};

export const startTaskApi = (id: string): Promise<ApiResponse<Task>> => {
  return api
    .post<ApiResponse<Task>>(API_URL_TASKS_START.replace(":id", id))
    .then((res) => res.data);
};

export const cancelTaskApi = (id: string): Promise<ApiResponse<Task>> => {
  return api
    .post<ApiResponse<Task>>(API_URL_TASKS_CANCEL.replace(":id", id))
    .then((res) => res.data);
};

export const uploadTaskFilesApi = (
  taskId: string,
  files: File[]
): Promise<ApiResponse<Task>> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return api
    .post<
      ApiResponse<Task>
    >(API_URL_TASKS_FILES.replace(":id", taskId), formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
};

export const bulkCreateTasksApi = (
  data: BulkCreateTasksRequest
): Promise<ApiResponse<Task[]>> => {
  return api
    .post<ApiResponse<Task[]>>(API_URL_TASKS_BULK_CREATE, data)
    .then((res) => res.data);
};

export const bulkAssignTasksApi = (
  data: BulkAssignTasksRequest
): Promise<ApiResponse<BulkAssignTasksResponse>> => {
  return api
    .post<ApiResponse<BulkAssignTasksResponse>>(API_URL_TASKS_BULK_ASSIGN, data)
    .then((res) => res.data);
};
