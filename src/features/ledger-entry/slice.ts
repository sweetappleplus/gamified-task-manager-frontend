import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LedgerEntry,
  AdminLedgerFilterParams,
  AdminLedgerSummary,
  WorkerLedgerSummary,
  EarningsOverviewItem,
} from "types";

type LedgerEntryState = {
  // Admin state
  entries: LedgerEntry[];
  total: number;
  isLoading: boolean;
  filters: AdminLedgerFilterParams;
  summary: AdminLedgerSummary | null;
  isSummaryLoading: boolean;
  // Worker finance state
  workerEntries: LedgerEntry[];
  workerTotal: number;
  workerIsLoading: boolean;
  workerSummary: WorkerLedgerSummary | null;
  workerIsSummaryLoading: boolean;
  earningsOverview: EarningsOverviewItem[];
  isEarningsOverviewLoading: boolean;
};

const initialState: LedgerEntryState = {
  entries: [],
  total: 0,
  isLoading: false,
  filters: { page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" },
  summary: null,
  isSummaryLoading: false,
  workerEntries: [],
  workerTotal: 0,
  workerIsLoading: false,
  workerSummary: null,
  workerIsSummaryLoading: false,
  earningsOverview: [],
  isEarningsOverviewLoading: false,
};

const ledgerEntrySlice = createSlice({
  name: "ledgerEntry",
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<LedgerEntry[]>) => {
      state.entries = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFilters: (state, action: PayloadAction<AdminLedgerFilterParams>) => {
      state.filters = action.payload;
    },
    setSummary: (state, action: PayloadAction<AdminLedgerSummary | null>) => {
      state.summary = action.payload;
    },
    setSummaryLoading: (state, action: PayloadAction<boolean>) => {
      state.isSummaryLoading = action.payload;
    },
    updateEntryInList: (state, action: PayloadAction<LedgerEntry>) => {
      const index = state.entries.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    // Worker finance reducers
    setWorkerEntries: (state, action: PayloadAction<LedgerEntry[]>) => {
      state.workerEntries = action.payload;
    },
    appendWorkerEntries: (state, action: PayloadAction<LedgerEntry[]>) => {
      state.workerEntries = [...state.workerEntries, ...action.payload];
    },
    setWorkerTotal: (state, action: PayloadAction<number>) => {
      state.workerTotal = action.payload;
    },
    setWorkerLoading: (state, action: PayloadAction<boolean>) => {
      state.workerIsLoading = action.payload;
    },
    setWorkerSummary: (
      state,
      action: PayloadAction<WorkerLedgerSummary | null>
    ) => {
      state.workerSummary = action.payload;
    },
    setWorkerSummaryLoading: (state, action: PayloadAction<boolean>) => {
      state.workerIsSummaryLoading = action.payload;
    },
    setEarningsOverview: (
      state,
      action: PayloadAction<EarningsOverviewItem[]>
    ) => {
      state.earningsOverview = action.payload;
    },
    setEarningsOverviewLoading: (state, action: PayloadAction<boolean>) => {
      state.isEarningsOverviewLoading = action.payload;
    },
  },
});

export const {
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
} = ledgerEntrySlice.actions;

export default ledgerEntrySlice.reducer;
