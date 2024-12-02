import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./apis/userApi"
import rootReducers from "./rootReducers"

 

const store = configureStore({
    reducer : rootReducers,
    middleware : (defaultMiddelWare) => defaultMiddelWare().concat(userApi.middleware)
})

const initializeApp = async () => {
    await store.dispatch(userApi.endpoints.getUser.initiate({},{forceRefetch:true}))
}
initializeApp();
export default store