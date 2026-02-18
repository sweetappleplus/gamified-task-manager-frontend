import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "features/user";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  User,
  FilterUsersParams,
  UserSortBy,
  UserSortOrder,
  USER_ROLES,
} from "types";

const DEFAULT_SORT_BY: UserSortBy = "createdAt";
const DEFAULT_SORT_ORDER: UserSortOrder = "desc";

const parseUrlFilters = (searchParams: URLSearchParams): FilterUsersParams => {
  const params: FilterUsersParams = {};

  const page = searchParams.get("page");
  if (page) params.page = Number(page);

  const limit = searchParams.get("limit");
  if (limit) params.limit = Number(limit);

  const search = searchParams.get("search");
  if (search) params.search = search;

  const isActive = searchParams.get("isActive");
  if (isActive === "true") params.isActive = true;
  if (isActive === "false") params.isActive = false;

  const sortBy = searchParams.get("sortBy");
  if (sortBy) params.sortBy = sortBy as UserSortBy;

  const sortOrder = searchParams.get("sortOrder");
  if (sortOrder) params.sortOrder = sortOrder as UserSortOrder;

  return params;
};

const buildSearchParams = (filters: FilterUsersParams): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.page && filters.page !== 1)
    params.set("page", String(filters.page));
  if (filters.limit && filters.limit !== 10)
    params.set("limit", String(filters.limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.isActive !== undefined)
    params.set("isActive", String(filters.isActive));
  if (filters.sortBy && filters.sortBy !== DEFAULT_SORT_BY)
    params.set("sortBy", filters.sortBy);
  if (filters.sortOrder && filters.sortOrder !== DEFAULT_SORT_ORDER)
    params.set("sortOrder", filters.sortOrder);

  return params;
};

export const useWorkersPage = () => {
  const {
    users: workers,
    total,
    isLoading,
    filters,
    fetchUsers,
    toggleUserStatus,
    changeFilters,
  } = useUser();

  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [statusTarget, setStatusTarget] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const initialFilters = useMemo(() => {
    const hasUrlFilters = searchParams.toString().length > 0;
    const defaults: FilterUsersParams = {
      role: USER_ROLES.WORKER,
      page: 1,
      limit: 10,
      sortBy: DEFAULT_SORT_BY,
      sortOrder: DEFAULT_SORT_ORDER,
    };
    if (hasUrlFilters) {
      const urlFilters = parseUrlFilters(searchParams);
      return { ...defaults, ...urlFilters };
    }
    return { ...defaults, ...filters };
  }, [filters, searchParams]);

  useEffect(() => {
    if (!initialized) {
      changeFilters(initialFilters);
      setSearchParams(buildSearchParams(initialFilters), { replace: true });
      fetchUsers(initialFilters).catch((error: unknown) => {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load workers"),
        });
      });
      setInitialized(true);
    }
  }, [
    initialized,
    initialFilters,
    changeFilters,
    setSearchParams,
    fetchUsers,
    showToast,
  ]);

  const openStatusDialog = useCallback((worker: User) => {
    setStatusTarget(worker);
  }, []);

  const closeStatusDialog = useCallback(() => {
    setStatusTarget(null);
  }, []);

  const handleToggleStatus = useCallback(async () => {
    if (!statusTarget) return;
    setIsSubmitting(true);
    try {
      const response = await toggleUserStatus(
        statusTarget.id,
        !statusTarget.isActive
      );
      showToast({ variant: "success", message: response.message });
      closeStatusDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to update worker status"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [statusTarget, toggleUserStatus, showToast, closeStatusDialog]);

  const handleFilterChange = useCallback(
    (newFilters: FilterUsersParams) => {
      const filtersWithRole = { ...newFilters, role: USER_ROLES.WORKER };
      changeFilters(filtersWithRole);
      setSearchParams(buildSearchParams(filtersWithRole), { replace: true });
      fetchUsers(filtersWithRole).catch((error: unknown) => {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load workers"),
        });
      });
    },
    [changeFilters, setSearchParams, fetchUsers, showToast]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      handleFilterChange({ ...filters, page });
    },
    [filters, handleFilterChange]
  );

  const handleRowsPerPageChange = useCallback(
    (rowsPerPage: number) => {
      handleFilterChange({ ...filters, limit: rowsPerPage, page: 1 });
    },
    [filters, handleFilterChange]
  );

  const handleSortChange = useCallback(
    (field: UserSortBy) => {
      const isCurrentField = filters.sortBy === field;
      const newOrder: UserSortOrder =
        isCurrentField && filters.sortOrder === "asc" ? "desc" : "asc";
      handleFilterChange({
        ...filters,
        sortBy: field,
        sortOrder: newOrder,
        page: 1,
      });
    },
    [filters, handleFilterChange]
  );

  return {
    workers,
    total,
    isLoading,
    filters,
    isSubmitting,
    statusTarget,
    openStatusDialog,
    closeStatusDialog,
    handleToggleStatus,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  };
};
