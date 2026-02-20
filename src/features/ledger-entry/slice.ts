import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LedgerEntry,
  AdminLedgerFilterParams,
  AdminLedgerSummary,
} from "types";

type LedgerEntryState = {
  entries: LedgerEntry[];
  total: number;
  isLoading: boolean;
  filters: AdminLedgerFilterParams;
  summary: AdminLedgerSummary | null;
  isSummaryLoading: boolean;
};

const initialState: LedgerEntryState = {
  entries: [],
  total: 0,
  isLoading: false,
  filters: { page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" },
  summary: null,
  isSummaryLoading: false,
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
} = ledgerEntrySlice.actions;

export default ledgerEntrySlice.reducer;
