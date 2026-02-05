import { InputBaseProps } from "@mui/material";
import { IconName } from "components";

export type InputVariant = "normal" | "validated" | "error";

export interface InputProps
  extends Omit<InputBaseProps, "variant" | "size" | "color"> {
  /**
   * The variant of the input
   * @default "normal"
   */
  variant?: InputVariant;
  /**
   * Placeholder text displayed in the input
   */
  placeholder?: string;
  /**
   * Helper label displayed below the input
   */
  label?: string;
  /**
   * Icon displayed at the left of the input
   */
  leftIcon?: IconName;
  /**
   * Icon displayed at the right of the input
   */
  rightIcon?: IconName;
  /**
   * Callback fired when the left icon is clicked
   */
  onClickLeftIcon?: () => void;
  /**
   * Callback fired when the right icon is clicked
   */
  onClickRightIcon?: () => void;
}
