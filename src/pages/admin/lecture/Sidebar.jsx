import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="lg:w-[250px] sm:w-[300px]  sm:h-screen space-y-8 border-r-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen pt-[5rem]">
        <div className="space-y-4 ">
          <Link className="flex items-center gap-2" to={"dashboard"}>
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link className="flex items-center gap-2" to={"courses"}>
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-white pt-[5rem] p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
