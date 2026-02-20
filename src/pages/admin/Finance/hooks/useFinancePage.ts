import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLedgerEntry } from "features/ledger-entry";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  AdminLedgerFilterParams,
  LedgerType,
  LedgerSortBy,
  LedgerSortOrder,
} from "types";

const DEFAULT_SORT_BY: LedgerSortBy = "createdAt";
const DEFAULT_SORT_ORDER: LedgerSortOrder = "desc";

const parseUrlFilters = (
  searchParams: URLSearchParams
): AdminLedgerFilterParams => {
  const params: AdminLedgerFilterParams = {};

  const page = searchParams.get("page");
  if (page) params.page = Number(page);

  const limit = searchParams.get("limit");
  if (limit) params.limit = Number(limit);

  const type = searchParams.get("type");
  if (type) params.type = type as LedgerType;

  const isPaid = searchParams.get("isPaid");
  if (isPaid === "true") params.isPaid = true;
  if (isPaid === "false") params.isPaid = false;

  const userId = searchParams.get("userId");
  if (userId) params.userId = userId;

  const search = searchParams.get("search");
  if (search) params.search = search;

  const createdFrom = searchParams.get("createdFrom");
  if (createdFrom) params.createdFrom = createdFrom;

  const createdTo = searchParams.get("createdTo");
  if (createdTo) params.createdTo = createdTo;

  const sortBy = searchParams.get("sortBy");
  if (sortBy) params.sortBy = sortBy as LedgerSortBy;

  const sortOrder = searchParams.get("sortOrder");
  if (sortOrder) params.sortOrder = sortOrder as LedgerSortOrder;

  return params;
};

const buildSearchParams = (
  filters: AdminLedgerFilterParams
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.page && filters.page !== 1)
    params.set("page", String(filters.page));
  if (filters.limit && filters.limit !== 10)
    params.set("limit", String(filters.limit));
  if (filters.type) params.set("type", filters.type);
  if (filters.isPaid !== undefined)
    params.set("isPaid", String(filters.isPaid));
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

export const useFinancePage = () => {
  const {
    entries,
    total,
    isLoading,
    filters,
    summary,
    isSummaryLoading,
    fetchEntries,
    fetchSummary,
    markAsPaid,
    markAsUnpaid,
    bulkMarkAsPaid,
    changeFilters,
  } = useLedgerEntry();

  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Initialize filters from URL on mount
  useEffect(() => {
    const urlFilters = parseUrlFilters(searchParams);
    const hasUrlParams = searchParams.toString().length > 0;

    const initialFilters: AdminLedgerFilterParams = hasUrlParams
      ? {
          page: urlFilters.page ?? 1,
          limit: urlFilters.limit ?? 10,
          sortBy: urlFilters.sortBy ?? DEFAULT_SORT_BY,
          sortOrder: urlFilters.sortOrder ?? DEFAULT_SORT_ORDER,
          ...urlFilters,
        }
      : filters;

    changeFilters(initialFilters);
    fetchEntries(initialFilters);
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: AdminLedgerFilterParams) => {
      const merged = { ...newFilters, page: 1 };
      changeFilters(merged);
      setSearchParams(buildSearchParams(merged));
      fetchEntries(merged);
      setSelectedIds([]);
    },
    [changeFilters, setSearchParams, fetchEntries]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newFilters = { ...filters, page };
      changeFilters(newFilters);
      setSearchParams(buildSearchParams(newFilters));
      fetchEntries(newFilters);
      setSelectedIds([]);
    },
    [filters, changeFilters, setSearchParams, fetchEntries]
  );

  const handleRowsPerPageChange = useCallback(
    (limit: number) => {
      const newFilters = { ...filters, limit, page: 1 };
      changeFilters(newFilters);
      setSearchParams(buildSearchParams(newFilters));
      fetchEntries(newFilters);
      setSelectedIds([]);
    },
    [filters, changeFilters, setSearchParams, fetchEntries]
  );

  const handleSortChange = useCallback(
    (field: LedgerSortBy) => {
      const isSameField = filters.sortBy === field;
      const newOrder: LedgerSortOrder =
        isSameField && filters.sortOrder === "asc" ? "desc" : "asc";
      const newFilters = { ...filters, sortBy: field, sortOrder: newOrder };
      changeFilters(newFilters);
      setSearchParams(buildSearchParams(newFilters));
      fetchEntries(newFilters);
    },
    [filters, changeFilters, setSearchParams, fetchEntries]
  );

  const handleMarkAsPaid = useCallback(
    async (id: string) => {
      setIsSubmitting(true);
      try {
        await markAsPaid(id);
        showToast({ variant: "success", message: "Entry marked as paid" });
        fetchSummary();
      } catch (error) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to mark as paid"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [markAsPaid, showToast, fetchSummary]
  );

  const handleMarkAsUnpaid = useCallback(
    async (id: string) => {
      setIsSubmitting(true);
      try {
        await markAsUnpaid(id);
        showToast({ variant: "success", message: "Entry marked as unpaid" });
        fetchSummary();
      } catch (error) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to mark as unpaid"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [markAsUnpaid, showToast, fetchSummary]
  );

  const handleBulkMarkAsPaid = useCallback(async () => {
    if (selectedIds.length === 0) return;
    setIsSubmitting(true);
    try {
      await bulkMarkAsPaid(selectedIds);
      showToast({
        variant: "success",
        message: `${selectedIds.length} entries marked as paid`,
      });
      setSelectedIds([]);
      fetchEntries();
      fetchSummary();
    } catch (error) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to bulk mark as paid"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedIds, bulkMarkAsPaid, showToast, fetchEntries, fetchSummary]);

  const handleSelectEntry = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const unpaidIds = entries.filter((e) => !e.isPaid).map((e) => e.id);
        setSelectedIds(unpaidIds);
      } else {
        setSelectedIds([]);
      }
    },
    [entries]
  );

  return {
    entries,
    total,
    isLoading,
    filters,
    summary,
    isSummaryLoading,
    isSubmitting,
    selectedIds,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
    handleMarkAsPaid,
    handleMarkAsUnpaid,
    handleBulkMarkAsPaid,
    handleSelectEntry,
    handleSelectAll,
  };
};
