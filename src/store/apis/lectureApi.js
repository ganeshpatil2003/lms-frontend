import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:8040/api1/v1/lectures";
export const lectureApi = createApi({
  reducerPath: "lectureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes : ['lectures'],
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/create-lecture/${courseId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags : ['lectures']
    }),
    getCourseLecture : builder.query({
        query : (courseId) => ({
          url : `/get-lectures/${courseId}`
        }),
        providesTags : ['lectures']
    })
  }),
});

export const {useCreateLectureMutation , useGetCourseLectureQuery } = lectureApi;
