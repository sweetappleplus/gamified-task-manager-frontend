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
  setWorkerEntries,
  appendWorkerEntries,
  setWorkerTotal,
  setWorkerLoading,
  setWorkerSummary,
  setWorkerSummaryLoading,
  setEarningsOverview,
  setEarningsOverviewLoading,
} from "./slice";
import {
  getAdminLedgerEntriesApi,
  getAdminLedgerSummaryApi,
  markLedgerEntryPaidApi,
  markLedgerEntryUnpaidApi,
  bulkMarkLedgerEntriesPaidApi,
  getWorkerLedgerEntriesApi,
  getWorkerLedgerSummaryApi,
  getEarningsOverviewApi,
} from "services";
import { AdminLedgerFilterParams, WorkerLedgerFilterParams } from "types";

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

export const useWorkerFinance = () => {
  const dispatch = useAppDispatch();
  const workerEntries = useAppSelector(
    (state: RootState) => state.ledgerEntry.workerEntries
  );
  const workerTotal = useAppSelector(
    (state: RootState) => state.ledgerEntry.workerTotal
  );
  const workerIsLoading = useAppSelector(
    (state: RootState) => state.ledgerEntry.workerIsLoading
  );
  const workerSummary = useAppSelector(
    (state: RootState) => state.ledgerEntry.workerSummary
  );
  const workerIsSummaryLoading = useAppSelector(
    (state: RootState) => state.ledgerEntry.workerIsSummaryLoading
  );
  const earningsOverview = useAppSelector(
    (state: RootState) => state.ledgerEntry.earningsOverview
  );
  const isEarningsOverviewLoading = useAppSelector(
    (state: RootState) => state.ledgerEntry.isEarningsOverviewLoading
  );

  const fetchWorkerEntries = useCallback(
    async (params: WorkerLedgerFilterParams) => {
      dispatch(setWorkerLoading(true));
      try {
        const response = await getWorkerLedgerEntriesApi(params);
        if (response.data) {
          dispatch(setWorkerEntries(response.data));
        }
        if (response.pagination) {
          dispatch(setWorkerTotal(response.pagination.total));
        }
        return response;
      } finally {
        dispatch(setWorkerLoading(false));
      }
    },
    [dispatch]
  );

  const fetchMoreWorkerEntries = useCallback(
    async (params: WorkerLedgerFilterParams) => {
      dispatch(setWorkerLoading(true));
      try {
        const response = await getWorkerLedgerEntriesApi(params);
        if (response.data) {
          dispatch(appendWorkerEntries(response.data));
        }
        if (response.pagination) {
          dispatch(setWorkerTotal(response.pagination.total));
        }
        return response;
      } finally {
        dispatch(setWorkerLoading(false));
      }
    },
    [dispatch]
  );

  const fetchWorkerSummary = useCallback(async () => {
    dispatch(setWorkerSummaryLoading(true));
    try {
      const response = await getWorkerLedgerSummaryApi();
      if (response.data) {
        dispatch(setWorkerSummary(response.data));
      }
      return response;
    } finally {
      dispatch(setWorkerSummaryLoading(false));
    }
  }, [dispatch]);

  const fetchEarningsOverview = useCallback(
    async (period?: string) => {
      dispatch(setEarningsOverviewLoading(true));
      try {
        const response = await getEarningsOverviewApi(period);
        if (response.data) {
          dispatch(setEarningsOverview(response.data));
        }
        return response;
      } finally {
        dispatch(setEarningsOverviewLoading(false));
      }
    },
    [dispatch]
  );

  const resetWorkerEntries = useCallback(() => {
    dispatch(setWorkerEntries([]));
    dispatch(setWorkerTotal(0));
  }, [dispatch]);

  return {
    workerEntries,
    workerTotal,
    workerIsLoading,
    workerSummary,
    workerIsSummaryLoading,
    earningsOverview,
    isEarningsOverviewLoading,
    fetchWorkerEntries,
    fetchMoreWorkerEntries,
    fetchWorkerSummary,
    fetchEarningsOverview,
    resetWorkerEntries,
  };
};
