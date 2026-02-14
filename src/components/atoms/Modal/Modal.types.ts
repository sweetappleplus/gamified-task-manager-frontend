import React from "react";

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Callback fired when the modal is closed
   */
  onClose: () => void;
  /**
   * The title displayed in the modal header
   */
  title: string;
  /**
   * The content rendered in the modal body
   */
  body: React.ReactNode;
  /**
   * Optional content rendered in the sticky footer
   */
  footer?: React.ReactNode;
  /**
   * Max width of the modal on desktop
   * @default 480
   */
  maxWidth?: number;
}
