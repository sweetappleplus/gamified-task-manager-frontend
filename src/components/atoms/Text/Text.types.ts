import { TypographyProps } from "@mui/material";

export type TextVariant = "heading" | "body" | "bodyMuted";

export interface TextProps extends Omit<TypographyProps, "variant"> {
  /**
   * The variant of the text
   * @default "body"
   */
  variant?: TextVariant;
}
