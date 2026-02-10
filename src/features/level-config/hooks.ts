import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { setLevelConfigs, removeLevelConfig, setLoading } from "./slice";
import {
  getLevelConfigsApi,
  createLevelConfigApi,
  updateLevelConfigApi,
  deleteLevelConfigApi,
} from "services";
import { CreateLevelConfigRequest, UpdateLevelConfigRequest } from "types";

export const useLevelConfig = () => {
  const dispatch = useAppDispatch();
  const levelConfigs = useAppSelector(
    (state: RootState) => state.levelConfig.levelConfigs
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.levelConfig.isLoading
  );

  const fetchLevelConfigs = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await getLevelConfigsApi();
      if (response.data) {
        dispatch(setLevelConfigs(response.data));
      }
      return response;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const createLevelConfig = useCallback(
    async (data: CreateLevelConfigRequest) => {
      const response = await createLevelConfigApi(data);
      await fetchLevelConfigs();
      return response;
    },
    [fetchLevelConfigs]
  );

  const editLevelConfig = useCallback(
    async (id: string, data: UpdateLevelConfigRequest) => {
      const response = await updateLevelConfigApi(id, data);
      await fetchLevelConfigs();
      return response;
    },
    [fetchLevelConfigs]
  );

  const deleteLevelConfig = useCallback(
    async (id: string) => {
      const response = await deleteLevelConfigApi(id);
      dispatch(removeLevelConfig(id));
      return response;
    },
    [dispatch]
  );

  return {
    levelConfigs,
    isLoading,
    fetchLevelConfigs,
    createLevelConfig,
    editLevelConfig,
    deleteLevelConfig,
  };
};
