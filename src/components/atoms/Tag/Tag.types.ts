export interface TagProps {
  /**
   * The text content of the tag
   */
  text: string;
  /**
   * Background color override (theme path or CSS value)
   * @default "grayscale.50"
   */
  bgColor?: string;
  /**
   * Text color override (theme path or CSS value)
   * @default "grayscale.950"
   */
  textColor?: string;
  /**
   * Maximum width of the tag in pixels. Text will be truncated with ellipsis.
   */
  maxWidth?: number;
}
