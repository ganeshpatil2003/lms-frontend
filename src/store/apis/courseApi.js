import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

const COURSE_API = "http://localhost:8040/api1/v1/courses";
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (inputData) => ({
        url: "/create-course",
        method: "POST",
        body: inputData,
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = courseApi;
