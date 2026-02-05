import React from "react";
import { IconProps, ICONS } from "./Icon.types";

export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  color = "currentColor",
}) => {
  const IconComponent = ICONS[name];

  return (
    <IconComponent
      width={size}
      height={size}
      style={{ color, flexShrink: 0 }}
    />
  );
};
