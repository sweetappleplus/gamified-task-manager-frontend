import { IconName, ICONS } from "./icons";

export type { IconName };

export { ICONS };

export interface IconProps {
  /**
   * The name of the icon to display
   */
  name: IconName;
  /**
   * The size of the icon in pixels
   * @default 18
   */
  size?: number;
  /**
   * The color of the icon
   * @default "currentColor"
   */
  color?: string;
}
