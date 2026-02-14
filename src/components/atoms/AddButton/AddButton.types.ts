export interface AddButtonProps {
  /**
   * The label text displayed next to the icon
   * @default "Add"
   */
  text?: string;
  /**
   * Callback fired when the button is clicked
   */
  onClick?: () => void;
}
