import { IconName } from "components";

export type IconButtonVariant = "gray" | "white";

export interface IconButtonProps {
  /**
   * The variant of the icon button
   * @default "gray"
   */
  variant?: IconButtonVariant;
  /**
   * The icon to display
   */
  icon: IconName;
  /**
   * Callback fired when the button is clicked
   */
  onClick?: () => void;
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
}
