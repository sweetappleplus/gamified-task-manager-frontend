import { api } from "./axios.instance";
import {
  ApiResponse,
  Sprint,
  SprintUserProgress,
  CreateSprintRequest,
  UpdateSprintRequest,
  AddTasksToSprintRequest,
  SprintFilterParams,
} from "types";
import {
  API_URL_SPRINTS,
  API_URL_SPRINTS_BY_ID,
  API_URL_SPRINTS_TASKS,
  API_URL_SPRINTS_REMOVE_TASK,
  API_URL_SPRINTS_ACTIVATE,
  API_URL_SPRINTS_COMPLETE,
  API_URL_SPRINTS_PROGRESS,
} from "consts";

export const getSprintsApi = (
  params?: SprintFilterParams
): Promise<ApiResponse<Sprint[]>> => {
  return api
    .get<ApiResponse<Sprint[]>>(API_URL_SPRINTS, { params })
    .then((res) => res.data);
};

export const getSprintByIdApi = (id: string): Promise<ApiResponse<Sprint>> => {
  return api
    .get<ApiResponse<Sprint>>(API_URL_SPRINTS_BY_ID.replace(":id", id))
    .then((res) => res.data);
};

export const createSprintApi = (
  data: CreateSprintRequest
): Promise<ApiResponse<Sprint>> => {
  return api
    .post<ApiResponse<Sprint>>(API_URL_SPRINTS, data)
    .then((res) => res.data);
};

export const updateSprintApi = (
  id: string,
  data: UpdateSprintRequest
): Promise<ApiResponse<Sprint>> => {
  return api
    .patch<ApiResponse<Sprint>>(API_URL_SPRINTS_BY_ID.replace(":id", id), data)
    .then((res) => res.data);
};

export const deleteSprintApi = (id: string): Promise<ApiResponse<void>> => {
  return api
    .delete<ApiResponse<void>>(API_URL_SPRINTS_BY_ID.replace(":id", id))
    .then((res) => res.data);
};

export const addTasksToSprintApi = (
  id: string,
  data: AddTasksToSprintRequest
): Promise<ApiResponse<Sprint>> => {
  return api
    .post<ApiResponse<Sprint>>(API_URL_SPRINTS_TASKS.replace(":id", id), data)
    .then((res) => res.data);
};

export const removeTaskFromSprintApi = (
  sprintId: string,
  taskId: string
): Promise<ApiResponse<void>> => {
  const url = API_URL_SPRINTS_REMOVE_TASK.replace(":id", sprintId).replace(
    ":taskId",
    taskId
  );
  return api.delete<ApiResponse<void>>(url).then((res) => res.data);
};

export const activateSprintApi = (id: string): Promise<ApiResponse<Sprint>> => {
  return api
    .patch<ApiResponse<Sprint>>(API_URL_SPRINTS_ACTIVATE.replace(":id", id))
    .then((res) => res.data);
};

export const completeSprintApi = (id: string): Promise<ApiResponse<Sprint>> => {
  return api
    .patch<ApiResponse<Sprint>>(API_URL_SPRINTS_COMPLETE.replace(":id", id))
    .then((res) => res.data);
};

export const getSprintProgressApi = (
  id: string
): Promise<ApiResponse<SprintUserProgress[]>> => {
  return api
    .get<
      ApiResponse<SprintUserProgress[]>
    >(API_URL_SPRINTS_PROGRESS.replace(":id", id))
    .then((res) => res.data);
};
