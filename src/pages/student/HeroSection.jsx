import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 px-4 py-28 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4 ">
          Find the best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8  ">
          Discover , Learn , and upskill our wide range of Courses
        </p>

        <form
          action=""
          className="flex flex-row items-center shadow-lg overflow-hidden bg-white rounded-full my-10"
        >
          <Input
            placeholder="Search courses"
            className="flex-grow border-none focus-visible:ring-0 text-gray-900 px-6 py-3 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button className="bg-blue-600 text-white rounded-l-none  dark:bg-blue-700 px-8 py-3 hover:bg-blue-700 hover:text-gray-400 transition-all duration-75 ease-in-out">
            Search
          </Button>
        </form>
        <Button className="px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-blue-500 dark:text-gray-300  hover:text-blue-600 hover:bg-gray-200 transition-all duration-75 ease-in-out">
          Explore Cousrses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
