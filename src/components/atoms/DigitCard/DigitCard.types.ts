import { SxProps, Theme } from "@mui/material";

export interface DigitCardProps {
  /**
   * The digit to display (0–9)
   */
  digit: number;
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
