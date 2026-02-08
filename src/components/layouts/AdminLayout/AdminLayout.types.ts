import { ReactNode } from "react";

export interface AdminLayoutProps {
  /**
   * The content to render in the main area
   */
  children: ReactNode;
  /**
   * The currently active route
   */
  activeRoute?: string;
}
