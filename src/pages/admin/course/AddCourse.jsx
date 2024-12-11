import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateCourseMutation } from "@/store/apis/courseApi";
import { Loader, Loader2 } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {

    const [createCourse,{data,isLoading,isSuccess,error}] = useCreateCourseMutation()

  const[courseTitle,setCourseTitle] = useState("");
  const[courseCategory,setCourseCategory] = useState("");
  const navigate = useNavigate();
  const onCreateCourseHandeler = async() => {
    const result = await createCourse({courseTitle,category:courseCategory})
  }
  useEffect(()=>{
    if(isSuccess){
        toast.success(data.message);
        setCourseCategory("");
        setCourseTitle("");
        navigate('/admin/courses');
        
    }
    if(error){
        // console.log(error);
        toast.error(error.data.message);
    }
  },[isLoading,isSuccess,error,data])
  
  return (
    <div className="flex-1 mx-10">
      <div className="my-4">
        <h1 className="font-bold text-xl">
          Lets,add some basic course deatils for your new course
        </h1>
        <p className="sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed illum
          harum sequi perspiciatis tenetur neque eveniet molestiae quae quas
          deserunt.
        </p>
      </div>
      <div className="space-y-8">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange ={(e) => setCourseTitle(e.target.value)}
            name="courseTitle"
            placeholder="Your course name"
          />
        </div>
        <div className="space-y-2">
          <Label>Select category </Label>
          <Select onValueChange={(value) => setCourseCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="nextjs">Next js</SelectItem>
                <SelectItem value="fullstack">Fullstack</SelectItem>
                <SelectItem value="mernstack">MERN Stack</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C ++</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="reactjs">React js</SelectItem>
                <SelectItem value="expressjs">Express js</SelectItem>
                <SelectItem value="mongodb">Mongo db</SelectItem>
                <SelectItem value="psgreysql">PostGreySQL</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="javascript">Java Script</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="webdev">Web Developement</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 ">
          <Button variant="outline" onClick={() => navigate("/admin/courses")}>
            Back
          </Button>
          {
            <Button disabled={isLoading} onClick={onCreateCourseHandeler}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 " />Create course
                </>
              ) : (
                "Create course"
              )}
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
