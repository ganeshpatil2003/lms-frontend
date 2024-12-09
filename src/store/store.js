import { configureStore } from "@reduxjs/toolkit";
import { courseApi } from "./apis/courseApi";
import { lectureApi } from "./apis/lectureApi";
import { userApi } from "./apis/userApi";
import rootReducers from "./rootReducers";
import { purchaseApi } from "./apis/purchaseApi";
import { processApi } from "./apis/processApi";

const store = configureStore({
  reducer: rootReducers,
  middleware: (defaultMiddelWare) =>
    defaultMiddelWare()
      .concat(userApi.middleware)
      .concat(courseApi.middleware)
      .concat(lectureApi.middleware)
      .concat(purchaseApi.middleware)
      .concat(processApi.middleware)
});

const initializeApp = async () => {
  await store.dispatch(
    userApi.endpoints.getUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
export default store;
