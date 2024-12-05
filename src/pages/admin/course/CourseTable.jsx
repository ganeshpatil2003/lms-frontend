import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetCreatorCoursesQuery } from "@/store/apis/courseApi";
import { Loader, LucideEdit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading, isSuccess, error, refetch } =
    useGetCreatorCoursesQuery();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="m-auto p-4">
        <Loader size={20} className="animate-spin" />
      </div>
    );
  }
  const courseArray = data.data;
  return (
    <div>
      <Button className="mb-6" onClick={() => navigate("create")}>
        Create a new Course
      </Button>
      <Table>
        <TableCaption>A list of your courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Price</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseArray.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course.coursePrice || "NA"}
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell>
                <Badge>
                  {course.isPublished ? "Published" : "Unpublished"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant={"outline"} onClick= {() => navigate(`/admin/courses/${course._id}`)}>
                  <LucideEdit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
};

export default CourseTable;
