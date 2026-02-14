import React, { useMemo } from "react";
import { Box, styled } from "@mui/material";
import { Text, Tag, ProgressIndicator, Button } from "components";
import {
  TASK_STATUSES,
  TASK_PRIORITIES,
  TaskPriority,
  TaskStatus,
} from "types";
import { PRIORITY_COLORS, STATUS_COLORS } from "consts";
import { TaskTicketProps } from "./TaskTicket.types";

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TASK_PRIORITIES.LOW]: "Less Priority",
  [TASK_PRIORITIES.MEDIUM]: "Mid Priority",
  [TASK_PRIORITIES.HIGH]: "High Priority",
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  [TASK_STATUSES.NEW]: "New",
  [TASK_STATUSES.PENDING]: "Waiting",
  [TASK_STATUSES.IN_ACTION]: "In Progress",
  [TASK_STATUSES.FAILED]: "Rejected",
  [TASK_STATUSES.IN_REVIEW]: "In Review",
  [TASK_STATUSES.LATE]: "Late",
  [TASK_STATUSES.COMPLETED]: "Completed",
  [TASK_STATUSES.PAID]: "Paid",
  [TASK_STATUSES.CANCELLED]: "Cancelled",
};

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.grayscale[50],
  borderRadius: 16,
  padding: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
}));

const WhitePanel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grayscale[0],
  borderRadius: 14,
  padding: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
}));

const TagRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
});

const Dot = styled(Box)(({ theme }) => ({
  width: 3,
  height: 3,
  borderRadius: "50%",
  backgroundColor: theme.palette.grayscale[100],
}));

const BottomSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "8px 12px",
});

const InfoRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const RewardRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const getProgress = (task: TaskTicketProps["task"]): number => {
  if (task.status === TASK_STATUSES.PENDING) return 0;

  if (!task.startedAt || !task.deadline) return 0;

  const startMs = new Date(task.startedAt).getTime();
  const deadlineMs = new Date(task.deadline).getTime();
  const totalMs = deadlineMs - startMs;

  if (totalMs <= 0) return 100;

  const elapsed = Date.now() - startMs;
  return Math.min(100, Math.round((elapsed / totalMs) * 100));
};

export const TaskTicket: React.FC<TaskTicketProps> = ({
  task,
  onClick,
  onStart,
}) => {
  const progress = useMemo(() => getProgress(task), [task]);
  const priorityColor = PRIORITY_COLORS[task.priority];
  const isPending = task.status === TASK_STATUSES.PENDING;

  return (
    <Wrapper
      onClick={() => onClick?.(task.id)}
      sx={{ cursor: onClick ? "pointer" : "default" }}
    >
      <WhitePanel>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Text variant="bodyStrong">{task.title}</Text>
          <TagRow sx={{ mt: "4px" }}>
            <Tag
              text={PRIORITY_LABELS[task.priority]}
              bgColor={priorityColor.bg}
              textColor={priorityColor.text}
            />
            <Dot />
            <Tag text={task.category?.name ?? "General"} maxWidth={120} />
          </TagRow>
        </Box>
        <ProgressIndicator variant="ring" percentage={progress} />
      </WhitePanel>

      <BottomSection>
        <InfoRow>
          <RewardRow>
            <Text variant="bodyMutedStrong">Reward:</Text>
            <Text variant="bodyStrong">${task.budget}</Text>
          </RewardRow>

          <Tag
            text={STATUS_LABELS[task.status]}
            bgColor={STATUS_COLORS[task.status].bg}
            textColor={STATUS_COLORS[task.status].text}
          />
        </InfoRow>

        {isPending && (
          <Button
            variant="primary"
            size="small"
            text="Start Now"
            rightIcon="arrow-right-double-sharp"
            sx={{ width: "100%" }}
            onClick={(e) => {
              e.stopPropagation();
              onStart?.(task.id);
            }}
          />
        )}
      </BottomSection>
    </Wrapper>
  );
};
