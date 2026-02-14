import { SxProps, Theme } from "@mui/material";

export interface BalanceCardProps {
  /**
   * Label text above the amount
   * @default "Balance After Completion"
   */
  label?: string;
  /**
   * Prefix before the formatted amount
   * @default "$"
   */
  amountPrefix?: string;
  /**
   * Main balance amount (displayed with 2 decimal places)
   */
  amount: number;
  /**
   * Additional amount shown as a badge (displayed with 2 decimal places)
   */
  additionalAmount?: number;
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
