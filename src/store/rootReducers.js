import  { combineReducers } from "@reduxjs/toolkit"
import { courseApi } from "./apis/courseApi";
import { userApi } from "./apis/userApi"
import { authReducer } from "./slices/authSlice"



const rootReducers = combineReducers({
    [userApi.reducerPath] : userApi.reducer,
    [courseApi.reducerPath] : courseApi.reducer,
    authSlice : authReducer

})

export default rootReducers;