import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "features/auth";
import { taskCategoryReducer } from "features/task-category";
import { systemSettingReducer } from "features/system-setting";
import { levelConfigReducer } from "features/level-config";

const rootReducer = combineReducers({
  auth: authReducer,
  taskCategory: taskCategoryReducer,
  systemSetting: systemSettingReducer,
  levelConfig: levelConfigReducer,
});

export default rootReducer;
