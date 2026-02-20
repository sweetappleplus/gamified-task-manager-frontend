import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminNotifications } from "features/notification";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  AdminNotificationFilterParams,
  NotificationType,
  NotificationSortBy,
  NotificationSortOrder,
  CreateNotificationPayload,
} from "types";

const DEFAULT_SORT_BY: NotificationSortBy = "createdAt";
const DEFAULT_SORT_ORDER: NotificationSortOrder = "desc";

const parseUrlFilters = (
  searchParams: URLSearchParams
): AdminNotificationFilterParams => {
  const params: AdminNotificationFilterParams = {};

  const page = searchParams.get("page");
  if (page) params.page = Number(page);

  const limit = searchParams.get("limit");
  if (limit) params.limit = Number(limit);

  const type = searchParams.get("type");
  if (type) params.type = type as NotificationType;

  const isRead = searchParams.get("isRead");
  if (isRead === "true") params.isRead = true;
  if (isRead === "false") params.isRead = false;

  const isDelivered = searchParams.get("isDelivered");
  if (isDelivered === "true") params.isDelivered = true;
  if (isDelivered === "false") params.isDelivered = false;

  const userId = searchParams.get("userId");
  if (userId) params.userId = userId;

  const search = searchParams.get("search");
  if (search) params.search = search;

  const createdFrom = searchParams.get("createdFrom");
  if (createdFrom) params.createdFrom = createdFrom;

  const createdTo = searchParams.get("createdTo");
  if (createdTo) params.createdTo = createdTo;

  const sortBy = searchParams.get("sortBy");
  if (sortBy) params.sortBy = sortBy as NotificationSortBy;

  const sortOrder = searchParams.get("sortOrder");
  if (sortOrder) params.sortOrder = sortOrder as NotificationSortOrder;

  return params;
};

const buildSearchParams = (
  filters: AdminNotificationFilterParams
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.page && filters.page !== 1)
    params.set("page", String(filters.page));
  if (filters.limit && filters.limit !== 10)
    params.set("limit", String(filters.limit));
  if (filters.type) params.set("type", filters.type);
  if (filters.isRead !== undefined)
    params.set("isRead", String(filters.isRead));
  if (filters.isDelivered !== undefined)
    params.set("isDelivered", String(filters.isDelivered));
  if (filters.userId) params.set("userId", filters.userId);
  if (filters.search) params.set("search", filters.search);
  if (filters.createdFrom) params.set("createdFrom", filters.createdFrom);
  if (filters.createdTo) params.set("createdTo", filters.createdTo);
  if (filters.sortBy && filters.sortBy !== DEFAULT_SORT_BY)
    params.set("sortBy", filters.sortBy);
  if (filters.sortOrder && filters.sortOrder !== DEFAULT_SORT_ORDER)
    params.set("sortOrder", filters.sortOrder);

  return params;
};

export const useNotificationsPage = () => {
  const {
    notifications,
    total,
    isLoading,
    filters,
    fetchNotifications,
    deleteNotification,
    bulkDeleteNotifications,
    sendNotification,
    changeFilters,
  } = useAdminNotifications();

  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);

  useEffect(() => {
    const urlFilters = parseUrlFilters(searchParams);
    const hasUrlParams = searchParams.toString().length > 0;

    const initialFilters: AdminNotificationFilterParams = hasUrlParams
      ? {
          page: urlFilters.page ?? 1,
          limit: urlFilters.limit ?? 10,
          sortBy: urlFilters.sortBy ?? DEFAULT_SORT_BY,
          sortOrder: urlFilters.sortOrder ?? DEFAULT_SORT_ORDER,
          ...urlFilters,
        }
      : filters;

    changeFilters(initialFilters);
    fetchNotifications(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: AdminNotificationFilterParams) => {
      const merged = { ...newFilters, page: 1 };
      changeFilters(merged);
      setSearchParams(buildSearchParams(merged));
      fetchNotifications(merged);
      setSelectedIds([]);
    },
    [changeFilters, setSearchParams, fetchNotifications]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newFilters = { ...filters, page };
      changeFilters(newFilters);
      setSearchParams(buildSearchParams(newFilters));
      fetchNotifications(newFilters);
      setSelectedIds([]);
    },
    [filters, changeFilters, setSearchParams, fetchNotifications]
  );

  const handleRowsPerPageChange = useCallback(
    (limit: number) => {
      const newFilters = { ...filters, limit, page: 1 };
      changeFilters(newFilters);
      setSearchParams(buildSearchParams(newFilters));
      fetchNotifications(newFilters);
      setSelectedIds([]);
    },
    [filters, changeFilters, setSearchParams, fetchNotifications]
  );

  const handleSortChange = useCallback(
    (field: NotificationSortBy) => {
      const isSameField = filters.sortBy === field;
      const newOrder: NotificationSortOrder =
        isSameField && filters.sortOrder === "asc" ? "desc" : "asc";
      const newFilters = { ...filters, sortBy: field, sortOrder: newOrder };
      changeFilters(newFilters);
      setSearchParams(buildSearchParams(newFilters));
      fetchNotifications(newFilters);
    },
    [filters, changeFilters, setSearchParams, fetchNotifications]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      setIsSubmitting(true);
      try {
        await deleteNotification(id);
        showToast({ variant: "success", message: "Notification deleted" });
        setSelectedIds((prev) => prev.filter((i) => i !== id));
      } catch (error) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to delete notification"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [deleteNotification, showToast]
  );

  const handleBulkDelete = useCallback(async () => {
    if (selectedIds.length === 0) return;
    setIsSubmitting(true);
    try {
      await bulkDeleteNotifications(selectedIds);
      showToast({
        variant: "success",
        message: `${selectedIds.length} notifications deleted`,
      });
      setSelectedIds([]);
      fetchNotifications();
    } catch (error) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to bulk delete notifications"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedIds, bulkDeleteNotifications, showToast, fetchNotifications]);

  const handleSend = useCallback(
    async (payload: CreateNotificationPayload) => {
      setIsSubmitting(true);
      try {
        await sendNotification(payload);
        showToast({ variant: "success", message: "Notification sent" });
        setIsSendDialogOpen(false);
        fetchNotifications();
      } catch (error) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to send notification"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [sendNotification, showToast, fetchNotifications]
  );

  const handleSelectEntry = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(notifications.map((n) => n.id));
      } else {
        setSelectedIds([]);
      }
    },
    [notifications]
  );

  return {
    notifications,
    total,
    isLoading,
    filters,
    isSubmitting,
    selectedIds,
    isSendDialogOpen,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
    handleDelete,
    handleBulkDelete,
    handleSend,
    handleSelectEntry,
    handleSelectAll,
    setIsSendDialogOpen,
  };
};
