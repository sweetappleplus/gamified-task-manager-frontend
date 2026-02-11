import { api } from "./axios.instance";
import { API_URL_USERS } from "consts";
import { ApiResponse, User, FilterUsersParams } from "types";

export const getUsersApi = (
  params?: FilterUsersParams
): Promise<ApiResponse<User[]>> => {
  return api
    .get<ApiResponse<User[]>>(API_URL_USERS, { params })
    .then((res) => res.data);
};
