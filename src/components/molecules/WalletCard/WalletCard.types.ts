import { SxProps, Theme } from "@mui/material";

export interface WalletCardProps {
  balance: number;
  totalEarnings: number;
  pending: number;
  onWithdraw?: () => void;
  sx?: SxProps<Theme>;
}
