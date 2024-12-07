import BuyPurchaseCourse from "@/components/BuyPurchaseCourse";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseByIdQuery } from "@/store/apis/courseApi";
import { usePurchaseCourseDetailsQuery } from "@/store/apis/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data, isLoading, isSuccess, isError,refetch } =
    usePurchaseCourseDetailsQuery(courseId);
  const purchaseCourse = false;
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  console.log(data);
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col gap-2 md:px-8">
          <h1 className="font-bold text-2xl md:text-3xl">Course details</h1>
          <p className="text-base md:text-lg">{data.data.course.subTitle}</p>
          <p>
            Created by{" "}
            <span className="text-[#C0C4FC] underline italic">
              {`  ${data.data.course.creator.username}`}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>
              Last updated{" "}
              {new Date(`${data.data.course.updatedAt}`).toLocaleString()}
            </p>
          </div>
          <p>Student enrolled : {data.data.course.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10 ">
        <div className="lg:w-1/2 w-full space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: data.data.course.description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>{data.data.course.courseTitle}</CardTitle>
              <CardDescription>
                <span>No of lectures: </span>
                {data.data.course.lectures.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.data.course.lectures.map((lecture) => (
                <div className=" flex items-center gap-2" key={lecture._id}>
                  <span>
                    {lecture.isPriviewFree ? (
                      <PlayCircle size={14} />
                    ) : (
                      <Lock size={14} />
                    )}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardTitle>
              <CardDescription></CardDescription>
            </CardTitle>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full ">
                <div className="w-full aspect-video mb-4 ">
                  <ReactPlayer
                    // url={data.data.course.lectures[0].videoUrl}
                    url="http://res.cloudinary.com/dfhz3a2h0/video/upload/v1733429978/vwsgf0kzvlsjdw0zautw.mp4"
                    controls={true}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </div>
              <h1>{data.data.course.lectures[0].lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                ₹ {data.data.course.coursePrice}
              </h1>
            </CardContent>
            <CardFooter>
              {data.data.purchase ? (
                <Button
                  className="w-full"
                  onClick={() => navigate(`/course-progress/${courseId}`)}
                >
                  {" "}
                  Continue course
                </Button>
              ) : (
                <BuyPurchaseCourse courseId={courseId} refetch={refetch} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
