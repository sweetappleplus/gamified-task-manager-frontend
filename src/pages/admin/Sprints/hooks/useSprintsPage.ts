import { useState, useCallback, useEffect } from "react";
import { useSprint } from "features/sprint";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  Sprint,
  SprintStatus,
  CreateSprintRequest,
  SprintFilterParams,
} from "types";

type DialogMode = "create" | null;

export const useSprintsPage = () => {
  const { sprints, isLoading, fetchSprints, createSprint, deleteSprint } =
    useSprint();
  const { showToast } = useToast();

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [deleteTarget, setDeleteTarget] = useState<Sprint | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<SprintStatus | "ALL">("ALL");

  const loadSprints = useCallback(
    async (status?: SprintStatus | "ALL") => {
      const params: SprintFilterParams = {};
      if (status && status !== "ALL") {
        params.status = status;
      }
      try {
        await fetchSprints(params);
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load sprints"),
        });
      }
    },
    [fetchSprints, showToast]
  );

  useEffect(() => {
    loadSprints(statusFilter);
  }, [loadSprints, statusFilter]);

  const openCreateDialog = useCallback(() => {
    setDialogMode("create");
  }, []);

  const closeDialog = useCallback(() => {
    setDialogMode(null);
  }, []);

  const openDeleteDialog = useCallback((sprint: Sprint) => {
    setDeleteTarget(sprint);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleCreate = useCallback(
    async (data: CreateSprintRequest) => {
      setIsSubmitting(true);
      try {
        const response = await createSprint(data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to create sprint"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [createSprint, showToast, closeDialog]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const response = await deleteSprint(deleteTarget.id);
      showToast({ variant: "success", message: response.message });
      closeDeleteDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to delete sprint"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [deleteTarget, deleteSprint, showToast, closeDeleteDialog]);

  const handleStatusFilterChange = useCallback(
    (status: SprintStatus | "ALL") => {
      setStatusFilter(status);
    },
    []
  );

  return {
    sprints,
    isLoading,
    isSubmitting,
    dialogMode,
    deleteTarget,
    statusFilter,
    openCreateDialog,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,
    handleCreate,
    handleDelete,
    handleStatusFilterChange,
  };
};
