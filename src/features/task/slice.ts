import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskFilterParams } from "types";

type TaskState = {
  tasks: Task[];
  total: number;
  isLoading: boolean;
  filters: TaskFilterParams;
};

const initialState: TaskState = {
  tasks: [],
  total: 0,
  isLoading: false,
  filters: { page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFilters: (state, action: PayloadAction<TaskFilterParams>) => {
      state.filters = action.payload;
    },
    appendTasks: (state, action: PayloadAction<Task[]>) => {
      const existingIds = new Set(state.tasks.map((t) => t.id));
      const newTasks = action.payload.filter((t) => !existingIds.has(t.id));
      state.tasks.push(...newTasks);
    },
    updateTaskInList: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTaskFromList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      state.total = Math.max(0, state.total - 1);
    },
  },
});

export const {
  setTasks,
  appendTasks,
  setTotal,
  setLoading,
  setFilters,
  updateTaskInList,
  removeTaskFromList,
} = taskSlice.actions;

export default taskSlice.reducer;
