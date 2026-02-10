import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setCategories,
  addCategory,
  updateCategory,
  removeCategory,
  setLoading,
} from "./slice";
import {
  getTaskCategoriesApi,
  createTaskCategoryApi,
  updateTaskCategoryApi,
  deleteTaskCategoryApi,
} from "services";
import { CreateTaskCategoryRequest, UpdateTaskCategoryRequest } from "types";

export const useTaskCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: RootState) => state.taskCategory.categories
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.taskCategory.isLoading
  );

  const fetchCategories = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await getTaskCategoriesApi();
      if (response.data) {
        dispatch(setCategories(response.data));
      }
      return response;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const createCategory = useCallback(
    async (data: CreateTaskCategoryRequest) => {
      const response = await createTaskCategoryApi(data);
      if (response.data) {
        dispatch(addCategory(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const editCategory = useCallback(
    async (id: string, data: UpdateTaskCategoryRequest) => {
      const response = await updateTaskCategoryApi(id, data);
      if (response.data) {
        dispatch(updateCategory(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      const response = await deleteTaskCategoryApi(id);
      dispatch(removeCategory(id));
      return response;
    },
    [dispatch]
  );

  return {
    categories,
    isLoading,
    fetchCategories,
    createCategory,
    editCategory,
    deleteCategory,
  };
};
