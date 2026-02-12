import { api } from "./axios.instance";
import { API_URL_USERS, API_URL_USERS_ME } from "consts";
import { ApiResponse, User, FilterUsersParams } from "types";

export const getUsersApi = (
  params?: FilterUsersParams
): Promise<ApiResponse<User[]>> => {
  return api
    .get<ApiResponse<User[]>>(API_URL_USERS, { params })
    .then((res) => res.data);
};

export const getMeApi = (): Promise<ApiResponse<User>> => {
  return api.get<ApiResponse<User>>(API_URL_USERS_ME).then((res) => res.data);
};
