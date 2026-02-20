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
  /**
   * Max height of the modal on desktop
   * @default 812
   */
  maxHeight?: number;
  /**
   * Background color of the modal
   * @default "grayscale.0"
   */
  bgcolor?: string;
  /**
   * Padding for the modal body of desktop version
   * @default "16px"
   */
  desktopBodyPadding?: string;
  /**
   * Padding for the modal body of mobile version
   * @default "8px 16px"
   */
  mobileBodyPadding?: string;
}
