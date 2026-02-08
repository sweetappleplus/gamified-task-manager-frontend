import React from "react";
import { Box, styled } from "@mui/material";
import { FooterNavButton } from "components";
import { WORKER_FOOTER_NAV_ITEMS } from "consts/routes";
import { FooterNavLinksProps } from "./FooterNavLinks.types";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  paddingLeft: 4,
  paddingRight: 4,
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  borderRadius: 20,
  width: "fit-content",
  overflow: "visible",
});

const HighlightedWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 4,
  marginRight: 4,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100% + 8px)",
    height: "calc(100% + 8px)",
    borderRadius: "50%",
    border: "4px solid white",
    pointerEvents: "none",
    zIndex: 0,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
});

export const FooterNavLinks: React.FC<FooterNavLinksProps> = ({
  activeRoute,
}) => {
  return (
    <Container>
      {WORKER_FOOTER_NAV_ITEMS.map((item, index) => {
        const button = (
          <FooterNavButton
            key={index}
            icon={item.icon}
            label={item.label}
            route={item.route}
            variant={item.variant}
            isActive={activeRoute === item.route}
          />
        );

        if (item.isHighlighted) {
          return <HighlightedWrapper key={index}>{button}</HighlightedWrapper>;
        }

        return button;
      })}
    </Container>
  );
};
