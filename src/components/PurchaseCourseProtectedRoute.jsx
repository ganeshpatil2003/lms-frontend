import { usePurchaseCourseDetailsQuery } from '@/store/apis/purchaseApi';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const PurchaseCourseProtectedRoute = ({children}) => {
    const {courseId} = useParams();
    const {data,isLoading} = usePurchaseCourseDetailsQuery(courseId)
    if(isLoading)return <>Loading..</>
    return data.data.purchase === true ? children : <Navigate to={`/course-details/${courseId}`}/>
}

export default PurchaseCourseProtectedRoute