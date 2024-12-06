import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

const COURSE_API = "http://localhost:8040/api1/v1/courses";
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (inputData) => ({
        url: "/create-course",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["Course"],
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: "/get-courses",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Course", id : _id })),
              { type: "Course", id: "LIST" },
            ]
          : [{ type: "Course", id: "LIST" }],
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/update-course/${courseId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result,error,{courseId}) => [{type:'Course',id: courseId}]
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/get-coursebyid/${courseId}`,
      }),
      providesTags: (result,error,{courseId}) => [{type:'Course',id: courseId}]
    }),
    publishToggel: builder.mutation({
      query: ({ courseId, publish }) => ({
        url: `/publish-toggel/${courseId}?publish=${publish}`,
        method: "PATCH",
      }),
      invalidatesTags : (result,error,{courseId}) => [{type:'Course',id: courseId}]
    }),
    getPublishedCourses : builder.query({
      query : () => ({
        url : '/getpublished-courses'
      })
    })
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  usePublishToggelMutation,
  useGetPublishedCoursesQuery,
} = courseApi;
