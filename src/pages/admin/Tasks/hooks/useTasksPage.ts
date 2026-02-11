import { useState, useCallback, useEffect } from "react";
import { useTask } from "features/task";
import { useTaskCategory } from "features/task-category";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import { getUsersApi, uploadTaskFilesApi } from "services";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilterParams,
  User,
  USER_ROLES,
} from "types";

type DialogMode = "create" | "edit" | null;

export const useTasksPage = () => {
  const {
    tasks,
    total,
    isLoading,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
    reviewTask,
    markTaskPaid,
    cancelTask,
    changeFilters,
  } = useTask();

  const { categories, fetchCategories } = useTaskCategory();
  const { showToast } = useToast();

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [assignTarget, setAssignTarget] = useState<Task | null>(null);
  const [reviewTarget, setReviewTarget] = useState<Task | null>(null);
  const [detailTarget, setDetailTarget] = useState<Task | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [markPaidTarget, setMarkPaidTarget] = useState<Task | null>(null);
  const [workers, setWorkers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTasks().catch((error: unknown) => {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load tasks"),
      });
    });
  }, [fetchTasks, showToast]);

  useEffect(() => {
    fetchCategories().catch((error: unknown) => {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load categories"),
      });
    });
  }, [fetchCategories, showToast]);

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

  // Dialog openers
  const openCreateDialog = useCallback(() => {
    setSelectedTask(null);
    setDialogMode("create");
  }, []);

  const openEditDialog = useCallback((task: Task) => {
    setSelectedTask(task);
    setDialogMode("edit");
  }, []);

  const closeDialog = useCallback(() => {
    setDialogMode(null);
    setSelectedTask(null);
  }, []);

  const openAssignDialog = useCallback((task: Task) => {
    setAssignTarget(task);
  }, []);

  const closeAssignDialog = useCallback(() => {
    setAssignTarget(null);
  }, []);

  const openReviewDialog = useCallback((task: Task) => {
    setReviewTarget(task);
  }, []);

  const closeReviewDialog = useCallback(() => {
    setReviewTarget(null);
  }, []);

  const openDetailDialog = useCallback((task: Task) => {
    setDetailTarget(task);
  }, []);

  const closeDetailDialog = useCallback(() => {
    setDetailTarget(null);
  }, []);

  const openCancelDialog = useCallback((task: Task) => {
    setCancelTarget(task);
  }, []);

  const closeCancelDialog = useCallback(() => {
    setCancelTarget(null);
  }, []);

  const openDeleteDialog = useCallback((task: Task) => {
    setDeleteTarget(task);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const openMarkPaidDialog = useCallback((task: Task) => {
    setMarkPaidTarget(task);
  }, []);

  const closeMarkPaidDialog = useCallback(() => {
    setMarkPaidTarget(null);
  }, []);

  // Handlers
  const handleCreate = useCallback(
    async (data: CreateTaskRequest, files: File[]) => {
      setIsSubmitting(true);
      try {
        const response = await createTask(data);
        if (files.length > 0 && response.data) {
          await uploadTaskFilesApi(response.data.id, files);
          await fetchTasks();
        }
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to create task"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [createTask, fetchTasks, showToast, closeDialog]
  );

  const handleEdit = useCallback(
    async (data: UpdateTaskRequest) => {
      if (!selectedTask) return;
      setIsSubmitting(true);
      try {
        const response = await updateTask(selectedTask.id, data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to update task"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedTask, updateTask, showToast, closeDialog]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const response = await deleteTask(deleteTarget.id);
      showToast({ variant: "success", message: response.message });
      closeDeleteDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to delete task"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [deleteTarget, deleteTask, showToast, closeDeleteDialog]);

  const handleAssign = useCallback(
    async (assignedUserId: string) => {
      if (!assignTarget) return;
      setIsSubmitting(true);
      try {
        const response = await assignTask(assignTarget.id, { assignedUserId });
        showToast({ variant: "success", message: response.message });
        closeAssignDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to assign task"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [assignTarget, assignTask, showToast, closeAssignDialog]
  );

  const handleReview = useCallback(
    async (isApproved: boolean, feedback: string) => {
      if (!reviewTarget) return;
      setIsSubmitting(true);
      try {
        const response = await reviewTask(reviewTarget.id, {
          isApproved,
          ...(feedback.trim() ? { feedback: feedback.trim() } : {}),
        });
        showToast({ variant: "success", message: response.message });
        closeReviewDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to review task"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [reviewTarget, reviewTask, showToast, closeReviewDialog]
  );

  const handleCancel = useCallback(async () => {
    if (!cancelTarget) return;
    setIsSubmitting(true);
    try {
      const response = await cancelTask(cancelTarget.id);
      showToast({ variant: "success", message: response.message });
      closeCancelDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to cancel task"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [cancelTarget, cancelTask, showToast, closeCancelDialog]);

  const handleMarkPaid = useCallback(async () => {
    if (!markPaidTarget) return;
    setIsSubmitting(true);
    try {
      const response = await markTaskPaid(markPaidTarget.id);
      showToast({ variant: "success", message: response.message });
      closeMarkPaidDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to mark task as paid"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [markPaidTarget, markTaskPaid, showToast, closeMarkPaidDialog]);

  const handleFilterChange = useCallback(
    (newFilters: TaskFilterParams) => {
      changeFilters(newFilters);
      fetchTasks(newFilters).catch((error: unknown) => {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load tasks"),
        });
      });
    },
    [changeFilters, fetchTasks, showToast]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      handleFilterChange({ ...filters, page });
    },
    [filters, handleFilterChange]
  );

  const handleRowsPerPageChange = useCallback(
    (rowsPerPage: number) => {
      handleFilterChange({ ...filters, limit: rowsPerPage, page: 1 });
    },
    [filters, handleFilterChange]
  );

  return {
    // Data
    tasks,
    total,
    isLoading,
    filters,
    categories,
    workers,
    isSubmitting,

    // Dialog states
    dialogMode,
    selectedTask,
    assignTarget,
    reviewTarget,
    detailTarget,
    cancelTarget,
    deleteTarget,
    markPaidTarget,

    // Dialog controls
    openCreateDialog,
    openEditDialog,
    closeDialog,
    openAssignDialog,
    closeAssignDialog,
    openReviewDialog,
    closeReviewDialog,
    openDetailDialog,
    closeDetailDialog,
    openCancelDialog,
    closeCancelDialog,
    openDeleteDialog,
    closeDeleteDialog,
    openMarkPaidDialog,
    closeMarkPaidDialog,

    // Handlers
    handleCreate,
    handleEdit,
    handleDelete,
    handleAssign,
    handleReview,
    handleCancel,
    handleMarkPaid,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
  };
};
