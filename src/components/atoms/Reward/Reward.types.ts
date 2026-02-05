export type RewardVariant = "blue" | "red" | "orange";

export interface RewardProps {
  /**
   * The color variant of the reward badge
   * @default "blue"
   */
  variant?: RewardVariant;
  /**
   * Optional text to display in the center of the badge
   */
  text?: string;
}
