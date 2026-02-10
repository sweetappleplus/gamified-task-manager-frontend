import { useState, useCallback, useEffect } from "react";
import { useLevelConfig } from "features/level-config";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  LevelConfig,
  CreateLevelConfigRequest,
  UpdateLevelConfigRequest,
} from "types";

type DialogMode = "create" | "edit" | null;

export const useLevelConfigsPage = () => {
  const {
    levelConfigs,
    isLoading,
    fetchLevelConfigs,
    createLevelConfig,
    editLevelConfig,
    deleteLevelConfig,
  } = useLevelConfig();
  const { showToast } = useToast();

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedConfig, setSelectedConfig] = useState<LevelConfig | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<LevelConfig | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLevelConfigs().catch((error: unknown) => {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load level configs"),
      });
    });
  }, [fetchLevelConfigs, showToast]);

  const openCreateDialog = useCallback(() => {
    setSelectedConfig(null);
    setDialogMode("create");
  }, []);

  const openEditDialog = useCallback((config: LevelConfig) => {
    setSelectedConfig(config);
    setDialogMode("edit");
  }, []);

  const closeDialog = useCallback(() => {
    setDialogMode(null);
    setSelectedConfig(null);
  }, []);

  const openDeleteDialog = useCallback((config: LevelConfig) => {
    setDeleteTarget(config);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleCreate = useCallback(
    async (data: CreateLevelConfigRequest) => {
      setIsSubmitting(true);
      try {
        const response = await createLevelConfig(data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to create level config"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [createLevelConfig, showToast, closeDialog]
  );

  const handleEdit = useCallback(
    async (data: UpdateLevelConfigRequest) => {
      if (!selectedConfig) return;
      setIsSubmitting(true);
      try {
        const response = await editLevelConfig(selectedConfig.id, data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to update level config"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedConfig, editLevelConfig, showToast, closeDialog]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const response = await deleteLevelConfig(deleteTarget.id);
      showToast({ variant: "success", message: response.message });
      closeDeleteDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to delete level config"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [deleteTarget, deleteLevelConfig, showToast, closeDeleteDialog]);

  return {
    levelConfigs,
    isLoading,
    isSubmitting,
    dialogMode,
    selectedConfig,
    deleteTarget,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
