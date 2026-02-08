import { api } from "./axios.instance";
import { ApiResponse, Notification } from "types";
import { API_URL_NOTIFICATIONS_MARK_AS_READ } from "consts";

export const markNotificationAsReadApi = (
  id: string
): Promise<ApiResponse<Notification>> => {
  return api
    .patch<
      ApiResponse<Notification>
    >(`${API_URL_NOTIFICATIONS_MARK_AS_READ.replace(":id", id)}`)
    .then((res) => res.data);
};
