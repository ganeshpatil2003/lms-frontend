import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const PROCESS_URL = "http://localhost:8040/api1/v1/process";
export const processApi = createApi({
  reducerPath: "processApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROCESS_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProcess: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    markAsComplete: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/mark-complete`,
        method: "PATCH",
      }),
    }),
    markInComplete: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/mark-incomplete`,
        method: "PATCH",
      }),
    }),
    updateCourseProcess: builder.mutation({
      query: ({ lectureId, courseId }) => ({
        url: `/${courseId}/${lectureId}/update`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseProcessQuery,
  useUpdateCourseProcessMutation,
  useMarkAsCompleteMutation,
  useMarkInCompleteMutation,
} = processApi;
