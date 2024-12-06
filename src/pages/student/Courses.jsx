import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCoursesQuery } from "@/store/apis/courseApi";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";

const Courses = () => {
  const { data, isLoading, isSuccess, isError, refetch } =
    useGetPublishedCoursesQuery();
  
  const [courseArray,setCouresArray] = useState([])
  useEffect(() => {
    if (isSuccess) {
      setCouresArray(data?.data || [])
    }
  }, [isSuccess]);
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center ">Our Courses</h2>
        <div className="grid grid-cols-1 md :grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {isLoading ? (
            [1, 2, 3, 4].map((course, index) => <CourseSkeleton key={index} />)
          ) : isSuccess ? (
            courseArray.map((course) => <Course key={course._id} course = {course} />)
          ) : (
            <>
              <h2>Failed to Load the courses </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
