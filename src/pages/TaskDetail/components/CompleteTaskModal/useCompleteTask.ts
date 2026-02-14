import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { submitTaskApi } from "services";
import { FileUploaderItem } from "components";
import { ROUTES } from "consts";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";

type CompleteTaskStep = "submission" | "award" | "success";

export const useCompleteTask = (taskId: string) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<CompleteTaskStep>("submission");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 state
  const [files, setFiles] = useState<File[]>([]);
  const [fileItems, setFileItems] = useState<FileUploaderItem[]>([]);
  const [comment, setComment] = useState("");
  const [externalLinks, setExternalLinks] = useState<string[]>([]);

  const open = useCallback(() => {
    setIsOpen(true);
    setStep("submission");
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setStep("submission");
    setFiles([]);
    setFileItems([]);
    setComment("");
    setExternalLinks([]);
  }, []);

  const handleAddFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setFileItems((prev) => [
      ...prev,
      ...newFiles.map((f) => ({
        id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
        name: f.name,
        size: f.size,
      })),
    ]);
  }, []);

  const handleRemoveFile = useCallback(
    (id: string) => {
      const index = fileItems.findIndex((f) => f.id === id);
      if (index === -1) return;
      setFileItems((prev) => prev.filter((f) => f.id !== id));
      setFiles((prev) => prev.filter((_, i) => i !== index));
    },
    [fileItems]
  );

  const handleAddLink = useCallback(() => {
    setExternalLinks((prev) => [...prev, ""]);
  }, []);

  const handleUpdateLink = useCallback((index: number, value: string) => {
    setExternalLinks((prev) => prev.map((l, i) => (i === index ? value : l)));
  }, []);

  const handleRemoveLink = useCallback((index: number) => {
    setExternalLinks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleGoToAward = useCallback(() => {
    if (!comment.trim()) return;
    setStep("award");
  }, [comment]);

  const handleBackToSubmission = useCallback(() => {
    setStep("submission");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await submitTaskApi(taskId, {
        comment: comment.trim(),
        proofUrls: externalLinks.filter((l) => l.trim()),
        files,
      });
      setStep("success");
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to submit task"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [taskId, comment, externalLinks, files, isSubmitting, showToast]);

  const handleGoHome = useCallback(() => {
    navigate(ROUTES.DASHBOARD.path);
  }, [navigate]);

  const handleNextTask = useCallback(() => {
    navigate(ROUTES.START_WORK.path);
  }, [navigate]);

  return {
    isOpen,
    step,
    isSubmitting,
    files,
    fileItems,
    comment,
    externalLinks,
    open,
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
  };
};
