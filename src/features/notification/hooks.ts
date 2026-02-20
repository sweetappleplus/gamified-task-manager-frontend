import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setUnreadCount,
  setAdminNotifications,
  setAdminTotal,
  setAdminLoading,
  setAdminFilters,
  removeNotificationFromList,
} from "./slice";
import {
  getAdminNotificationsApi,
  deleteAdminNotificationApi,
  bulkDeleteAdminNotificationsApi,
  createNotificationApi,
} from "services";
import {
  AdminNotificationFilterParams,
  CreateNotificationPayload,
} from "types";

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(
    (state: RootState) => state.notification.unreadCount
  );

  const updateUnreadCount = useCallback(
    (count: number) => {
      dispatch(setUnreadCount(count));
    },
    [dispatch]
  );

  return {
    unreadCount,
    updateUnreadCount,
  };
};

export const useAdminNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state: RootState) => state.notification.adminNotifications
  );
  const total = useAppSelector(
    (state: RootState) => state.notification.adminTotal
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.notification.adminIsLoading
  );
  const filters = useAppSelector(
    (state: RootState) => state.notification.adminFilters
  );

  const fetchNotifications = useCallback(
    async (params?: AdminNotificationFilterParams) => {
      const queryParams = params ?? filters;
      dispatch(setAdminLoading(true));
      try {
        const response = await getAdminNotificationsApi(queryParams);
        if (response.data) {
          dispatch(setAdminNotifications(response.data));
        }
        if (response.pagination) {
          dispatch(setAdminTotal(response.pagination.total));
        }
        return response;
      } finally {
        dispatch(setAdminLoading(false));
      }
    },
    [dispatch, filters]
  );

  const deleteNotification = useCallback(
    async (id: string) => {
      const response = await deleteAdminNotificationApi(id);
      dispatch(removeNotificationFromList(id));
      return response;
    },
    [dispatch]
  );

  const bulkDeleteNotifications = useCallback(async (ids: string[]) => {
    const response = await bulkDeleteAdminNotificationsApi(ids);
    return response;
  }, []);

  const sendNotification = useCallback(
    async (payload: CreateNotificationPayload) => {
      const response = await createNotificationApi(payload);
      return response;
    },
    []
  );

  const changeFilters = useCallback(
    (newFilters: AdminNotificationFilterParams) => {
      dispatch(setAdminFilters(newFilters));
    },
    [dispatch]
  );

  return {
    notifications,
    total,
    isLoading,
    filters,
    fetchNotifications,
    deleteNotification,
    bulkDeleteNotifications,
    sendNotification,
    changeFilters,
  };
};
