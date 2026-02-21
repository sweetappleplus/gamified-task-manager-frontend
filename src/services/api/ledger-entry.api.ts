import { api } from "./axios.instance";
import {
  API_URL_LEDGER_ENTRIES,
  API_URL_LEDGER_ENTRIES_SUMMARY,
  API_URL_LEDGER_ENTRIES_EARNINGS_OVERVIEW,
  API_URL_LEDGER_ENTRIES_ADMIN,
  API_URL_LEDGER_ENTRIES_ADMIN_SUMMARY,
  API_URL_LEDGER_ENTRIES_ADMIN_MARK_PAID,
  API_URL_LEDGER_ENTRIES_ADMIN_MARK_UNPAID,
  API_URL_LEDGER_ENTRIES_ADMIN_BULK_MARK_PAID,
} from "consts";
import {
  LedgerEntry,
  AdminLedgerFilterParams,
  AdminLedgerSummary,
  WorkerLedgerFilterParams,
  WorkerLedgerSummary,
  EarningsOverviewItem,
  PaginatedApiResponse,
  ApiResponse,
} from "types";

// ===== Worker API =====

export const getWorkerLedgerEntriesApi = (
  params?: WorkerLedgerFilterParams
): Promise<PaginatedApiResponse<LedgerEntry[]>> => {
  return api
    .get<PaginatedApiResponse<LedgerEntry[]>>(API_URL_LEDGER_ENTRIES, {
      params,
    })
    .then((res) => res.data);
};

export const getWorkerLedgerSummaryApi = (): Promise<
  ApiResponse<WorkerLedgerSummary>
> => {
  return api
    .get<ApiResponse<WorkerLedgerSummary>>(API_URL_LEDGER_ENTRIES_SUMMARY)
    .then((res) => res.data);
};

export const getEarningsOverviewApi = (
  period?: string
): Promise<ApiResponse<EarningsOverviewItem[]>> => {
  return api
    .get<
      ApiResponse<EarningsOverviewItem[]>
    >(API_URL_LEDGER_ENTRIES_EARNINGS_OVERVIEW, { params: period ? { period } : undefined })
    .then((res) => res.data);
};

// ===== Admin API =====

export const getAdminLedgerEntriesApi = (
  params?: AdminLedgerFilterParams
): Promise<PaginatedApiResponse<LedgerEntry[]>> => {
  return api
    .get<PaginatedApiResponse<LedgerEntry[]>>(API_URL_LEDGER_ENTRIES_ADMIN, {
      params,
    })
    .then((res) => res.data);
};

export const getAdminLedgerSummaryApi = (): Promise<
  ApiResponse<AdminLedgerSummary>
> => {
  return api
    .get<ApiResponse<AdminLedgerSummary>>(API_URL_LEDGER_ENTRIES_ADMIN_SUMMARY)
    .then((res) => res.data);
};

export const markLedgerEntryPaidApi = (
  id: string
): Promise<ApiResponse<LedgerEntry>> => {
  return api
    .post<
      ApiResponse<LedgerEntry>
    >(API_URL_LEDGER_ENTRIES_ADMIN_MARK_PAID.replace(":id", id))
    .then((res) => res.data);
};

export const markLedgerEntryUnpaidApi = (
  id: string
): Promise<ApiResponse<LedgerEntry>> => {
  return api
    .post<
      ApiResponse<LedgerEntry>
    >(API_URL_LEDGER_ENTRIES_ADMIN_MARK_UNPAID.replace(":id", id))
    .then((res) => res.data);
};

export const bulkMarkLedgerEntriesPaidApi = (
  ids: string[]
): Promise<ApiResponse<{ updatedCount: number }>> => {
  return api
    .post<
      ApiResponse<{ updatedCount: number }>
    >(API_URL_LEDGER_ENTRIES_ADMIN_BULK_MARK_PAID, { ids })
    .then((res) => res.data);
};
