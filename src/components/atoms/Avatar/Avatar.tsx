import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { AvatarProps } from "./Avatar.types";

const getInitials = (name?: string, email?: string): string => {
  if (name) {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  if (email) {
    const localPart = email.split("@")[0];
    return localPart.slice(0, 2).toUpperCase();
  }

  return "";
};

export const Avatar: React.FC<AvatarProps> = ({
  size = 48,
  imageUrl,
  name,
  email,
}) => {
  const initials = getInitials(name, email);

  return (
    <MuiAvatar
      src={imageUrl}
      alt={name || email}
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {!imageUrl && initials}
    </MuiAvatar>
  );
};
