import { api } from "./axios.instance";
import { API_URL_ACTIVITY_LOGS } from "consts";
import {
  PaginatedApiResponse,
  ActivityLog,
  FilterActivityLogsParams,
} from "types";

export const getActivityLogsApi = (
  params?: FilterActivityLogsParams
): Promise<PaginatedApiResponse<ActivityLog[]>> => {
  return api
    .get<PaginatedApiResponse<ActivityLog[]>>(API_URL_ACTIVITY_LOGS, { params })
    .then((res) => res.data);
};
