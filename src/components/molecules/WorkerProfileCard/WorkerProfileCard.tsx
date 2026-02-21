import React from "react";
import { Box, styled, Typography, alpha } from "@mui/material";
import { WorkerProfileCardProps } from "./WorkerProfileCard.types";
import { Avatar, Button, PatternPanel } from "components";
import { USER_ROLE_LABELS } from "types";

const StatBlock = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.grayscale[0], 0.2),
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
  borderRadius: 16,
  padding: 8,
  textAlign: "center",
  isolation: "isolate",
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: alpha(theme.palette.grayscale[0], 0.8),
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  lineHeight: "32px",
  fontWeight: 600,
  color: theme.palette.grayscale[0],
  marginTop: 2,
}));

export const WorkerProfileCard: React.FC<WorkerProfileCardProps> = ({
  user,
  taskCompleted,
  totalEarnings,
  onEditClick,
}) => {
  return (
    <PatternPanel variant="magic" color="blue" padding={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          pt: "16px",
          px: "16px",
          mb: "12px",
        }}
      >
        <Avatar size={48} email={user.email} name={user.name ?? undefined} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: "22px",
              fontWeight: 600,
              color: "grayscale.0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.name || user.email}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 400,
              color: "grayscale.0",
            }}
          >
            {USER_ROLE_LABELS[user.role]}
          </Typography>
        </Box>
        <Button
          variant="liquid"
          leftIcon="edit"
          size="small"
          onClick={onEditClick}
          sx={{ minWidth: 40, px: "10px" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          p: "4px",
        }}
      >
        <StatBlock>
          <StatLabel>Task Completed</StatLabel>
          <StatValue>{taskCompleted}</StatValue>
        </StatBlock>
        <StatBlock>
          <StatLabel>Total Earnings</StatLabel>
          <StatValue>${totalEarnings.toLocaleString()}</StatValue>
        </StatBlock>
      </Box>
    </PatternPanel>
  );
};
