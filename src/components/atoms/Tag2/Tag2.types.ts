import { IconName } from "components";

export interface Tag2Props {
  /**
   * The text content of the tag
   */
  text: string;
  /**
   * Indicator dot color (theme path or CSS value)
   */
  indicator?: string;
  /**
   * Icon displayed in the tag
   */
  icon?: IconName;
  /**
   * Callback fired when the tag is clicked
   */
  onClick?: () => void;
  /**
   * Whether the tag is in active state
   * @default false
   */
  active?: boolean;
}
