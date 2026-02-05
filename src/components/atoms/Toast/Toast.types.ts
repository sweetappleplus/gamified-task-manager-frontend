import { SnackbarProps } from "@mui/material";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastProps
  extends Omit<SnackbarProps, "variant" | "children"> {
  /**
   * The variant of the toast
   * @default "info"
   */
  variant?: ToastVariant;
  /**
   * The message to display
   */
  message: string;
  /**
   * Whether the toast is open
   */
  open: boolean;
  /**
   * Callback fired when the toast is closed
   */
  onClose: () => void;
  /**
   * Callback fired when the close button is clicked
   */
  onClickCloseButton?: () => void;
  /**
   * Auto-hide duration in milliseconds
   * @default 3000
   */
  autoHideDuration?: number;
}
