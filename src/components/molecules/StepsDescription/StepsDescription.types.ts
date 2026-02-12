import { SxProps, Theme } from "@mui/material";

export interface StepsDescriptionProps {
  /**
   * List of step description strings
   */
  steps: string[];
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
