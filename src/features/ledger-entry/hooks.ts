import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setEntries,
  setTotal,
  setLoading,
  setFilters,
  setSummary,
  setSummaryLoading,
  updateEntryInList,
} from "./slice";
import {
  getAdminLedgerEntriesApi,
  getAdminLedgerSummaryApi,
  markLedgerEntryPaidApi,
  markLedgerEntryUnpaidApi,
  bulkMarkLedgerEntriesPaidApi,
} from "services";
import { AdminLedgerFilterParams } from "types";

export const useLedgerEntry = () => {
  const dispatch = useAppDispatch();
  const entries = useAppSelector(
    (state: RootState) => state.ledgerEntry.entries
  );
  const total = useAppSelector((state: RootState) => state.ledgerEntry.total);
  const isLoading = useAppSelector(
    (state: RootState) => state.ledgerEntry.isLoading
  );
  const filters = useAppSelector(
    (state: RootState) => state.ledgerEntry.filters
  );
  const summary = useAppSelector(
    (state: RootState) => state.ledgerEntry.summary
  );
  const isSummaryLoading = useAppSelector(
    (state: RootState) => state.ledgerEntry.isSummaryLoading
  );

  const fetchEntries = useCallback(
    async (params?: AdminLedgerFilterParams) => {
      const queryParams = params ?? filters;
      dispatch(setLoading(true));
      try {
        const response = await getAdminLedgerEntriesApi(queryParams);
        if (response.data) {
          dispatch(setEntries(response.data));
        }
        if (response.pagination) {
          dispatch(setTotal(response.pagination.total));
        }
        return response;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, filters]
  );

  const fetchSummary = useCallback(async () => {
    dispatch(setSummaryLoading(true));
    try {
      const response = await getAdminLedgerSummaryApi();
      if (response.data) {
        dispatch(setSummary(response.data));
      }
      return response;
    } finally {
      dispatch(setSummaryLoading(false));
    }
  }, [dispatch]);

  const markAsPaid = useCallback(
    async (id: string) => {
      const response = await markLedgerEntryPaidApi(id);
      if (response.data) {
        dispatch(updateEntryInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const markAsUnpaid = useCallback(
    async (id: string) => {
      const response = await markLedgerEntryUnpaidApi(id);
      if (response.data) {
        dispatch(updateEntryInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const bulkMarkAsPaid = useCallback(async (ids: string[]) => {
    const response = await bulkMarkLedgerEntriesPaidApi(ids);
    return response;
  }, []);

  const changeFilters = useCallback(
    (newFilters: AdminLedgerFilterParams) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  return {
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
  };
};
