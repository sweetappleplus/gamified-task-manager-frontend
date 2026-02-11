import React from "react";
import { Box, styled } from "@mui/material";
import {
  PatternPanelProps,
  PatternPanelVariant,
  PatternPanelColor,
} from "./PatternPanel.types";

const BASE_URL = process.env.PUBLIC_URL;

const PATTERN_IMAGES: Record<PatternPanelVariant, string[]> = {
  dots: [`${BASE_URL}/assets/images/common/pattern.png`],
  magic: [`${BASE_URL}/assets/images/common/pattern-2.png`],
  star: [
    `${BASE_URL}/assets/images/common/pattern-3.png`,
    `${BASE_URL}/assets/images/common/pattern-4.png`,
  ],
};

const PanelRoot = styled(Box)<{
  ownerState: {
    color: PatternPanelColor;
    variant: PatternPanelVariant;
    padding: number;
  };
}>(({ theme, ownerState }) => ({
  position: "relative",
  borderRadius: 16,
  backgroundColor:
    ownerState.color === "blue"
      ? theme.palette.additional.blue.main
      : theme.palette.additional.green.main,
  ...(ownerState.variant === "dots" && {
    backgroundImage: `url(${PATTERN_IMAGES.dots[0]})`,
    backgroundRepeat: "repeat",
    backgroundBlendMode: "soft-light",
  }),
  padding: ownerState.padding,
  overflow: "hidden",
}));

const overlayBase = {
  position: "absolute" as const,
  top: -40,
  right: -40,
  bottom: -40,
  left: -40,
  backgroundRepeat: "repeat",
  pointerEvents: "none" as const,
};

const DotsOverlay = styled("div")({
  ...overlayBase,
  backgroundImage: `url(${PATTERN_IMAGES.dots[0]})`,
  opacity: 0.2,
  transform: "rotate(345deg)",
});

const PlusLighterOverlay = styled("div")<{
  ownerState: { image: string; cover?: boolean };
}>(({ ownerState }) => ({
  ...overlayBase,
  backgroundImage: `url(${ownerState.image})`,
  mixBlendMode: "plus-lighter" as React.CSSProperties["mixBlendMode"],
  ...(ownerState.cover && {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }),
}));

const Content = styled(Box)({
  position: "relative",
  zIndex: 1,
});

export const PatternPanel: React.FC<PatternPanelProps> = ({
  variant,
  color,
  padding = 16,
  children,
}) => (
  <PanelRoot ownerState={{ color, variant, padding }}>
    {variant === "dots" && <DotsOverlay />}
    {variant !== "dots" &&
      PATTERN_IMAGES[variant].map((image) => (
        <PlusLighterOverlay
          key={image}
          ownerState={{ image, cover: variant === "magic" }}
        />
      ))}
    <Content>{children}</Content>
  </PanelRoot>
);
