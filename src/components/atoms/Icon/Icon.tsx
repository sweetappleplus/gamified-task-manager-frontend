import React from "react";
import { IconProps } from "./Icon.types";
import { icons } from "./icons";

export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  color = "currentColor",
}) => {
  const IconComponent = icons[name];

  return (
    <IconComponent
      width={size}
      height={size}
      style={{ color, flexShrink: 0 }}
    />
  );
};
