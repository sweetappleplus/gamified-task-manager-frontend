export const PAYMENT_METHOD_TYPES = {
  BANK_ACCOUNT: "BANK_ACCOUNT",
  PAYPAL: "PAYPAL",
  CRYPTO: "CRYPTO",
  CARD: "CARD",
} as const;

export type PaymentMethodType =
  (typeof PAYMENT_METHOD_TYPES)[keyof typeof PAYMENT_METHOD_TYPES];

export const LEDGER_TYPES = {
  TASK_REWARD: "TASK_REWARD",
  BONUS: "BONUS",
  ADJUSTMENT: "ADJUSTMENT",
  WITHDRAWAL: "WITHDRAWAL",
} as const;

export type LedgerType = (typeof LEDGER_TYPES)[keyof typeof LEDGER_TYPES];

export type LedgerEntryUser = {
  id: string;
  email: string;
  name?: string | null;
};

export type LedgerEntryTask = {
  id: string;
  title: string;
  status: string;
};

export type LedgerEntryPaymentMethod = {
  id: string;
  type: PaymentMethodType;
  provider?: string | null;
  accountInfo: string;
};

export type LedgerEntry = {
  id: string;
  userId: string;
  type: LedgerType;
  amount: string;
  description?: string | null;
  relatedTaskId?: string | null;
  paymentMethodId?: string | null;
  isPaid: boolean;
  paidAt?: string | null;
  createdAt: string;
  user?: LedgerEntryUser;
  relatedTask?: LedgerEntryTask | null;
  paymentMethod?: LedgerEntryPaymentMethod | null;
};

export type AdminLedgerFilterParams = {
  page?: number;
  limit?: number;
  type?: LedgerType;
  isPaid?: boolean;
  userId?: string;
  search?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: LedgerSortBy;
  sortOrder?: LedgerSortOrder;
};

export type LedgerSortBy = "createdAt" | "amount";
export type LedgerSortOrder = "asc" | "desc";

export type AdminLedgerSummary = {
  totalEarned: string;
  totalBonuses: string;
  totalAdjustments: string;
  totalWithdrawals: string;
  pendingPayout: string;
  alreadyPaid: string;
};

export type WorkerLedgerFilterParams = {
  page?: number;
  limit?: number;
  type?: LedgerType;
};

export type WorkerLedgerSummary = {
  balance: string;
  withdrawable: string;
  pendingPayments: string;
};

export type EarningsOverviewItem = {
  label: string;
  total: string;
};
