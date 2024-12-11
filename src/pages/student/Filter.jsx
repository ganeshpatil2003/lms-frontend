import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
const categories = [
  { label: "Next js", id: "nextjs" },
  { label: "Data Science", id: "datascience" },
  { label: "Frontend developement", id: "frontend" },
  { label: "Backend developement", id: "backend" },
  { label: "Fullstack", id: "fullstack" },
  { label: "Python", id: "python" },
  { label: "Java", id: "java" },
  { label: "Java Script", id: "javascript" }
];
const Filter = ({ handelFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");


  const handelCategoryChange = (categoryId) => {
    setSelectedCategory((prevCategory) => {
      const newCategory = prevCategory.includes(categoryId)
        ? prevCategory.filter((id) => id !== categoryId)
        : [...prevCategory, categoryId];
        handelFilterChange(newCategory,sortByPrice)
        return newCategory
    });
  };

  const selctByPriceHandeler =(selectedValue) => {
      setSortByPrice(selectedCategory);
      handelFilterChange(selectedCategory,selectedValue);

  }
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between ">
        <h1 className="md:text-xl text-lg font-semibold"> Filter options</h1>
        <Select onValueChange={selctByPriceHandeler}>
          <SelectTrigger>
            <SelectValue placeholder={"sort by"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by Price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">Category</h1>
        {categories.map((category) => (
          <div className="flex items-center space-x-2 my-2" key={category.id}>
            <Checkbox
              id={category.id}
              onCheckedChange={() => handelCategoryChange(category.id)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
