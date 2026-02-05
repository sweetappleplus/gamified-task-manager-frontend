import React from "react";
import { Box, styled } from "@mui/material";
import { NotificationItemProps } from "./NotificationItem.types";
import { Text } from "components";

const Container = styled(Box)(({ theme }) => ({
  padding: 16,
  borderRadius: 12,
  backgroundColor: theme.palette.grayscale[0],
  cursor: "pointer",
}));

const Indicator = styled("span")(({ theme }) => ({
  width: 8,
  minWidth: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.additional.red.main,
  flexShrink: 0,
}));

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  content,
  isRead = false,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Text variant="bodyStrong" sx={{ flex: 1, minWidth: 0 }}>
          {title}
        </Text>
        {!isRead && <Indicator />}
      </Box>
      <Text variant="small" sx={{ mt: "4px" }}>
        {content}
      </Text>
    </Container>
  );
};
