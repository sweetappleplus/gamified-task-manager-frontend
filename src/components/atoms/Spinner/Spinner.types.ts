export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps {
  /**
   * The size of the spinner
   * @default "md"
   */
  size?: SpinnerSize;
  /**
   * The message displayed below the spinner
   * @default "Loading"
   */
  message?: string;
}
