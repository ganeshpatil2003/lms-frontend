import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_API = "http://localhost:8040/api1/v1/purchase";
export const purchaseApi = createApi({
    reducerPath : 'purchaseApi',
    baseQuery : fetchBaseQuery({
        baseUrl : PURCHASE_API,
        credentials : 'include'
    }),
    tagTypes : ['purchase'],
    endpoints : (builder) => ({
        purchaseCourse  : builder.mutation({
            query : (courseId) => ({
                url : `/purchase-course/${courseId}`,
                method : 'POST',
            }),
            // invalidatesTags : ['purchase']
        }),
        purchaseCourseDetails  : builder.query({
            query : (courseId) => ({
                url : `/purchase-course/${courseId}`
            })
        }),
        allPurchaseCourses : builder.query({
            query : () => ({
                url : '/getall-purchased-courses'
            })})
        })
    })


export const {usePurchaseCourseMutation,usePurchaseCourseDetailsQuery} = purchaseApi;