import { IconName } from "components";

export type SidebarNavItemVariant = "default" | "highlighted";

export interface SidebarNavItemProps {
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
   * The variant of the navigation item
   * @default "default"
   */
  variant?: SidebarNavItemVariant;
  /**
   * Optional badge count to display
   */
  badge?: number;
  /**
   * Whether the item is currently active
   * @default false
   */
  isActive?: boolean;
}
