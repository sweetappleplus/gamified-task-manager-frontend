import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskByIdApi, getUsersApi } from "services";
import { useTask } from "features/task";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  Task,
  User,
  USER_ROLES,
  ReviewTaskRequest,
  AssignTaskRequest,
} from "types";

export const useAdminTaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    reviewTask: reviewTaskAction,
    assignTask: assignTaskAction,
    cancelTask: cancelTaskAction,
    deleteTask: deleteTaskAction,
    markTaskPaid: markTaskPaidAction,
  } = useTask();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [workers, setWorkers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dialog targets
  const [reviewTarget, setReviewTarget] = useState<Task | null>(null);
  const [assignTarget, setAssignTarget] = useState<Task | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [markPaidTarget, setMarkPaidTarget] = useState<Task | null>(null);

  const fetchTask = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getTaskByIdApi(id);
      if (response.data) {
        setTask(response.data);
      }
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load task"),
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, showToast]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  useEffect(() => {
    getUsersApi({ role: USER_ROLES.WORKER })
      .then((res) => {
        if (res.data) setWorkers(res.data);
      })
      .catch((error: unknown) => {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load workers"),
        });
      });
  }, [showToast]);

  // Dialog openers/closers
  const openReviewDialog = useCallback(() => {
    if (task) setReviewTarget(task);
  }, [task]);

  const closeReviewDialog = useCallback(() => {
    setReviewTarget(null);
  }, []);

  const openAssignDialog = useCallback(() => {
    if (task) setAssignTarget(task);
  }, [task]);

  const closeAssignDialog = useCallback(() => {
    setAssignTarget(null);
  }, []);

  const openCancelDialog = useCallback(() => {
    if (task) setCancelTarget(task);
  }, [task]);

  const closeCancelDialog = useCallback(() => {
    setCancelTarget(null);
  }, []);

  const openDeleteDialog = useCallback(() => {
    if (task) setDeleteTarget(task);
  }, [task]);

  const closeDeleteDialog = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const openMarkPaidDialog = useCallback(() => {
    if (task) setMarkPaidTarget(task);
  }, [task]);

  const closeMarkPaidDialog = useCallback(() => {
    setMarkPaidTarget(null);
  }, []);

  // Action handlers
  const handleReview = useCallback(
    async (isApproved: boolean, feedback: string) => {
      if (!task) return;
      setIsSubmitting(true);
      try {
        const data: ReviewTaskRequest = {
          isApproved,
          ...(feedback.trim() ? { feedback: feedback.trim() } : {}),
        };
        const response = await reviewTaskAction(task.id, data);
        showToast({ variant: "success", message: response.message });
        closeReviewDialog();
        await fetchTask();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to review task"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [task, reviewTaskAction, showToast, closeReviewDialog, fetchTask]
  );

  const handleAssign = useCallback(
    async (assignedUserId: string) => {
      if (!task) return;
      setIsSubmitting(true);
      try {
        const data: AssignTaskRequest = { assignedUserId };
        const response = await assignTaskAction(task.id, data);
        showToast({ variant: "success", message: response.message });
        closeAssignDialog();
        await fetchTask();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to assign task"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [task, assignTaskAction, showToast, closeAssignDialog, fetchTask]
  );

  const handleCancel = useCallback(async () => {
    if (!task) return;
    setIsSubmitting(true);
    try {
      const response = await cancelTaskAction(task.id);
      showToast({ variant: "success", message: response.message });
      closeCancelDialog();
      await fetchTask();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to cancel task"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [task, cancelTaskAction, showToast, closeCancelDialog, fetchTask]);

  const handleDelete = useCallback(async () => {
    if (!task) return;
    setIsSubmitting(true);
    try {
      const response = await deleteTaskAction(task.id);
      showToast({ variant: "success", message: response.message });
      closeDeleteDialog();
      navigate(-1);
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to delete task"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [task, deleteTaskAction, showToast, closeDeleteDialog, navigate]);

  const handleMarkPaid = useCallback(async () => {
    if (!task) return;
    setIsSubmitting(true);
    try {
      const response = await markTaskPaidAction(task.id);
      showToast({ variant: "success", message: response.message });
      closeMarkPaidDialog();
      await fetchTask();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to mark task as paid"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [task, markTaskPaidAction, showToast, closeMarkPaidDialog, fetchTask]);

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/tasks");
    }
  }, [navigate]);

  return {
    task,
    isLoading,
    workers,
    isSubmitting,

    // Dialog targets
    reviewTarget,
    assignTarget,
    cancelTarget,
    deleteTarget,
    markPaidTarget,

    // Dialog controls
    openReviewDialog,
    closeReviewDialog,
    openAssignDialog,
    closeAssignDialog,
    openCancelDialog,
    closeCancelDialog,
    openDeleteDialog,
    closeDeleteDialog,
    openMarkPaidDialog,
    closeMarkPaidDialog,

    // Handlers
    handleReview,
    handleAssign,
    handleCancel,
    handleDelete,
    handleMarkPaid,
    handleBack,
  };
};
