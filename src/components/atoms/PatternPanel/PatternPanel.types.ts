import { ReactNode } from "react";

export type PatternPanelVariant = "blue" | "green";

export interface PatternPanelProps {
  /**
   * The background color variant
   */
  variant: PatternPanelVariant;
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
