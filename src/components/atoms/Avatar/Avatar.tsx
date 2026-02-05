import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { AvatarProps } from "./Avatar.types";
import { getInitials } from "utils";

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
