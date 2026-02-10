import { api } from "./axios.instance";
import {
  ApiResponse,
  LevelConfig,
  CreateLevelConfigRequest,
  UpdateLevelConfigRequest,
} from "types";
import { API_URL_LEVEL_CONFIGS, API_URL_LEVEL_CONFIGS_BY_ID } from "consts";

export const getLevelConfigsApi = (): Promise<ApiResponse<LevelConfig[]>> => {
  return api
    .get<ApiResponse<LevelConfig[]>>(API_URL_LEVEL_CONFIGS)
    .then((res) => res.data);
};

export const createLevelConfigApi = (
  data: CreateLevelConfigRequest
): Promise<ApiResponse<LevelConfig>> => {
  return api
    .post<ApiResponse<LevelConfig>>(API_URL_LEVEL_CONFIGS, data)
    .then((res) => res.data);
};

export const updateLevelConfigApi = (
  id: string,
  data: UpdateLevelConfigRequest
): Promise<ApiResponse<LevelConfig>> => {
  return api
    .patch<
      ApiResponse<LevelConfig>
    >(API_URL_LEVEL_CONFIGS_BY_ID.replace(":id", id), data)
    .then((res) => res.data);
};

export const deleteLevelConfigApi = (
  id: string
): Promise<ApiResponse<void>> => {
  return api
    .delete<ApiResponse<void>>(API_URL_LEVEL_CONFIGS_BY_ID.replace(":id", id))
    .then((res) => res.data);
};
