import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import {
  SocialOauthButtonProps,
  SocialProvider,
} from "./SocialOauthButton.types";
import { Icon } from "../Icon/Icon";
import { IconName } from "../Icon/Icon.types";

const socialIconMap: Record<SocialProvider, IconName> = {
  google: "google-colored",
  microsoft: "microsoft-colored",
  facebook: "facebook-colored",
  linkedin: "linkedin-colored",
  whatsapp: "whatsapp-colored",
  telegram: "telegram-colored",
  discord: "discord-colored",
};

export const SocialOauthButton: React.FC<SocialOauthButtonProps> = ({
  social,
  loading = false,
  disabled,
  ...props
}) => {
  const iconName = socialIconMap[social];

  return (
    <MuiButton
      disabled={disabled || loading}
      fullWidth
      sx={(theme) => ({
        height: 48,
        borderRadius: theme.radius.md,
        backgroundColor: theme.palette.grayscale[0],
      })}
      {...props}
    >
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <Icon name={iconName} size={20} />
      )}
    </MuiButton>
  );
};
