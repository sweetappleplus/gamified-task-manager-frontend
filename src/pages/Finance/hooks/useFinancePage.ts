import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkerFinance } from "features/ledger-entry";
import { LEDGER_TYPES, LedgerType, LedgerEntry } from "types";

const ITEMS_PER_PAGE = 15;

const TAB_VALUES = {
  TRANSACTION_HISTORY: "transaction_history",
  WITHDRAWALS: "withdrawals",
} as const;

const TAB_TYPE_MAP: Record<string, LedgerType | undefined> = {
  [TAB_VALUES.TRANSACTION_HISTORY]: undefined,
  [TAB_VALUES.WITHDRAWALS]: LEDGER_TYPES.WITHDRAWAL,
};

interface TabCache {
  entries: LedgerEntry[];
  total: number;
  page: number;
  hasMore: boolean;
}

const PERIOD_OPTIONS = [
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "Last 3 Months", value: "last_3_months" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "This Year", value: "this_year" },
  { label: "All Time", value: "all_time" },
];

export const useFinancePage = () => {
  const navigate = useNavigate();
  const {
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
    restoreWorkerEntries,
  } = useWorkerFinance();

  const [activeTab, setActiveTab] = useState(TAB_VALUES.TRANSACTION_HISTORY);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [earningsPeriod, setEarningsPeriod] = useState("this_month");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tabCacheRef = useRef<Record<string, TabCache>>({});

  // Fetch summary on mount
  useEffect(() => {
    fetchWorkerSummary();
  }, [fetchWorkerSummary]);

  // Fetch earnings overview when period changes
  useEffect(() => {
    fetchEarningsOverview(earningsPeriod);
  }, [earningsPeriod, fetchEarningsOverview]);

  // Fetch entries when tab changes (restore from cache if available)
  useEffect(() => {
    const cached = tabCacheRef.current[activeTab];
    if (cached) {
      restoreWorkerEntries(cached.entries, cached.total);
      setPage(cached.page);
      setHasMore(cached.hasMore);
      return;
    }

    setPage(1);
    setHasMore(true);
    const type = TAB_TYPE_MAP[activeTab];
    fetchWorkerEntries({ page: 1, limit: ITEMS_PER_PAGE, type }).then(
      (response) => {
        if (response?.pagination) {
          setHasMore(1 < response.pagination.totalPages);
        } else {
          setHasMore(false);
        }
      }
    );
  }, [activeTab, fetchWorkerEntries, restoreWorkerEntries]);

  const loadMore = useCallback(async () => {
    if (workerIsLoading || !hasMore) return;
    const nextPage = page + 1;
    const type = TAB_TYPE_MAP[activeTab];
    try {
      const response = await fetchMoreWorkerEntries({
        page: nextPage,
        limit: ITEMS_PER_PAGE,
        type,
      });
      if (response?.pagination) {
        setPage(nextPage);
        setHasMore(nextPage < response.pagination.totalPages);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    }
  }, [workerIsLoading, hasMore, page, activeTab, fetchMoreWorkerEntries]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !workerIsLoading) {
            loadMore();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [hasMore, workerIsLoading, loadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleTabChange = useCallback(
    (value: string) => {
      if (value === activeTab) return;
      // Save current tab data to cache before switching
      tabCacheRef.current[activeTab] = {
        entries: workerEntries,
        total: workerTotal,
        page,
        hasMore,
      };
      setActiveTab(value as typeof activeTab);
    },
    [activeTab, workerEntries, workerTotal, page, hasMore]
  );

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleWithdraw = useCallback(() => {
    // Withdraw functionality - to be implemented
  }, []);

  const handlePeriodChange = useCallback((value: string) => {
    setEarningsPeriod(value);
  }, []);

  // Parse summary values
  const balance = workerSummary ? parseFloat(workerSummary.balance) : 0;
  const withdrawable = workerSummary
    ? parseFloat(workerSummary.withdrawable)
    : 0;
  const pendingPayments = workerSummary
    ? parseFloat(workerSummary.pendingPayments)
    : 0;

  return {
    // Wallet data
    balance,
    withdrawable,
    pendingPayments,
    isSummaryLoading: workerIsSummaryLoading,
    // Earnings overview
    earningsOverview,
    isEarningsOverviewLoading,
    earningsPeriod,
    periodOptions: PERIOD_OPTIONS,
    handlePeriodChange,
    // Transaction list
    entries: workerEntries,
    total: workerTotal,
    isLoading: workerIsLoading,
    hasMore,
    // Tab
    activeTab,
    tabItems: [
      { label: "Transaction history", value: TAB_VALUES.TRANSACTION_HISTORY },
      { label: "Withdrawals", value: TAB_VALUES.WITHDRAWALS },
    ],
    // Handlers
    handleTabChange,
    handleBack,
    handleWithdraw,
    sentinelRef,
  };
};
