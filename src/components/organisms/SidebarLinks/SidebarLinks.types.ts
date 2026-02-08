import { SidebarNavItemProps } from "components";

export interface SidebarLinksProps {
  /**
   * Array of sidebar navigation items to render
   */
  items: SidebarNavItemProps[];
  /**
   * The currently active route
   */
  activeRoute?: string;
}
