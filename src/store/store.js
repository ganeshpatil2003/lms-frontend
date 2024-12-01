import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./apis/userApi"
import rootReducers from "./rootReducers"

 

const store = configureStore({
    reducer : rootReducers,
    middleware : (defaultMiddelWare) => defaultMiddelWare().concat(userApi.middleware)
})

export default store