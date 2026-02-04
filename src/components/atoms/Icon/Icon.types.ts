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
  | "google-colored"
  | "diamond-colored"
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
  | "master-card-colored"
  | "crypto-usdt-colored"
  | "visa-colored"
  | "triple-dots"
  | "chevron-down"
  | "silver-star-colored"
  | "gold-star-colored"
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
