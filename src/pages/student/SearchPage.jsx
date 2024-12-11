import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { useGetSearchCoursesQuery } from "@/store/apis/courseApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";

const isEmpty = false;
const isLoading = false;
const SearchPage = () => {

  const [selectedCategories,setSelectedCategories] = useState([]);
  const [sortByPrice,setSortByPrice] = useState('')

  const [params] = useSearchParams();
  const query = params.get('query');

  const {isLoading,data} = useGetSearchCoursesQuery({searchQuery : query , categories : selectedCategories, sortByPrice});

  const isEmpty = !isLoading && data?.data.length === 0;

  const handelFilterChange = (categories,price) => {
    setSelectedCategories(categories);
    setSortByPrice(price)
  }

  return (
    <div className=" p-4 pt-24 max-w-7xl mx-auto  md:p-8 md:pt-24">
      <div className="my-6">
        <h1 className="text-lg font-semibold mb-1">Search for "{query}"</h1>
        <p>
          Showing results for{" "}
          <span className="text-blue-800 font-bold italic">
            {query}
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handelFilterChange = {handelFilterChange}/>
        <div className="flex-1">
          {isLoading ? (
            [1, 2, 3, 4].map((i) => <CourseSkeleton key={i} />)
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data.data.map((course) => <SearchResult key={course._id} course={course} />)
          )}
        </div>
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  return <p>Course not found</p>;
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
}
export default SearchPage;
