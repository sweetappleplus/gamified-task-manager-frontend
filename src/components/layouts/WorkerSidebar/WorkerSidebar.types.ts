import { User } from "types";
import { LeafVariant } from "components";

export interface WorkerSidebarProps {
  /**
   * The currently active route
   */
  activeRoute?: string;
  /**
   * Unread notification count
   */
  notificationCount?: number;
  /**
   * Unread chat count
   */
  chatCount?: number;
  /**
   * Current user
   */
  user?: User;
  /**
   * Leaf variant based on user level
   */
  leafVariant?: LeafVariant;
  /**
   * Leaf text (level name)
   */
  leafText?: string;
  /**
   * Callback to open the notification modal
   */
  onNotificationClick?: () => void;
}
