import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedin, userLoggedOut } from "../slices/authSlice";
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
    loginUser: builder.mutation({
      query: (inputdata) => ({
        url: "/login-user",
        method: "POST",
        body: inputdata,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedin({ user: result.data.data }));
          console.log(result,"inside onquerystarted.")
        } catch (error) {
          console.log(error);
        }
      }
    }),
    getUser: builder.query({
      query: () => ({
        url: "/get-user",
      }),
      async onQueryStarted(_,{queryFulfilled,dispatch}){
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedin({user:result.data.data}))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "/logout-user",
        method: "GET",
      }),
      async onQueryStarted(_,{queryFulfilled,dispatch}){
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error)
        }
      }
    }),
    updateUser: builder.mutation({
      query: (formdata) => ({
        url: "/update-user",
        method: "PATCH",
        body: formdata,
      }),
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useLogOutUserMutation,
  useUpdateUserMutation,
} = userApi;
