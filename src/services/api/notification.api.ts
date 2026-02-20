import { api } from "./axios.instance";
import {
  ApiResponse,
  PaginatedApiResponse,
  Notification,
  AdminNotification,
  AdminNotificationFilterParams,
  CreateNotificationPayload,
} from "types";
import {
  API_URL_NOTIFICATIONS_MARK_AS_READ,
  API_URL_NOTIFICATIONS_UNREAD_COUNT,
  API_URL_NOTIFICATIONS_CREATE,
  API_URL_NOTIFICATIONS_ADMIN,
  API_URL_NOTIFICATIONS_ADMIN_BY_ID,
  API_URL_NOTIFICATIONS_ADMIN_BULK_DELETE,
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

export const getAdminNotificationsApi = (
  params?: AdminNotificationFilterParams
): Promise<PaginatedApiResponse<AdminNotification[]>> => {
  return api
    .get<
      PaginatedApiResponse<AdminNotification[]>
    >(API_URL_NOTIFICATIONS_ADMIN, { params })
    .then((res) => res.data);
};

export const deleteAdminNotificationApi = (
  id: string
): Promise<ApiResponse<void>> => {
  return api
    .delete<
      ApiResponse<void>
    >(API_URL_NOTIFICATIONS_ADMIN_BY_ID.replace(":id", id))
    .then((res) => res.data);
};

export const bulkDeleteAdminNotificationsApi = (
  ids: string[]
): Promise<ApiResponse<{ deletedCount: number }>> => {
  return api
    .post<
      ApiResponse<{ deletedCount: number }>
    >(API_URL_NOTIFICATIONS_ADMIN_BULK_DELETE, { ids })
    .then((res) => res.data);
};

export const createNotificationApi = (
  payload: CreateNotificationPayload
): Promise<ApiResponse<Notification>> => {
  return api
    .post<ApiResponse<Notification>>(API_URL_NOTIFICATIONS_CREATE, payload)
    .then((res) => res.data);
};
