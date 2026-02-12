import { SxProps, Theme } from "@mui/material";

export interface RewardsEconomicsProps {
  /**
   * Total budget amount (displayed with 2 decimal places)
   */
  budget: number;
  /**
   * Commission percentage (e.g. 15 for 15%)
   */
  commissionPercent: number;
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
