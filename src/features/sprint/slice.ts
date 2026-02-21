import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sprint } from "types";

type SprintState = {
  sprints: Sprint[];
  selectedSprint: Sprint | null;
  isLoading: boolean;
};

const initialState: SprintState = {
  sprints: [],
  selectedSprint: null,
  isLoading: false,
};

const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {
    setSprints: (state, action: PayloadAction<Sprint[]>) => {
      state.sprints = action.payload;
    },
    setSelectedSprint: (state, action: PayloadAction<Sprint | null>) => {
      state.selectedSprint = action.payload;
    },
    addSprint: (state, action: PayloadAction<Sprint>) => {
      state.sprints.unshift(action.payload);
    },
    updateSprintInList: (state, action: PayloadAction<Sprint>) => {
      const index = state.sprints.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.sprints[index] = action.payload;
      }
      if (state.selectedSprint?.id === action.payload.id) {
        state.selectedSprint = action.payload;
      }
    },
    removeSprint: (state, action: PayloadAction<string>) => {
      state.sprints = state.sprints.filter((s) => s.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setSprints,
  setSelectedSprint,
  addSprint,
  updateSprintInList,
  removeSprint,
  setLoading,
} = sprintSlice.actions;

export default sprintSlice.reducer;
