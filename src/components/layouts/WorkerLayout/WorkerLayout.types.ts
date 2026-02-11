import { ReactNode } from "react";

export interface WorkerLayoutProps {
  /**
   * The content to render in the main area
   */
  children: ReactNode;
  /**
   * The currently active route
   */
  activeRoute?: string;
  /**
   * Unread chat count
   */
  chatCount?: number;
}
