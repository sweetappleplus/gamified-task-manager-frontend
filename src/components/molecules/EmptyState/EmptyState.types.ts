import { SxProps, Theme } from "@mui/material";

export interface EmptyStateProps {
  /**
   * Message displayed below the skeleton placeholders
   */
  message?: string;
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
