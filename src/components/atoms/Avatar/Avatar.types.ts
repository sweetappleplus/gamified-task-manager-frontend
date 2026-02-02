export type AvatarSize = 24 | 48 | 64;

export interface AvatarProps {
  /**
   * The size of the avatar in pixels
   * @default 48
   */
  size?: AvatarSize;
  /**
   * The URL of the avatar image
   */
  imageUrl?: string;
  /**
   * The name of the user (used for generating initials)
   */
  name?: string;
  /**
   * The email of the user (required, used as fallback for initials)
   */
  email: string;
}
