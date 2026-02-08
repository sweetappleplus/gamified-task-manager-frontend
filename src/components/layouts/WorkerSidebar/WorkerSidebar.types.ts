export interface WorkerSidebarProps {
  /**
   * The currently active route
   */
  activeRoute?: string;
  /**
   * Whether the user is an admin
   * @default false
   */
  isAdmin?: boolean;
  /**
   * Unread notification count
   */
  notificationCount?: number;
  /**
   * Unread chat count
   */
  chatCount?: number;
}
