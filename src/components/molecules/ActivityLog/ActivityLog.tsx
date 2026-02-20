import React from "react";
import { Box, styled, useTheme, Palette } from "@mui/material";
import { ActivityLogConfig, ActivityLogProps } from "./ActivityLog.types";
import { Icon, Text } from "components";
import { ActivityType, ACTIVITY_TYPES } from "types";

const ACTIVITY_LOG_CONFIG: Record<
  ActivityType,
  Omit<ActivityLogConfig, "iconColor" | "bgColor"> & {
    getIconColor: (palette: Palette) => string;
    getBgColor: (palette: Palette) => string;
  }
> = {
  [ACTIVITY_TYPES.COMPLETED_TASK]: {
    icon: "tick-circle",
    getIconColor: (palette) => palette.additional.green.main,
    getBgColor: (palette) => palette.additional.green[200],
  },
  [ACTIVITY_TYPES.GET_PAID]: {
    icon: "gift",
    getIconColor: (palette) => palette.additional.blue.main,
    getBgColor: (palette) => palette.additional.blue[200],
  },
  [ACTIVITY_TYPES.WITHDRAWN]: {
    icon: "cash",
    getIconColor: (palette) => palette.additional.orange.main,
    getBgColor: (palette) => palette.additional.orange[200],
  },
  [ACTIVITY_TYPES.LEVEL_UP]: {
    icon: "prize",
    getIconColor: (palette) => palette.additional.red.main,
    getBgColor: (palette) => palette.additional.red[200],
  },
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: 56,
  borderRadius: 12,
  backgroundColor: theme.palette.grayscale[0],
  padding: 12,
  gap: 8,
}));

const IconContainer = styled(Box)<{ bgColor: string }>(({ bgColor }) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  borderRadius: "50%",
  backgroundColor: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ActivityLog: React.FC<ActivityLogProps> = ({
  type,
  message,
  date,
}) => {
  const { palette } = useTheme();
  const config = ACTIVITY_LOG_CONFIG[type];

  return (
    <Container>
      <IconContainer bgColor={config.getBgColor(palette)}>
        <Icon
          name={config.icon}
          size={20}
          color={config.getIconColor(palette)}
        />
      </IconContainer>
      <Text
        variant="bodyStrong"
        sx={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {message}
      </Text>
      <Text variant="small" sx={{ flexShrink: 0 }}>
        {date}
      </Text>
    </Container>
  );
};
