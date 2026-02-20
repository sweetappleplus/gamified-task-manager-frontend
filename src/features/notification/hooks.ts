import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setUnreadCount,
  setWorkerNotifications,
  appendWorkerNotifications,
  setWorkerTotal,
  setWorkerPage,
  setWorkerLoading,
  setWorkerHasMore,
  resetWorkerNotifications,
  markWorkerNotificationAsRead,
  setAdminNotifications,
  setAdminTotal,
  setAdminLoading,
  setAdminFilters,
  removeNotificationFromList,
} from "./slice";
import {
  getWorkerNotificationsApi,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  getAdminNotificationsApi,
  deleteAdminNotificationApi,
  bulkDeleteAdminNotificationsApi,
  createNotificationApi,
} from "services";
import {
  AdminNotificationFilterParams,
  CreateNotificationPayload,
} from "types";

const WORKER_NOTIFICATION_LIMIT = 10;

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

export const useWorkerNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state: RootState) => state.notification.workerNotifications
  );
  const total = useAppSelector(
    (state: RootState) => state.notification.workerTotal
  );
  const page = useAppSelector(
    (state: RootState) => state.notification.workerPage
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.notification.workerIsLoading
  );
  const hasMore = useAppSelector(
    (state: RootState) => state.notification.workerHasMore
  );

  const fetchInitial = useCallback(async () => {
    dispatch(resetWorkerNotifications());
    dispatch(setWorkerLoading(true));
    try {
      const response = await getWorkerNotificationsApi({
        page: 1,
        limit: WORKER_NOTIFICATION_LIMIT,
      });
      if (response.data) {
        dispatch(setWorkerNotifications(response.data));
      }
      if (response.pagination) {
        dispatch(setWorkerTotal(response.pagination.total));
        dispatch(setWorkerPage(1));
        dispatch(
          setWorkerHasMore(
            response.pagination.page < response.pagination.totalPages
          )
        );
      }
      return response;
    } finally {
      dispatch(setWorkerLoading(false));
    }
  }, [dispatch]);

  const fetchMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const nextPage = page + 1;
    dispatch(setWorkerLoading(true));
    try {
      const response = await getWorkerNotificationsApi({
        page: nextPage,
        limit: WORKER_NOTIFICATION_LIMIT,
      });
      if (response.data) {
        dispatch(appendWorkerNotifications(response.data));
      }
      if (response.pagination) {
        dispatch(setWorkerTotal(response.pagination.total));
        dispatch(setWorkerPage(nextPage));
        dispatch(
          setWorkerHasMore(
            response.pagination.page < response.pagination.totalPages
          )
        );
      }
      return response;
    } finally {
      dispatch(setWorkerLoading(false));
    }
  }, [dispatch, page, isLoading, hasMore]);

  const markAsRead = useCallback(
    async (id: string) => {
      dispatch(markWorkerNotificationAsRead(id));
      try {
        await markNotificationAsReadApi(id);
      } catch {
        // Revert optimistic update on failure by refetching
      }
    },
    [dispatch]
  );

  const markAllAsRead = useCallback(async () => {
    try {
      await markAllNotificationsAsReadApi();
      // Refresh the list after marking all as read
      await fetchInitial();
    } catch {
      // Silent fail
    }
  }, [fetchInitial]);

  const reset = useCallback(() => {
    dispatch(resetWorkerNotifications());
  }, [dispatch]);

  return {
    notifications,
    total,
    page,
    isLoading,
    hasMore,
    fetchInitial,
    fetchMore,
    markAsRead,
    markAllAsRead,
    reset,
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
