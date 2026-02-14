import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Modal, Button } from "components";
import { Task, UserLevel } from "types";
import { SubmissionStep } from "./SubmissionStep";
import { AwardStep } from "./AwardStep";
import { SuccessStep } from "./SuccessStep";
import { useCompleteTask } from "./useCompleteTask";

interface CompleteTaskModalProps {
  task: Task;
  reward: number;
  balanceAfterCompletion: number;
  userLevel?: UserLevel;
  completeTask: ReturnType<typeof useCompleteTask>;
}

export const CompleteTaskModal: React.FC<CompleteTaskModalProps> = ({
  task,
  reward,
  balanceAfterCompletion,
  userLevel,
  completeTask,
}) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const commissionPercent = parseFloat(task.commissionPercent);

  const {
    isOpen,
    step,
    isSubmitting,
    fileItems,
    comment,
    externalLinks,
    close,
    setComment,
    handleAddFiles,
    handleRemoveFile,
    handleAddLink,
    handleUpdateLink,
    handleRemoveLink,
    handleGoToAward,
    handleBackToSubmission,
    handleSubmit,
    handleGoHome,
    handleNextTask,
  } = completeTask;

  // On desktop, success step is shown inline (not in modal)
  if (step === "success" && isDesktop) {
    return null;
  }

  const getTitle = () => {
    if (step === "success") return "Complete";
    return "Complete Task";
  };

  const getFooter = () => {
    if (step === "submission") {
      return (
        <Button
          variant="primary"
          text="Next"
          onClick={handleGoToAward}
          disabled={!comment.trim()}
          sx={{ width: "100%" }}
        />
      );
    }

    if (step === "award") {
      return (
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button
            variant="gray"
            leftIcon="chevron-left"
            onClick={handleBackToSubmission}
          />
          <Button
            variant="primary"
            text="Submit a Task"
            onClick={handleSubmit}
            loading={isSubmitting}
            sx={{ flex: 1 }}
          />
        </Box>
      );
    }

    return undefined;
  };

  const getBody = () => {
    if (step === "submission") {
      return (
        <SubmissionStep
          fileItems={fileItems}
          comment={comment}
          externalLinks={externalLinks}
          onAddFiles={handleAddFiles}
          onRemoveFile={handleRemoveFile}
          onCommentChange={setComment}
          onAddLink={handleAddLink}
          onUpdateLink={handleUpdateLink}
          onRemoveLink={handleRemoveLink}
        />
      );
    }

    if (step === "award") {
      return (
        <AwardStep
          reward={reward}
          commissionPercent={commissionPercent}
          balanceAfterCompletion={balanceAfterCompletion}
          additionalAmount={reward}
          userLevel={userLevel}
        />
      );
    }

    return (
      <SuccessStep
        reward={reward}
        onGoHome={handleGoHome}
        onNextTask={handleNextTask}
      />
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={step === "success" ? handleGoHome : close}
      title={getTitle()}
      body={getBody()}
      footer={getFooter()}
      maxWidth={400}
    />
  );
};
