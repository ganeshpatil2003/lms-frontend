import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

const COURSE_API = "http://localhost:8040/api1/v1/courses";
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  tagTypes:['Course'],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (inputData) => ({
        url: "/create-course",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags:['Course']
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: "/get-courses",
        method: "GET",
      }),
      providesTags : ['Course']
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/update-course/${courseId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags:['Course']
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/get-coursebyid/${courseId}`,
      }),
      providesTags : ['Course']
    }),
    
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
} = courseApi;
