import { IconName } from "components";

export type FooterNavButtonVariant = "default" | "highlighted";

export interface FooterNavButtonProps {
  /**
   * The icon name to display
   */
  icon: IconName;
  /**
   * The label text
   */
  label: string;
  /**
   * The route to navigate to when clicked
   */
  route: string;
  /**
   * The variant of the button
   * @default "default"
   */
  variant?: FooterNavButtonVariant;
  /**
   * Whether the button is currently active
   * @default false
   */
  isActive?: boolean;
}
