import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setSettings,
  addSetting,
  updateSetting,
  removeSetting,
  setLoading,
} from "./slice";
import {
  getSystemSettingsApi,
  createSystemSettingApi,
  updateSystemSettingApi,
  deleteSystemSettingApi,
} from "services";
import { CreateSystemSettingRequest, UpdateSystemSettingRequest } from "types";

export const useSystemSetting = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(
    (state: RootState) => state.systemSetting.settings
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.systemSetting.isLoading
  );

  const fetchSettings = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await getSystemSettingsApi();
      if (response.data) {
        dispatch(setSettings(response.data));
      }
      return response;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const createSetting = useCallback(
    async (data: CreateSystemSettingRequest) => {
      const response = await createSystemSettingApi(data);
      if (response.data) {
        dispatch(addSetting(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const editSetting = useCallback(
    async (key: string, data: UpdateSystemSettingRequest) => {
      const response = await updateSystemSettingApi(key, data);
      if (response.data) {
        dispatch(updateSetting(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const deleteSetting = useCallback(
    async (key: string) => {
      const response = await deleteSystemSettingApi(key);
      dispatch(removeSetting(key));
      return response;
    },
    [dispatch]
  );

  return {
    settings,
    isLoading,
    fetchSettings,
    createSetting,
    editSetting,
    deleteSetting,
  };
};
