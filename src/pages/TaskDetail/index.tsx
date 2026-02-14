import { Box, useMediaQuery } from "@mui/material";
import {
  Button,
  Spinner,
  WorkerLayout,
  TaskDescription,
  RewardsEconomics,
  BalanceCard,
  RemainingTime,
  StepsDescription,
  Text,
} from "components";
import { ROUTES } from "consts";
import { TASK_STATUSES, TaskStatus } from "types";
import { useTaskDetailPage } from "./hooks";
import { taskDetailStyles } from "./TaskDetail.styles";
import { CompleteTaskModal } from "./components/CompleteTaskModal";
import { SuccessStep } from "./components/CompleteTaskModal/SuccessStep";

const HIDE_REMAINING_TIME_STATUSES: TaskStatus[] = [
  TASK_STATUSES.NEW,
  TASK_STATUSES.PENDING,
  TASK_STATUSES.COMPLETED,
  TASK_STATUSES.PAID,
  TASK_STATUSES.CANCELLED,
];

const HIDE_COMPLETE_BUTTON_STATUSES: TaskStatus[] = [
  TASK_STATUSES.NEW,
  TASK_STATUSES.PENDING,
  TASK_STATUSES.IN_REVIEW,
  TASK_STATUSES.LATE,
  TASK_STATUSES.COMPLETED,
  TASK_STATUSES.PAID,
  TASK_STATUSES.CANCELLED,
];

const HIDE_ECONOMICS_STATUSES: TaskStatus[] = [
  TASK_STATUSES.COMPLETED,
  TASK_STATUSES.PAID,
  TASK_STATUSES.CANCELLED,
];

const TaskDetail = () => {
  const {
    task,
    isLoading,
    assigneeLeafVariant,
    assigneeLeafText,
    reward,
    balanceAfterCompletion,
    userLevel,
    completeTask,
    handleBack,
    handleCompleteTask,
    handleDownloadFiles,
  } = useTaskDetailPage();

  const isDesktop = useMediaQuery("(min-width:768px)");
  const showDesktopSuccess = completeTask.step === "success" && isDesktop;

  if (isLoading) {
    return (
      <WorkerLayout activeRoute={ROUTES.TASKS.path}>
        <Spinner />
      </WorkerLayout>
    );
  }

  if (!task) {
    return (
      <WorkerLayout activeRoute={ROUTES.TASKS.path}>
        <Box>Task not found</Box>
      </WorkerLayout>
    );
  }

  const budget = parseFloat(task.budget);
  const commissionPercent = parseFloat(task.commissionPercent);

  const showRemainingTime =
    !HIDE_REMAINING_TIME_STATUSES.includes(task.status) &&
    task.startedAt &&
    task.deadline;
  const showCompleteButton = !HIDE_COMPLETE_BUTTON_STATUSES.includes(
    task.status
  );
  const showEconomics = !HIDE_ECONOMICS_STATUSES.includes(task.status);

  if (showDesktopSuccess) {
    return (
      <WorkerLayout activeRoute={ROUTES.TASKS.path}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100dvh - 68px)",
          }}
        >
          <Box sx={{ width: 348 }}>
            <SuccessStep
              reward={reward}
              onGoHome={completeTask.handleGoHome}
              onNextTask={completeTask.handleNextTask}
            />
          </Box>
        </Box>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout activeRoute={ROUTES.TASKS.path}>
      <Box sx={taskDetailStyles.content}>
        <Box sx={taskDetailStyles.mainSection}>
          <Box sx={taskDetailStyles.header}>
            <Button
              variant="gray"
              size="xs"
              leftIcon="chevron-left"
              text="Back"
              onClick={handleBack}
            />
            <Text variant="pageTitle">Task</Text>
          </Box>

          <TaskDescription
            task={task}
            assigneeLeafVariant={assigneeLeafVariant}
            assigneeLeafText={assigneeLeafText}
            onAttachmentsClick={handleDownloadFiles}
          />

          {showEconomics && (
            <>
              <RewardsEconomics
                budget={budget}
                commissionPercent={commissionPercent}
                sx={taskDetailStyles.rewardsEconomics}
              />

              <BalanceCard
                amount={balanceAfterCompletion}
                additionalAmount={reward}
                sx={taskDetailStyles.balanceCard}
              />
            </>
          )}
        </Box>

        <Box sx={taskDetailStyles.rightSection}>
          {showRemainingTime && (
            <RemainingTime
              startDateTime={task.startedAt!}
              deadlineDateTime={task.deadline}
              sx={taskDetailStyles.remainingTime}
            />
          )}

          {task.steps.length > 0 && (
            <StepsDescription
              steps={task.steps}
              sx={taskDetailStyles.stepsDescription}
            />
          )}

          {showCompleteButton && (
            <Button
              variant="primary"
              text="Complete Task"
              onClick={handleCompleteTask}
              sx={taskDetailStyles.completeButton}
            />
          )}
        </Box>
      </Box>

      <CompleteTaskModal
        task={task}
        reward={reward}
        balanceAfterCompletion={balanceAfterCompletion}
        userLevel={userLevel}
        completeTask={completeTask}
      />
    </WorkerLayout>
  );
};

export default TaskDetail;
