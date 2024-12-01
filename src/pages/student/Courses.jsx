import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';
import CourseSkeleton from './CourseSkeleton';

const Courses = () => {
    const isLoading =false;
    const coursesArr = [1,2,3,4,5,6,7,8,9]
  return (
    <div className='bg-gray-50'>
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='font-bold text-3xl text-center '>Our Courses</h2>
        <div className='grid grid-cols-1 md :grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
        {
            isLoading ? [1,2,3,4].map( (course,index) => <CourseSkeleton key={index}/>) : coursesArr.map((course,i) => (<Course key={i}/>))
        }
        </div>
    </div>
    </div>
  )
}



export default Courses