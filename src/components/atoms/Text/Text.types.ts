import { TypographyProps } from "@mui/material";

export type TextVariant =
  | "pageTitle"
  | "heading"
  | "body"
  | "bodyMuted"
  | "bodyMutedStrong"
  | "bodyStrong"
  | "small";

export interface TextProps extends Omit<TypographyProps, "variant"> {
  /**
   * The variant of the text
   * @default "body"
   */
  variant?: TextVariant;
}
