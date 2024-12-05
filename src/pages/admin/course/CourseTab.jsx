import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "@/store/apis/courseApi";
import { useEffect } from "react";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: courseData, isLoading: isCourseDataLoading ,isSuccess:courseisSuccess} =
    useGetCourseByIdQuery(id);
  const [updateCourse, { data, isSuccess, isLoading, error }] =
    useUpdateCourseMutation();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    coursePrice: "",
    courseLevel: "",
    courseThumbnail: "",
  });

  const [onPriviewThumbnail, setOnPriviewThumbnail] = useState("");



  useEffect(() => {
    
    if (data && isSuccess) {
      toast.success(data.message || "Course updated.");
      console.log(data);
    }
    if (error) {
      toast.error(error.data.message || "Course didn't update");
    }

  }, [data, isSuccess, error , id]);

  useEffect(()=>{
    if (courseisSuccess && courseData) {
      // console.log(courseData)
      setInput({
        courseTitle: courseData.data.courseTitle,
        subTitle: courseData.data.subTitle,
        description: courseData.data.description,
        category: courseData.data.category,
        coursePrice: courseData.data.coursePrice,
        courseLevel: courseData.data.courseLevel,
        courseThumbnail: courseData.data.courseThumbnail,
      });
    }
  },[courseData,courseisSuccess])
  //   console.log(id);
  

  const handelOnChange = (e) => {
    // console.log(e)
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handelCourseThumbnail = (e) => {
    const file = e.target.files?.[0];
    // console.log(file,"image file==========================================");
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setOnPriviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const handelOnClickButton = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseLevel", input.courseLevel);
    formData.append("courseThumbnail", input.courseThumbnail);
    // console.log(formData)
    const result = await updateCourse({ courseId: id, formData });
    // console.log(input);
    // console.log(input.courseThumbnail)
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };
  if (isCourseDataLoading) {
    return (
      <div className="p-auto">
        <Loader2 size={30} />
      </div>
    );
  }

  // console.log(courseData);
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic course information</CardTitle>
          <CardDescription>
            Make changes to your courses here and click save when you are done
          </CardDescription>
        </div>
        <div className="space-x-4">
          <Button variant="outline">
            {courseData.data.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 ">
          <div>
            <Label>Course title</Label>
            <Input
              type="text"
              placeholder="Ex. Fullstack developer"
              onChange={(e) => handelOnChange(e)}
              value={input.courseTitle}
              name="courseTitle"
              className
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              placeholder="Ex. Like Become a Fullstack developer zero to hero"
              onChange={(e) => handelOnChange(e)}
              value={input.subTitle}
              name="subTitle"
              className
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                value={input.category}
                onValueChange={(value) =>
                  setInput({ ...input, category: value })
                }
              >
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
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                value={input.courseLevel}
                onValueChange={(value) =>
                  setInput({ ...input, courseLevel: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>course level</SelectLabel>
                    <SelectItem value="beginner">beginner</SelectItem>
                    <SelectItem value="medium">medium</SelectItem>
                    <SelectItem value="advance">advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                className=""
                value={input.coursePrice}
                onChange={(e) => handelOnChange(e)}
                type="Number"
                name="coursePrice"
                placeholder="₹199"
              />
            </div>
          </div>
          <div>
            <Label>Course thumbnail</Label>
            <Input
              className="w-fit"
              type="file"
              accept="image/*"
              name={"courseThumbnail"}
              onChange={handelCourseThumbnail}
            ></Input>
            {onPriviewThumbnail ? (
              <>
                <img
                  src={onPriviewThumbnail}
                  alt="courseThumbnail"
                  className="w-64 my-2"
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="space-x-4 flex items-center">
            <Button
              onClick={() => navigate("/admin/courses")}
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handelOnClickButton}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
