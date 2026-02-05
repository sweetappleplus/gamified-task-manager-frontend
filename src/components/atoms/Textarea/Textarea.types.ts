export interface TextareaProps {
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Maximum character count, displays counter below textarea
   */
  maxLength?: number;
  /**
   * Controlled value
   */
  value?: string;
  /**
   * Callback fired when the value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Minimum number of rows
   * @default 3
   */
  rows?: number;
}
