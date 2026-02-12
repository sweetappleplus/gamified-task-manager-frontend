import { SxProps, Theme } from "@mui/material";

export interface RemainingTimeProps {
  /**
   * Task start date-time (ISO string)
   */
  startDateTime: string;
  /**
   * Task deadline date-time (ISO string)
   */
  deadlineDateTime: string;
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
