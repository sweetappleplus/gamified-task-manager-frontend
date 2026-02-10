import { api } from "./axios.instance";
import {
  ApiResponse,
  TaskCategory,
  CreateTaskCategoryRequest,
  UpdateTaskCategoryRequest,
} from "types";
import { API_URL_TASK_CATEGORIES, API_URL_TASK_CATEGORIES_BY_ID } from "consts";

export const getTaskCategoriesApi = (): Promise<
  ApiResponse<TaskCategory[]>
> => {
  return api
    .get<ApiResponse<TaskCategory[]>>(API_URL_TASK_CATEGORIES)
    .then((res) => res.data);
};

export const createTaskCategoryApi = (
  data: CreateTaskCategoryRequest
): Promise<ApiResponse<TaskCategory>> => {
  return api
    .post<ApiResponse<TaskCategory>>(API_URL_TASK_CATEGORIES, data)
    .then((res) => res.data);
};

export const updateTaskCategoryApi = (
  id: string,
  data: UpdateTaskCategoryRequest
): Promise<ApiResponse<TaskCategory>> => {
  return api
    .patch<
      ApiResponse<TaskCategory>
    >(API_URL_TASK_CATEGORIES_BY_ID.replace(":id", id), data)
    .then((res) => res.data);
};

export const deleteTaskCategoryApi = (
  id: string
): Promise<ApiResponse<void>> => {
  return api
    .delete<ApiResponse<void>>(API_URL_TASK_CATEGORIES_BY_ID.replace(":id", id))
    .then((res) => res.data);
};
