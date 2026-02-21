import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "features/auth";
import { taskCategoryReducer } from "features/task-category";
import { systemSettingReducer } from "features/system-setting";
import { levelConfigReducer } from "features/level-config";
import { taskReducer } from "features/task";
import { notificationReducer } from "features/notification";
import { userReducer } from "features/user";
import { ledgerEntryReducer } from "features/ledger-entry";
import { sprintReducer } from "features/sprint";

const rootReducer = combineReducers({
  auth: authReducer,
  taskCategory: taskCategoryReducer,
  systemSetting: systemSettingReducer,
  levelConfig: levelConfigReducer,
  task: taskReducer,
  notification: notificationReducer,
  user: userReducer,
  ledgerEntry: ledgerEntryReducer,
  sprint: sprintReducer,
});

export default rootReducer;
