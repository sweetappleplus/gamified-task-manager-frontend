import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import { Tag2Props } from "./Tag2.types";
import { Icon } from "../Icon";

const ICON_SIZE = 20;
const INDICATOR_SIZE = 10;

const StyledTag = styled(Box)<{
  ownerState: { active: boolean; clickable: boolean };
}>(({ theme, ownerState }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 14px",
  borderRadius: 12,
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[950],
  backgroundColor: ownerState.active
    ? theme.palette.primary[50]
    : theme.palette.grayscale[50],
  border: "1px solid",
  borderColor: ownerState.active
    ? theme.palette.primary.main
    : theme.palette.grayscale[50],
  cursor: ownerState.clickable ? "pointer" : "default",
  transition: "all 0.2s ease",
}));

const IndicatorWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: ICON_SIZE,
  height: ICON_SIZE,
});

const Indicator = styled(Box)({
  width: INDICATOR_SIZE,
  height: INDICATOR_SIZE,
  borderRadius: 1000,
});

export const Tag2: React.FC<Tag2Props> = ({
  text,
  indicator,
  icon,
  onClick,
  active = false,
}) => {
  const theme = useTheme();

  return (
    <StyledTag onClick={onClick} ownerState={{ active, clickable: !!onClick }}>
      {indicator && (
        <IndicatorWrapper>
          <Indicator sx={{ backgroundColor: indicator }} />
        </IndicatorWrapper>
      )}
      {icon && (
        <Icon
          name={icon}
          size={ICON_SIZE}
          color={theme.palette.grayscale[950]}
        />
      )}
      {text}
    </StyledTag>
  );
};
