import { ButtonProps as MuiButtonProps } from "@mui/material";

export type SocialProvider =
  | "google"
  | "microsoft"
  | "facebook"
  | "linkedin"
  | "whatsapp"
  | "telegram"
  | "discord";

export interface SocialOauthButtonProps
  extends Omit<MuiButtonProps, "color" | "variant"> {
  /**
   * The social provider for the OAuth button
   */
  social: SocialProvider;
  /**
   * If `true`, the button will show a loading spinner
   * @default false
   */
  loading?: boolean;
}
