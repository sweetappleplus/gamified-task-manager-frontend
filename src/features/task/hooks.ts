import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setTasks,
  setTotal,
  setLoading,
  setFilters,
  updateTaskInList,
  removeTaskFromList,
} from "./slice";
import {
  getTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  assignTaskApi,
  reviewTaskApi,
  markTaskPaidApi,
  cancelTaskApi,
} from "services";
import {
  TaskFilterParams,
  CreateTaskRequest,
  UpdateTaskRequest,
  AssignTaskRequest,
  ReviewTaskRequest,
} from "types";

export const useTask = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.task.tasks);
  const total = useAppSelector((state: RootState) => state.task.total);
  const isLoading = useAppSelector((state: RootState) => state.task.isLoading);
  const filters = useAppSelector((state: RootState) => state.task.filters);

  const fetchTasks = useCallback(
    async (params?: TaskFilterParams) => {
      const queryParams = params ?? filters;
      dispatch(setLoading(true));
      try {
        const response = await getTasksApi(queryParams);
        if (response.data) {
          dispatch(setTasks(response.data));
        }
        if (response.pagination) {
          dispatch(setTotal(response.pagination.total));
        }
        return response;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, filters]
  );

  const createTask = useCallback(
    async (data: CreateTaskRequest) => {
      const response = await createTaskApi(data);
      await fetchTasks();
      return response;
    },
    [fetchTasks]
  );

  const updateTask = useCallback(
    async (id: string, data: UpdateTaskRequest) => {
      const response = await updateTaskApi(id, data);
      if (response.data) {
        dispatch(updateTaskInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      const response = await deleteTaskApi(id);
      dispatch(removeTaskFromList(id));
      return response;
    },
    [dispatch]
  );

  const assignTask = useCallback(
    async (id: string, data: AssignTaskRequest) => {
      const response = await assignTaskApi(id, data);
      if (response.data) {
        dispatch(updateTaskInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const reviewTask = useCallback(
    async (id: string, data: ReviewTaskRequest) => {
      const response = await reviewTaskApi(id, data);
      if (response.data) {
        dispatch(updateTaskInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const markTaskPaid = useCallback(
    async (id: string) => {
      const response = await markTaskPaidApi(id);
      if (response.data) {
        dispatch(updateTaskInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const cancelTask = useCallback(
    async (id: string) => {
      const response = await cancelTaskApi(id);
      if (response.data) {
        dispatch(updateTaskInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const changeFilters = useCallback(
    (newFilters: TaskFilterParams) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  return {
    tasks,
    total,
    isLoading,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
    reviewTask,
    markTaskPaid,
    cancelTask,
    changeFilters,
  };
};
