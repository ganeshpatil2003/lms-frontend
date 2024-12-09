import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useUpdateCourseMutation } from "@/store/apis/courseApi";
import {
  useGetCourseProcessQuery,
  useMarkAsCompleteMutation,
  useMarkInCompleteMutation,
  useUpdateCourseProcessMutation,
} from "@/store/apis/processApi";
import { CheckCircle2, CirclePlay, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
const isCompleted = false;
const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isSuccess, isError, error, isLoading, refetch } =
    useGetCourseProcessQuery(courseId);
    const [markAsComplete,{isLoading:completeIsLoading}] = useMarkAsCompleteMutation()
    const [markInComplete,{isLoading:incompleteIsLoading}] = useMarkInCompleteMutation()
  const [updateCourseProcess] = useUpdateCourseProcessMutation();
  const [lecture, setLecture] = useState(null);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const { course, lectureProgress, completed } = data.data;
  const currentLectureDetails = lecture || course.lectures[0];

  const handelCurrentLectureProcess = async (lectureId) => {
    await updateCourseProcess({ courseId, lectureId });
    refetch();
  };
  const isLectureCompleted = (lectureId) => {
    return lectureProgress.some(
      (lecture) => lecture.lectureId === lectureId && lecture.viewed
    );
  };

  const handelComplete = async() => {
    await markAsComplete(courseId);
    refetch();
  }

  const handelInComplete = async () => {
    await markInComplete(courseId);
    refetch();
  }

  return (
    <div className="text-xl mt-20 font-bold mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{`${course.courseTitle}`}</h2>
        {completed ? (
          <Button onClick={handelInComplete} disabled={incompleteIsLoading}>{incompleteIsLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Incomplete Course</>:"Incomplete Course"}</Button>
        ) : (
          <Button onClick={handelComplete} disabled={completeIsLoading}>{completeIsLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Complete Course</>:"Complete Course"}</Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              controls
              className="w-full h-auto rounded"
              src={currentLectureDetails.videoUrl}
              onPlay={() =>
                handelCurrentLectureProcess(currentLectureDetails._id)
              }
            />
          </div>
          <div className="text-lg mt-2 font-medium">{`Lecture ${
            course.lectures.findIndex(
              (lecture) => lecture._id === currentLectureDetails._id
            ) + 1
          } ${currentLectureDetails.lectureTitle}`}</div>
        </div>
        <div className="flex flex-col md:w-2/5 border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0 ">
          <h2 className="font-semibold text-xl mb-4">Course lectures</h2>
          <div className="flex-1 overflow-y-auto space-y-4">
            {course.lectures.map((lecture) => (
              <Card
                onClick={() => setLecture(lecture)}
                key={lecture._id}
                className={`cursor-pointer transition transform ${
                  currentLectureDetails._id === lecture._id ? "bg-gray-300" : ""
                }`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center justify-start gap-1">
                    {isLectureCompleted(lecture._id) ? (
                      <>
                        <CheckCircle2
                          className="text-green-500 mr-2"
                          size={24}
                        />
                      </>
                    ) : (
                      <>
                        <CirclePlay className="text-gray-500 mr-2" size={24} />
                      </>
                    )}
                    <CardTitle className={"text-lg font-medium"}>
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant={"outline"}
                        className={"bg-green-200 text-green-500"}
                      >
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
