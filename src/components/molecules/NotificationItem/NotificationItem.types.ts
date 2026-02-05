export interface NotificationItemProps {
  /**
   * The title of the notification
   */
  title: string;
  /**
   * The content/description of the notification
   */
  content: string;
  /**
   * Whether the notification has been read
   * @default false
   */
  isRead?: boolean;
  /**
   * Callback fired when the notification is clicked
   */
  onClick?: () => void;
}
