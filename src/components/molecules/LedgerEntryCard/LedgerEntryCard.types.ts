import { SxProps, Theme } from "@mui/material";
import { PaymentMethodType } from "types";

export const LEDGER_ENTRY_VARIANTS = {
  GET_PAID: "get_paid",
  WITHDRAWAL: "withdrawal",
} as const;

export type LedgerEntryVariant =
  (typeof LEDGER_ENTRY_VARIANTS)[keyof typeof LEDGER_ENTRY_VARIANTS];

export const LEDGER_ENTRY_STATUSES = {
  PENDING: "pending",
  DONE: "done",
} as const;

export type LedgerEntryStatus =
  (typeof LEDGER_ENTRY_STATUSES)[keyof typeof LEDGER_ENTRY_STATUSES];

export const LEDGER_ENTRY_CATEGORIES = {
  REGULAR: "regular",
  BONUS: "bonus",
} as const;

export type LedgerEntryCategory =
  (typeof LEDGER_ENTRY_CATEGORIES)[keyof typeof LEDGER_ENTRY_CATEGORIES];

interface LedgerEntryCardBaseProps {
  amount: number;
  date: string;
  sx?: SxProps<Theme>;
}

interface GetPaidProps extends LedgerEntryCardBaseProps {
  variant: "get_paid";
  status: LedgerEntryStatus;
  category: LedgerEntryCategory;
  taskTitle: string;
}

interface WithdrawalProps extends LedgerEntryCardBaseProps {
  variant: "withdrawal";
  status: LedgerEntryStatus;
  paymentMethod: PaymentMethodType;
}

export type LedgerEntryCardProps = GetPaidProps | WithdrawalProps;
