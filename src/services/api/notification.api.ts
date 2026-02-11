import { api } from "./axios.instance";
import { ApiResponse, Notification } from "types";
import {
  API_URL_NOTIFICATIONS_MARK_AS_READ,
  API_URL_NOTIFICATIONS_UNREAD_COUNT,
} from "consts";

export const markNotificationAsReadApi = (
  id: string
): Promise<ApiResponse<Notification>> => {
  return api
    .patch<
      ApiResponse<Notification>
    >(`${API_URL_NOTIFICATIONS_MARK_AS_READ.replace(":id", id)}`)
    .then((res) => res.data);
};

export const getUnreadNotificationCountApi = (): Promise<
  ApiResponse<{ count: number }>
> => {
  return api
    .get<ApiResponse<{ count: number }>>(API_URL_NOTIFICATIONS_UNREAD_COUNT)
    .then((res) => res.data);
};
