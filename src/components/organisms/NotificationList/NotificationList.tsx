import React from "react";
import { Box } from "@mui/material";
import { NotificationListProps } from "./NotificationList.types";
import { NotificationItem } from "components";

export const NotificationList: React.FC<NotificationListProps> = ({
  items,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {items.map((item, index) => (
        <NotificationItem key={index} {...item} />
      ))}
    </Box>
  );
};
