import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTask } from "features/task";
import { useTaskCategory } from "features/task-category";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import { uploadTaskFilesApi, deleteTaskFileApi } from "services";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilterParams,
  BulkCreateTasksRequest,
  TaskStatus,
  TaskPriority,
  TaskType,
  TaskSortBy,
  TaskSortOrder,
} from "types";

type DialogMode = "create" | "edit" | null;

const DEFAULT_SORT_BY: TaskSortBy = "createdAt";
const DEFAULT_SORT_ORDER: TaskSortOrder = "desc";

const parseUrlFilters = (searchParams: URLSearchParams): TaskFilterParams => {
  const params: TaskFilterParams = {};

  const page = searchParams.get("page");
  if (page) params.page = Number(page);

  const limit = searchParams.get("limit");
  if (limit) params.limit = Number(limit);

  const search = searchParams.get("search");
  if (search) params.search = search;

  const status = searchParams.get("status");
  if (status) params.status = status as TaskStatus;

  const priority = searchParams.get("priority");
  if (priority) params.priority = priority as TaskPriority;

  const type = searchParams.get("type");
  if (type) params.type = type as TaskType;

  const categoryId = searchParams.get("categoryId");
  if (categoryId) params.categoryId = categoryId;

  const assignedUserId = searchParams.get("assignedUserId");
  if (assignedUserId) params.assignedUserId = assignedUserId;

  const sortBy = searchParams.get("sortBy");
  if (sortBy) params.sortBy = sortBy as TaskSortBy;

  const sortOrder = searchParams.get("sortOrder");
  if (sortOrder) params.sortOrder = sortOrder as TaskSortOrder;

  return params;
};

const buildSearchParams = (filters: TaskFilterParams): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.page && filters.page !== 1)
    params.set("page", String(filters.page));
  if (filters.limit && filters.limit !== 10)
    params.set("limit", String(filters.limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);
  if (filters.type) params.set("type", filters.type);
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.assignedUserId)
    params.set("assignedUserId", filters.assignedUserId);
  if (filters.sortBy && filters.sortBy !== DEFAULT_SORT_BY)
    params.set("sortBy", filters.sortBy);
  if (filters.sortOrder && filters.sortOrder !== DEFAULT_SORT_ORDER)
    params.set("sortOrder", filters.sortOrder);

  return params;
};

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
    cancelTask,
    bulkCreateTasks,
    bulkAssignTasks,
    changeFilters,
  } = useTask();

  const { categories, fetchCategories } = useTaskCategory();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [assignTarget, setAssignTarget] = useState<Task | null>(null);
  const [reviewTarget, setReviewTarget] = useState<Task | null>(null);
  const [detailTarget, setDetailTarget] = useState<Task | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bulkGenerateOpen, setBulkGenerateOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize filters from URL on mount, fall back to Redux saved filters
  const initialFilters = useMemo(() => {
    const hasUrlFilters = searchParams.toString().length > 0;
    const defaults = {
      page: 1,
      limit: 10,
      sortBy: DEFAULT_SORT_BY,
      sortOrder: DEFAULT_SORT_ORDER,
    };
    if (hasUrlFilters) {
      const urlFilters = parseUrlFilters(searchParams);
      return { ...defaults, ...urlFilters };
    }
    return { ...defaults, ...filters };
  }, [filters, searchParams]);

  useEffect(() => {
    if (!initialized) {
      changeFilters(initialFilters);
      setSearchParams(buildSearchParams(initialFilters), { replace: true });
      fetchTasks(initialFilters).catch((error: unknown) => {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load tasks"),
        });
      });
      setInitialized(true);
    }
  }, [
    initialized,
    initialFilters,
    changeFilters,
    setSearchParams,
    fetchTasks,
    showToast,
  ]);

  useEffect(() => {
    fetchCategories().catch((error: unknown) => {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load categories"),
      });
    });
  }, [fetchCategories, showToast]);

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

  const openBulkGenerateDialog = useCallback(() => {
    setBulkGenerateOpen(true);
  }, []);

  const closeBulkGenerateDialog = useCallback(() => {
    setBulkGenerateOpen(false);
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
    async (
      data: UpdateTaskRequest,
      newFiles: File[],
      deletedFileIds: string[]
    ) => {
      if (!selectedTask) return;
      setIsSubmitting(true);
      try {
        await updateTask(selectedTask.id, data);

        if (deletedFileIds.length > 0) {
          await Promise.all(
            deletedFileIds.map((fileId) =>
              deleteTaskFileApi(selectedTask.id, fileId)
            )
          );
        }

        if (newFiles.length > 0) {
          await uploadTaskFilesApi(selectedTask.id, newFiles);
        }

        if (deletedFileIds.length > 0 || newFiles.length > 0) {
          await fetchTasks();
        }

        showToast({ variant: "success", message: "Task updated successfully" });
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
    [selectedTask, updateTask, fetchTasks, showToast, closeDialog]
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

  const handleBulkGenerate = useCallback(
    async (
      data: BulkCreateTasksRequest,
      workerIds: string[],
      files: File[]
    ) => {
      setIsSubmitting(true);
      try {
        const response = await bulkCreateTasks(data);
        showToast({ variant: "success", message: response.message });

        if (files.length > 0 && response.data) {
          await Promise.all(
            response.data.map((task) => uploadTaskFilesApi(task.id, files))
          );
        }

        if (workerIds.length > 0 && response.data) {
          const taskIds = response.data.map((task) => task.id);
          const assignResponse = await bulkAssignTasks({
            taskIds,
            workerIds,
          });
          showToast({ variant: "success", message: assignResponse.message });
        }

        closeBulkGenerateDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to generate tasks"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [bulkCreateTasks, bulkAssignTasks, showToast, closeBulkGenerateDialog]
  );

  const handleFilterChange = useCallback(
    (newFilters: TaskFilterParams) => {
      changeFilters(newFilters);
      setSearchParams(buildSearchParams(newFilters), { replace: true });
      fetchTasks(newFilters).catch((error: unknown) => {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load tasks"),
        });
      });
    },
    [changeFilters, setSearchParams, fetchTasks, showToast]
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

  const handleSortChange = useCallback(
    (field: TaskSortBy) => {
      const isCurrentField = filters.sortBy === field;
      const newOrder: TaskSortOrder =
        isCurrentField && filters.sortOrder === "asc" ? "desc" : "asc";
      handleFilterChange({
        ...filters,
        sortBy: field,
        sortOrder: newOrder,
        page: 1,
      });
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
    isSubmitting,

    // Dialog states
    dialogMode,
    selectedTask,
    assignTarget,
    reviewTarget,
    detailTarget,
    cancelTarget,
    deleteTarget,
    bulkGenerateOpen,

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
    openBulkGenerateDialog,
    closeBulkGenerateDialog,

    // Handlers
    handleCreate,
    handleEdit,
    handleDelete,
    handleAssign,
    handleReview,
    handleCancel,
    handleBulkGenerate,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  };
};
