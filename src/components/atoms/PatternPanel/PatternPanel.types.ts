import { ReactNode } from "react";

export type PatternPanelVariant = "dots" | "star" | "magic";

export type PatternPanelColor = "blue" | "green";

export interface PatternPanelProps {
  /**
   * The pattern style
   */
  variant: PatternPanelVariant;
  /**
   * The background color
   */
  color: PatternPanelColor;
  /**
   * Inner padding in pixels
   * @default 16
   */
  padding?: number;
  /**
   * Content to render inside the panel
   */
  children: ReactNode;
}
