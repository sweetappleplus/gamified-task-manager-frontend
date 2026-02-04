export type BadgeVariant = "primary" | "secondary";

export interface BadgeProps {
  /**
   * The variant of the badge
   * @default "primary"
   */
  variant?: BadgeVariant;
  /**
   * The text content of the badge
   */
  text: string;
}
