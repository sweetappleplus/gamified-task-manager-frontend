export interface OtpInputProps {
  /**
   * Number of OTP input fields
   * @default 6
   */
  length?: number;
  /**
   * Whether autocomplete is enabled
   * @default false
   */
  autoComplete?: boolean;
  /**
   * Callback fired when the OTP value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback fired when all fields are filled
   */
  onComplete?: (value: string) => void;
}
