import React from "react";
import { Box, styled } from "@mui/material";
import { Avatar, Leaf } from "components";
import { USER_ROLES, UserRole } from "types";
import { UserInfoProps } from "./UserInfo.types";

const ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.WORKER]: "Worker",
  [USER_ROLES.SUPER_ADMIN]: "Admin",
};

const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const Name = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: "22px",
  fontWeight: 600,
  color: theme.palette.grayscale[950],
}));

const LabelsRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const RoleLabel = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[600],
}));

export const UserInfo: React.FC<UserInfoProps> = ({
  user,
  leafVariant,
  leafText,
  sx,
}) => (
  <Wrapper sx={sx}>
    <Avatar size={48} email={user.email} name={user.name ?? undefined} />
    <Box>
      <Name>{user.name || user.email}</Name>
      <LabelsRow>
        <Leaf variant={leafVariant} text={leafText} />
        <RoleLabel>{ROLE_LABELS[user.role]}</RoleLabel>
      </LabelsRow>
    </Box>
  </Wrapper>
);
