import React, { useEffect } from "react";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";
import { useGetUserQuery } from "@/store/apis/userApi";

const MyLearning = () => {
  const { data, isLoading, isSuccess, isError, refetch  } = useGetUserQuery();
  
  let enrolledCourses = data.data.enrolledCourses || [];
  // useEffect(()=>{
  //   enrolledCourses = data.data.enrolledCourses;
  // },[data,isSuccess])
  return (
    <div className="pt-24 w-screen h-screen bg-white">
      <h2 className="max-w-5xl mx-auto font-semibold text-2xl">My Learning</h2>
      <div className=" max-w-5xl mx-auto mt-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {isLoading ? (
            <>
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
             
            </>
          ) : enrolledCourses.length === 0 ? (
            <h2 className=" font-semibold text-xl">Not any course enrolled</h2>
          ) : (
            enrolledCourses.map((course, i) => <Course key={i} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
