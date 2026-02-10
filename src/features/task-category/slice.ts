import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskCategory } from "types";

type TaskCategoryState = {
  categories: TaskCategory[];
  isLoading: boolean;
};

const initialState: TaskCategoryState = {
  categories: [],
  isLoading: false,
};

const taskCategorySlice = createSlice({
  name: "taskCategory",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<TaskCategory[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<TaskCategory>) => {
      state.categories.unshift(action.payload);
    },
    updateCategory: (state, action: PayloadAction<TaskCategory>) => {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  removeCategory,
  setLoading,
} = taskCategorySlice.actions;

export default taskCategorySlice.reducer;
