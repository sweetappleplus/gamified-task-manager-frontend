import { api } from "./axios.instance";
import {
  ApiResponse,
  SystemSetting,
  CreateSystemSettingRequest,
  UpdateSystemSettingRequest,
} from "types";
import {
  API_URL_SYSTEM_SETTINGS,
  API_URL_SYSTEM_SETTINGS_BY_KEY,
} from "consts";

export const getSystemSettingsApi = (): Promise<
  ApiResponse<SystemSetting[]>
> => {
  return api
    .get<ApiResponse<SystemSetting[]>>(API_URL_SYSTEM_SETTINGS)
    .then((res) => res.data);
};

export const createSystemSettingApi = (
  data: CreateSystemSettingRequest
): Promise<ApiResponse<SystemSetting>> => {
  return api
    .post<ApiResponse<SystemSetting>>(API_URL_SYSTEM_SETTINGS, data)
    .then((res) => res.data);
};

export const updateSystemSettingApi = (
  key: string,
  data: UpdateSystemSettingRequest
): Promise<ApiResponse<SystemSetting>> => {
  return api
    .patch<
      ApiResponse<SystemSetting>
    >(API_URL_SYSTEM_SETTINGS_BY_KEY.replace(":key", key), data)
    .then((res) => res.data);
};

export const deleteSystemSettingApi = (
  key: string
): Promise<ApiResponse<void>> => {
  return api
    .delete<
      ApiResponse<void>
    >(API_URL_SYSTEM_SETTINGS_BY_KEY.replace(":key", key))
    .then((res) => res.data);
};
