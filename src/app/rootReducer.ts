import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "features/auth";
import { taskCategoryReducer } from "features/task-category";

const rootReducer = combineReducers({
  auth: authReducer,
  taskCategory: taskCategoryReducer,
});

export default rootReducer;
