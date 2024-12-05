import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "../../../store/apis/lectureApi";

const Lecture = () => {
  const { id } = useParams();
  const {
    data: lecturesData,
    isSuccess: lecturesIsSuccess,
    isLoading: lecturesIsLoading,
    isError: lecturesIsError,
  } = useGetCourseLectureQuery(id);
  const [createLecture, { data, error, isLoading, isSuccess, isError }] =
    useCreateLectureMutation();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setLectureTitle("");
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);
  const createLectureHandler = async () => {
    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    const result = await createLecture({ courseId: id, formData });
  };

  return (
    <div className="flex-1 mx-10">
      <div className="my-4">
        <h2 className="font-bold text-xl">
          Lets add lecture,add some basic lecture deatils for your course
        </h2>
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
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            name="lectureTitle"
            placeholder="Your lecture title"
          />
        </div>
        <div className="flex items-center gap-2 ">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/courses/${id}`)}
          >
            Back to course
          </Button>
          {
            <Button disabled={isLoading} onClick={createLectureHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 " />
                  Create lecture
                </>
              ) : (
                "Create lecture"
              )}
            </Button>
          }
        </div>
      </div>
      {lecturesIsLoading ? (
        <>
          <Loader2Icon size={60} className="m-auto" />
        </>
      ) : (
        lecturesIsSuccess &&
        (lecturesData?.data[0].lectures?.length === 0 ? (
          <>
            <p className="text-xl font-semibold m-auto text-center text-gray-800">
              Not any lecture added
            </p>
          </>
        ) : (
          <div>
            <div className="flex items-center justify-between p-7 pl-0 pr-20">
              <div className="font-bold text-xl">
                {lecturesData?.data[0].courseTitle}
              </div>
              <div className="font-semibold text-sm">
                {" "}
                {lecturesData?.data[0].totalLectures} lectures
              </div>
            </div>
            <div>
              {lecturesData?.data[0].lectures?.map((lecture, index) => (
                <div className="bg-[#f7f9fa] flex justify-between items-center p-4 rounded mb-4" key={lecture._id}>
                  <h2 className="text-gray-800 font-bold">
                    Lecture <span>{index + 1}</span> {lecture.lectureTitle}
                  </h2>
                  <Link to={`${lecture._id}`}>
                    <Edit
                      size={20}
                      className="cursor-pointer text-gray-600 hover:text-indigo-600"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Lecture;
