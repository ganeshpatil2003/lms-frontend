import React from "react";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";

const MyLearning = () => {
  const isLoading = false;
  const myCourses = [1,2,3,4,5];
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
          ) : myCourses.length === 0 ? (
            <h2 className=" font-semibold text-xl">Not any course enrolled</h2>
          ) : (
            myCourses.map((cousrse, i) => <Course key={i} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
