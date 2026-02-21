import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setSprints,
  setSelectedSprint,
  addSprint,
  updateSprintInList,
  removeSprint,
  setLoading,
} from "./slice";
import {
  getSprintsApi,
  getSprintByIdApi,
  createSprintApi,
  updateSprintApi,
  deleteSprintApi,
  addTasksToSprintApi,
  removeTaskFromSprintApi,
  activateSprintApi,
  completeSprintApi,
  getSprintProgressApi,
} from "services";
import {
  CreateSprintRequest,
  UpdateSprintRequest,
  AddTasksToSprintRequest,
  SprintFilterParams,
} from "types";

export const useSprint = () => {
  const dispatch = useAppDispatch();
  const sprints = useAppSelector((state: RootState) => state.sprint.sprints);
  const selectedSprint = useAppSelector(
    (state: RootState) => state.sprint.selectedSprint
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.sprint.isLoading
  );

  const fetchSprints = useCallback(
    async (params?: SprintFilterParams) => {
      dispatch(setLoading(true));
      try {
        const response = await getSprintsApi(params);
        if (response.data) {
          dispatch(setSprints(response.data));
        }
        return response;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const fetchSprintById = useCallback(
    async (id: string) => {
      dispatch(setLoading(true));
      try {
        const response = await getSprintByIdApi(id);
        if (response.data) {
          dispatch(setSelectedSprint(response.data));
        }
        return response;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const createSprint = useCallback(
    async (data: CreateSprintRequest) => {
      const response = await createSprintApi(data);
      if (response.data) {
        dispatch(addSprint(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const editSprint = useCallback(
    async (id: string, data: UpdateSprintRequest) => {
      const response = await updateSprintApi(id, data);
      if (response.data) {
        dispatch(updateSprintInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const deleteSprint = useCallback(
    async (id: string) => {
      const response = await deleteSprintApi(id);
      dispatch(removeSprint(id));
      return response;
    },
    [dispatch]
  );

  const addTasks = useCallback(
    async (id: string, data: AddTasksToSprintRequest) => {
      const response = await addTasksToSprintApi(id, data);
      if (response.data) {
        dispatch(updateSprintInList(response.data));
        dispatch(setSelectedSprint(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const removeTask = useCallback(async (sprintId: string, taskId: string) => {
    const response = await removeTaskFromSprintApi(sprintId, taskId);
    return response;
  }, []);

  const activateSprint = useCallback(
    async (id: string) => {
      const response = await activateSprintApi(id);
      if (response.data) {
        dispatch(updateSprintInList(response.data));
        dispatch(setSelectedSprint(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const completeSprint = useCallback(
    async (id: string) => {
      const response = await completeSprintApi(id);
      if (response.data) {
        dispatch(updateSprintInList(response.data));
        dispatch(setSelectedSprint(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const fetchProgress = useCallback(async (id: string) => {
    const response = await getSprintProgressApi(id);
    return response;
  }, []);

  const clearSelectedSprint = useCallback(() => {
    dispatch(setSelectedSprint(null));
  }, [dispatch]);

  return {
    sprints,
    selectedSprint,
    isLoading,
    fetchSprints,
    fetchSprintById,
    createSprint,
    editSprint,
    deleteSprint,
    addTasks,
    removeTask,
    activateSprint,
    completeSprint,
    fetchProgress,
    clearSelectedSprint,
  };
};
