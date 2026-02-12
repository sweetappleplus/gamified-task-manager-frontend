import { SxProps, Theme } from "@mui/material";

export interface TimeCounterProps {
  /**
   * Total seconds to display as HH:MM:SS
   */
  seconds: number;
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
