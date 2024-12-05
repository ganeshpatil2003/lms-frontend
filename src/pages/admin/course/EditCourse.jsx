import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl ">
          Add details information regarding course
        </h1>
        <Link to="lecture">
          <Button variant={"link"} className="hover:text-indigo-700">Goto lecture page</Button>
        </Link>
      </div>
      <CourseTab></CourseTab>
    </div>
  );
};

export default EditCourse;
