import { useState, useCallback, useEffect } from "react";
import { useSystemSetting } from "features/system-setting";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  SystemSetting,
  CreateSystemSettingRequest,
  UpdateSystemSettingRequest,
} from "types";

type DialogMode = "create" | "edit" | null;

export const useSystemSettingsPage = () => {
  const {
    settings,
    isLoading,
    fetchSettings,
    createSetting,
    editSetting,
    deleteSetting,
  } = useSystemSetting();
  const { showToast } = useToast();

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedSetting, setSelectedSetting] = useState<SystemSetting | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<SystemSetting | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSettings().catch((error: unknown) => {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load system settings"),
      });
    });
  }, [fetchSettings, showToast]);

  const openCreateDialog = useCallback(() => {
    setSelectedSetting(null);
    setDialogMode("create");
  }, []);

  const openEditDialog = useCallback((setting: SystemSetting) => {
    setSelectedSetting(setting);
    setDialogMode("edit");
  }, []);

  const closeDialog = useCallback(() => {
    setDialogMode(null);
    setSelectedSetting(null);
  }, []);

  const openDeleteDialog = useCallback((setting: SystemSetting) => {
    setDeleteTarget(setting);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleCreate = useCallback(
    async (data: CreateSystemSettingRequest) => {
      setIsSubmitting(true);
      try {
        const response = await createSetting(data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to create setting"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [createSetting, showToast, closeDialog]
  );

  const handleEdit = useCallback(
    async (data: UpdateSystemSettingRequest) => {
      if (!selectedSetting) return;
      setIsSubmitting(true);
      try {
        const response = await editSetting(selectedSetting.key, data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to update setting"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedSetting, editSetting, showToast, closeDialog]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const response = await deleteSetting(deleteTarget.key);
      showToast({ variant: "success", message: response.message });
      closeDeleteDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to delete setting"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [deleteTarget, deleteSetting, showToast, closeDeleteDialog]);

  return {
    settings,
    isLoading,
    isSubmitting,
    dialogMode,
    selectedSetting,
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
