import { SxProps, Theme } from "@mui/material";
import { PaymentMethodType } from "types";

export type LedgerEntryVariant = "get_paid" | "withdrawal";
export type LedgerEntryStatus = "pending" | "done";
export type LedgerEntryCategory = "regular" | "bonus";

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
