import React from "react";
import { Box, styled } from "@mui/material";
import { Skeleton } from "components";
import { EmptyStateProps } from "./EmptyState.types";

const SKELETON_OPACITIES = [0.4, 0.7, 1, 0.7, 0.4];

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SkeletonStack = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
});

const Message = styled(Box)(({ theme }) => ({
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 600,
  color: theme.palette.grayscale[950],
  marginTop: 20,
  textAlign: "center",
}));

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "There's nothing\nhere yet",
  sx,
}) => (
  <Wrapper sx={sx}>
    <SkeletonStack>
      {SKELETON_OPACITIES.map((opacity, i) => (
        <Skeleton key={i} sx={{ opacity }} />
      ))}
    </SkeletonStack>
    <Message sx={{ whiteSpace: "pre-line" }}>{message}</Message>
  </Wrapper>
);
