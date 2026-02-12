import React from "react";
import { Box, styled } from "@mui/material";
import { Tag, Tag3, Leaf, IconName } from "components";
import { PRIORITY_COLORS } from "consts";
import {
  Task,
  TaskType,
  TaskPriority,
  TASK_TYPES,
  TASK_PRIORITIES,
} from "types";
import { TaskDescriptionProps } from "./TaskDescription.types";

const TYPE_ICONS: Record<TaskType, IconName> = {
  [TASK_TYPES.STANDARD]: "star-silver-colored",
  [TASK_TYPES.HIGH_VALUE]: "star-gold-colored",
  [TASK_TYPES.PREMIUM]: "diamond-colored",
};

const TYPE_LABELS: Record<TaskType, string> = {
  [TASK_TYPES.STANDARD]: "Standard",
  [TASK_TYPES.HIGH_VALUE]: "High-Value",
  [TASK_TYPES.PREMIUM]: "Premium",
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TASK_PRIORITIES.LOW]: "Less Priority",
  [TASK_PRIORITIES.MEDIUM]: "Normal",
  [TASK_PRIORITIES.HIGH]: "High Priority",
};

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Title = styled(Box)(({ theme }) => ({
  fontSize: 20,
  lineHeight: "28px",
  fontWeight: 600,
  color: theme.palette.grayscale[950],
  marginBottom: 8,
}));

const Description = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[600],
  marginBottom: 16,
}));

const InfoRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const InfoLabel = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[500],
}));

const InfoRows = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const AttachmentButton = styled(Box)({
  cursor: "pointer",
});

export const TaskDescription: React.FC<TaskDescriptionProps> = ({
  task,
  assigneeLeafVariant,
  assigneeLeafText,
  onAttachmentsClick,
  sx,
}) => {
  const priorityColor = PRIORITY_COLORS[task.priority];
  const filesCount = task.files?.length ?? 0;

  return (
    <Wrapper sx={sx}>
      <Box sx={{ mb: "16px" }}>
        <Tag3 icon={TYPE_ICONS[task.type]} text={TYPE_LABELS[task.type]} />
      </Box>

      <Title>{task.title}</Title>
      <Description>{task.description}</Description>

      <InfoRows>
        {task.createdBy && (
          <InfoRow>
            <InfoLabel>Assignee:</InfoLabel>
            <Tag3
              icon="user-square"
              text={task.createdBy.name || task.createdBy.email}
            />
            {assigneeLeafVariant && (
              <Leaf variant={assigneeLeafVariant} text={assigneeLeafText} />
            )}
          </InfoRow>
        )}

        <InfoRow>
          <InfoLabel>Priority:</InfoLabel>
          <Tag
            text={PRIORITY_LABELS[task.priority]}
            bgColor={priorityColor.bg}
            textColor={priorityColor.text}
          />
        </InfoRow>

        <InfoRow>
          <InfoLabel>Category:</InfoLabel>
          <Tag3 text={task.category?.name ?? "General"} />
        </InfoRow>

        {filesCount > 0 && (
          <InfoRow>
            <InfoLabel>Attachments:</InfoLabel>
            <AttachmentButton onClick={onAttachmentsClick}>
              <Tag3 icon="document-text" text={String(filesCount)} />
            </AttachmentButton>
          </InfoRow>
        )}
      </InfoRows>
    </Wrapper>
  );
};
