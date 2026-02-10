import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LevelConfig } from "types";

type LevelConfigState = {
  levelConfigs: LevelConfig[];
  isLoading: boolean;
};

const initialState: LevelConfigState = {
  levelConfigs: [],
  isLoading: false,
};

const levelConfigSlice = createSlice({
  name: "levelConfig",
  initialState,
  reducers: {
    setLevelConfigs: (state, action: PayloadAction<LevelConfig[]>) => {
      state.levelConfigs = action.payload;
    },
    removeLevelConfig: (state, action: PayloadAction<string>) => {
      state.levelConfigs = state.levelConfigs.filter(
        (lc) => lc.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLevelConfigs, removeLevelConfig, setLoading } =
  levelConfigSlice.actions;

export default levelConfigSlice.reducer;
