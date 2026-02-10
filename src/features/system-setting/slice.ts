import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SystemSetting } from "types";

type SystemSettingState = {
  settings: SystemSetting[];
  isLoading: boolean;
};

const initialState: SystemSettingState = {
  settings: [],
  isLoading: false,
};

const systemSettingSlice = createSlice({
  name: "systemSetting",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SystemSetting[]>) => {
      state.settings = action.payload;
    },
    addSetting: (state, action: PayloadAction<SystemSetting>) => {
      state.settings.unshift(action.payload);
    },
    updateSetting: (state, action: PayloadAction<SystemSetting>) => {
      const index = state.settings.findIndex(
        (s) => s.key === action.payload.key
      );
      if (index !== -1) {
        state.settings[index] = action.payload;
      }
    },
    removeSetting: (state, action: PayloadAction<string>) => {
      state.settings = state.settings.filter((s) => s.key !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setSettings,
  addSetting,
  updateSetting,
  removeSetting,
  setLoading,
} = systemSettingSlice.actions;

export default systemSettingSlice.reducer;
