import { api } from "./axios.instance";
import { API_URL_USERS, API_URL_USERS_ME, API_URL_USERS_STATUS } from "consts";
import {
  ApiResponse,
  PaginatedApiResponse,
  User,
  FilterUsersParams,
} from "types";

export const getUsersApi = (
  params?: FilterUsersParams
): Promise<PaginatedApiResponse<User[]>> => {
  return api
    .get<PaginatedApiResponse<User[]>>(API_URL_USERS, { params })
    .then((res) => res.data);
};

export const getMeApi = (): Promise<ApiResponse<User>> => {
  return api.get<ApiResponse<User>>(API_URL_USERS_ME).then((res) => res.data);
};

export const updateUserStatusApi = (
  id: string,
  isActive: boolean
): Promise<ApiResponse<User>> => {
  return api
    .patch<ApiResponse<User>>(API_URL_USERS_STATUS.replace(":id", id), {
      isActive,
    })
    .then((res) => res.data);
};
