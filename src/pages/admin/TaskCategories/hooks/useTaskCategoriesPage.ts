import { useState, useCallback, useEffect } from "react";
import { useTaskCategory } from "features/task-category";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  TaskCategory,
  CreateTaskCategoryRequest,
  UpdateTaskCategoryRequest,
} from "types";

type DialogMode = "create" | "edit" | null;

export const useTaskCategoriesPage = () => {
  const {
    categories,
    isLoading,
    fetchCategories,
    createCategory,
    editCategory,
    deleteCategory,
  } = useTaskCategory();
  const { showToast } = useToast();

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<TaskCategory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories().catch((error: unknown) => {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load categories"),
      });
    });
  }, [fetchCategories, showToast]);

  const openCreateDialog = useCallback(() => {
    setSelectedCategory(null);
    setDialogMode("create");
  }, []);

  const openEditDialog = useCallback((category: TaskCategory) => {
    setSelectedCategory(category);
    setDialogMode("edit");
  }, []);

  const closeDialog = useCallback(() => {
    setDialogMode(null);
    setSelectedCategory(null);
  }, []);

  const openDeleteDialog = useCallback((category: TaskCategory) => {
    setDeleteTarget(category);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleCreate = useCallback(
    async (data: CreateTaskCategoryRequest) => {
      setIsSubmitting(true);
      try {
        const response = await createCategory(data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to create category"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [createCategory, showToast, closeDialog]
  );

  const handleEdit = useCallback(
    async (data: UpdateTaskCategoryRequest) => {
      if (!selectedCategory) return;
      setIsSubmitting(true);
      try {
        const response = await editCategory(selectedCategory.id, data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to update category"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedCategory, editCategory, showToast, closeDialog]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const response = await deleteCategory(deleteTarget.id);
      showToast({ variant: "success", message: response.message });
      closeDeleteDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to delete category"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [deleteTarget, deleteCategory, showToast, closeDeleteDialog]);

  return {
    categories,
    isLoading,
    isSubmitting,
    dialogMode,
    selectedCategory,
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
