import { FooterNavButtonProps } from "components";

export interface FooterNavLinksProps {
  /**
   * Array of footer navigation buttons to render
   */
  items: FooterNavButtonProps[];
  /**
   * The currently active route
   */
  activeRoute?: string;
}
