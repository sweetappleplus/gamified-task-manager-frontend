import { ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, "color"> {
  /**
   * The color of the button
   * @default "primary"
   */
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  /**
   * If `true`, the button will show a loading spinner
   * @default false
   */
  loading?: boolean;
  /**
   * The variant to use
   * @default "contained"
   */
  variant?: "contained" | "outlined" | "text";
  /**
   * The size of the button
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * If `true`, the button will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}
