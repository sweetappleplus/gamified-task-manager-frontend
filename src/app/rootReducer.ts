import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "features/auth";
import { taskCategoryReducer } from "features/task-category";
import { systemSettingReducer } from "features/system-setting";

const rootReducer = combineReducers({
  auth: authReducer,
  taskCategory: taskCategoryReducer,
  systemSetting: systemSettingReducer,
});

export default rootReducer;
