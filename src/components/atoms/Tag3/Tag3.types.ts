import { IconName } from "components";

export interface Tag3Props {
  /**
   * The text content of the tag
   */
  text: string;
  /**
   * Optional icon displayed before the text
   */
  icon?: IconName;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}
