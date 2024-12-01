import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {userLoggedin} from "../slices/authSlice"
const USER_API = "http://localhost:8040/api1/v1/users";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputdata) => ({
        url: "/register",
        method: "POST",
        body: inputdata,
      }),
    }),
    loginUser : builder.mutation({
        query : (inputdata) => ({
            url : "/login-user",
            method : "POST",
            body : inputdata
        }),
        onQueryStarted : async(inputdata,{queryFullfilled,dispatch})=> {
            try {
                const result = await queryFullfilled
                dispatch(userLoggedin({user:result.data.data.role}))
                // .then(() => {dispatch(userLoggedin({user : result.data.data.role})); console.log(result.data.data.role)} );
                // result.then(() => {dispatch(userLoggedin({user : result.data.data.role})); console.log(result.data.data.role)} )
                // console.log(result.data.data.role)
            } catch (error) {
                console.log(error)
            }
        }
    }),
    getUser : builder.query({
      query : () => ({
        url : '/get-user',
      })
    }),
    logOutUser : builder.query({
      query : () => ({
        url : '/logout-user'
      })
    }),
    updateUser : builder.mutation({
      query : (formdata) => ({
        url : '/update-user',
        method : 'PATCH',
        body : formdata
      })
    })
  }),
});
export const {useLoginUserMutation,useRegisterUserMutation,useGetUserQuery,useLogOutUserQuery,useUpdateUserMutation} = userApi
