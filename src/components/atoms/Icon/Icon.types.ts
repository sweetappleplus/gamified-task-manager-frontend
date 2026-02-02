export type IconName =
  | "bell"
  | "wallet-open"
  | "star"
  | "earned"
  | "triple-arrow-right"
  | "home"
  | "list"
  | "message"
  | "contact"
  | "rocket"
  | "telegram"
  | "whatsapp"
  | "vector"
  | "high-chart"
  | "google"
  | "diamond"
  | "arrow-left"
  | "document"
  | "clock-circle"
  | "info-circle"
  | "document-add"
  | "plus-circle"
  | "link"
  | "gift"
  | "close-circle"
  | "paper"
  | "x"
  | "check"
  | "check-circle"
  | "master-card"
  | "crypto-usdt"
  | "visa"
  | "triple-dots"
  | "chevron-down"
  | "silver-star"
  | "gold-star"
  | "bank"
  | "wallet-close"
  | "eye"
  | "eye-slash"
  | "exclamation"
  | "pencil"
  | "check-2"
  | "calendar"
  | "prize";

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
