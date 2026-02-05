export type TextVariant = "heading" | "body" | "bodyMuted";

export interface TextProps {
  /**
   * The variant of the text
   * @default "body"
   */
  variant?: TextVariant;
  /**
   * The text content
   */
  children: React.ReactNode;
}
