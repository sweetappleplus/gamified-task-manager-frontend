import { ButtonProps as MuiButtonProps } from "@mui/material";
import { IconName } from "../Icon/Icon.types";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "gray"
  | "white"
  | "text"
  | "negative"
  | "liquid";

export type ButtonSize = "large" | "normal" | "small" | "xs";

export interface ButtonProps
  extends Omit<MuiButtonProps, "variant" | "size" | "color"> {
  /**
   * The variant of the button
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * The size of the button
   * @default "normal"
   */
  size?: ButtonSize;
  /**
   * Icon displayed at the left of the button
   */
  leftIcon?: IconName;
  /**
   * Icon displayed at the right of the button
   */
  rightIcon?: IconName;
  /**
   * The text content of the button
   */
  text?: string;
  /**
   * If `true`, the button will show a loading spinner
   * @default false
   */
  loading?: boolean;
}
