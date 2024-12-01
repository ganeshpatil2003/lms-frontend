import  { combineReducers } from "@reduxjs/toolkit"
import { userApi } from "./apis/userApi"
import { authReducer } from "./slices/authSlice"


const rootReducers = combineReducers({
    [userApi.reducerPath] : userApi.reducer,
    authSlice : authReducer

})

export default rootReducers;