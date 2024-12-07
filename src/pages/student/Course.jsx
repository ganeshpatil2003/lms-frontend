import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const Course = ({course}) => {
  const navigate = useNavigate();
  const {courseTitle,category,coursePrice,creator,courseThumbnail,_id} = course
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg">
      <img 
        className="rounded-t-md w-72 h-40 "
        src={ courseThumbnail || "https://www.filepicker.io/api/file/S5atf80QTb2tZOScHsiW"}
        alt="course"
      />
      <CardContent className = "space-y-2 p-3">
        <h2 className="text-lg font-bold truncate hover:underline cursor-pointer" onClick = {() =>navigate(`course-details/${_id}`)}>
          React js full course in hindi 2024
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={creator.avatar||"https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              <span>{courseTitle}</span>
            </div>
          </div>
          <Badge className="bg-blue-600 transition-all text-white px-2 py-1 text-xs rounded-full">Advance</Badge>
        </div>
        <div className="text-lg font-bold">
            <span>
            ₹{coursePrice}
            </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
