export type ProgressIndicatorVariant = "ring" | "bar";

export type ProgressIndicatorColor = "blue" | "green";

export interface ProgressIndicatorProps {
  /**
   * The visual style of the progress indicator
   */
  variant: ProgressIndicatorVariant;
  /**
   * The completion percentage (0-100)
   */
  percentage: number;
  /**
   * The background color for the bar variant
   * @default "blue"
   */
  color?: ProgressIndicatorColor;
}
