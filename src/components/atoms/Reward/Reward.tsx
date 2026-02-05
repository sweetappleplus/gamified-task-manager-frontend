import React, { useId } from "react";
import { Box, styled, useTheme } from "@mui/material";
import { RewardProps, RewardVariant } from "./Reward.types";

const Root = styled(Box)({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 69,
  height: 69,
});

const TextOverlay = styled("span")(({ theme }) => ({
  position: "absolute",
  fontFamily: theme.typography.accent,
  fontSize: 20,
  lineHeight: "20px",
  fontWeight: 400,
  color: "#FFFFFF",
  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
  transform: "rotate(5deg)",
  userSelect: "none",
  letterSpacing: "-0.1em",
}));

const GRADIENT_KEY: Record<RewardVariant, "blue" | "red" | "orange"> = {
  blue: "blue",
  red: "red",
  orange: "orange",
};

export const Reward: React.FC<RewardProps> = ({ variant = "blue", text }) => {
  const theme = useTheme();
  const id = useId();
  const gradientId = `reward-gradient-${id}`;
  const gradient = theme.palette.gradient[GRADIENT_KEY[variant]];

  return (
    <Root>
      <svg
        width="69"
        height="69"
        viewBox="0 0 69 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.0363 0.832041C33.4754 -0.277455 35.4816 -0.277456 36.9208 0.83204L43.7036 6.06124C44.3587 6.56622 45.1541 6.85574 45.9805 6.88994L54.5377 7.2441C56.3534 7.31924 57.8902 8.6088 58.2795 10.3838L60.1142 18.7495C60.2914 19.5574 60.7146 20.2905 61.3257 20.8479L67.6533 26.6197C68.9958 27.8443 69.3442 29.82 68.5015 31.43L64.5295 39.0179C64.146 39.7506 63.999 40.5843 64.1088 41.404L65.246 49.8928C65.4873 51.6939 64.4842 53.4313 62.8037 54.1229L54.8837 57.3824C54.1188 57.6972 53.4704 58.2413 53.0276 58.9399L48.4422 66.1736C47.4693 67.7084 45.5841 68.3945 43.8523 67.8442L35.69 65.2502C34.9018 64.9997 34.0553 64.9997 33.267 65.2502L25.1047 67.8442C23.3729 68.3945 21.4877 67.7084 20.5148 66.1736L15.9295 58.9399C15.4867 58.2413 14.8382 57.6972 14.0734 57.3824L6.1533 54.1229C4.47287 53.4313 3.46977 51.6939 3.71105 49.8928L4.84822 41.404C4.95804 40.5843 4.81105 39.7506 4.42748 39.0179L0.455563 31.43C-0.387172 29.82 -0.0388012 27.8443 1.30374 26.6197L7.63134 20.8479C8.24239 20.2905 8.66564 19.5574 8.84282 18.7495L10.6775 10.3838C11.0668 8.6088 12.6037 7.31924 14.4193 7.2441L22.9765 6.88994C23.8029 6.85574 24.5984 6.56622 25.2534 6.06124L32.0363 0.832041Z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="69.2647"
            y1="-3.4411"
            x2="-2.7158"
            y2="73.3621"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradient.start} />
            <stop offset="1" stopColor={gradient.end} />
          </linearGradient>
        </defs>
      </svg>
      {text && <TextOverlay>{text}</TextOverlay>}
    </Root>
  );
};
