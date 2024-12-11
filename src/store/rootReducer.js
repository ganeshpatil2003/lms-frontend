import { combineReducers } from "@reduxjs/toolkit";
import { courseApi } from "./apis/courseApi";
import { lectureApi } from "./apis/lectureApi";
import { userApi } from "./apis/userApi";
import authReducer from "./slices/authSlice";
import { purchaseApi } from "./apis/purchaseApi";
import { processApi } from "./apis/processApi";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [lectureApi.reducerPath]: lectureApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [processApi.reducerPath] : processApi.reducer,
  "auth": authReducer,
});

export default rootReducer;
