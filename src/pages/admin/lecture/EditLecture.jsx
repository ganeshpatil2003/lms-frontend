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
import { ArrowLeft, Loader, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLecureByIdQuery,
  useRemovelectureMutation,
} from "@/store/apis/lectureApi";
import { useEffect } from "react";

const MEDIA_URL = "http://localhost:8040/api1/v1/media";
const EditLecture = () => {
  const { id, lectureId } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError, error, refetch } =
    useGetLecureByIdQuery(lectureId);
  const [
    editLecture,
    {
      data: editData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editError,
      isError: editIsError,
    },
  ] = useEditLectureMutation();

  const [
    removeLecture,
    {
      data: removeData,
      isLoading: removeIsLoading,
      isSuccess: removeIsSuccess,
      isError: removeIsError,
      error: removeError,
    },
  ] = useRemovelectureMutation();

  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [isFree, setIsFree] = useState(false);

  const handelFileChangeHandeler = async (e) => {
    // uploading video
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        setMediaProgress(true);
        const res = await axios.post(`${MEDIA_URL}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round(loaded * 100) / total);
          },
        });

        if (res.data.successcode) {
          console.log(res, "uploading");
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.publicId,
          });
          // console.log(uploadVideoInfo);
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Video uploaded fail");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const handelOnClickUpdateButton = async () => {
    console.log(uploadVideoInfo, "uploadvideoinfo");
    await editLecture({
      lectureId,
      courseId: id,
      isPriviewFree: isFree,
      videoInfo: uploadVideoInfo,
      lectureTitle: title,
    });
  };
  const handelOnClickRemoveButton = async () => {
    await removeLecture(lectureId);
  };
  useEffect(() => {
    if (isSuccess) {
      setTitle(data?.data?.lectureTitle);
      setIsFree(data?.data?.isPriviewFree);
    }
    if (editIsError) toast.error(editError.data.message);
    if (editIsSuccess) {
      toast.success(editData.message);
      navigate(`/admin/courses/${id}/lecture`);
    }
    if (removeIsSuccess) {
      toast.success(removeData.message);
      navigate(`/admin/courses/${id}/lecture`);
    }
    if (removeIsError) toast.error(removeError.data.message);
  }, [isSuccess, editIsError, editIsSuccess, removeIsError, removeIsSuccess]);

  if (isLoading)
    return (
      <>
        <Loader2 size={60} className="m-auto" />
      </>
    );
  if (isError) {
    return (
      <>
        <h2 className="font-bold text-xl">
          Server Error while fetching lectures
        </h2>
      </>
    );
  }
  if (isSuccess) {
    return (
      <>
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <Link
              className="flex items-center relative"
              to={`/admin/courses/${id}/lecture`}
            >
              <Button
                size={"icon"}
                variant={"outline"}
                className="rounded-full"
              >
                <ArrowLeft />
              </Button>
            </Link>
            <div className="text-xl font-bold ml-4">Update your Lecture</div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>
              Make chnges and click save when you done
            </CardDescription>
            <div>
              <Button
                variant="destructive"
                disabled={removeIsLoading}
                onClick={handelOnClickRemoveButton}
              >
                {removeIsLoading ? (
                  <>
                    <Loader className="mr-2 w-4 h-4" />
                    Remove Lecture
                  </>
                ) : (
                  " Remove Lecture"
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="">
              <Label className="">Title</Label>
              <Input
                type="text"
                value={title}
                placeholder="Enter lecture title here"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>
                Video <span className="text-sm text-red-700">*</span>
              </Label>
              <Input
                type="file"
                accept="video/*"
                onChange={handelFileChangeHandeler}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="free" checked={isFree} onCheckedChange={setIsFree} />
              <Label htmlFor="free" className="font-semibold text-lg">
                is this video free?
              </Label>
            </div>
            {mediaProgress && (
              <div className="my-4">
                <Progress value={uploadProgress}></Progress>
                <p> {uploadProgress}%uploaded</p>{" "}
              </div>
            )}

            <Button
              className="p-3 mt-3"
              disabled={editIsLoading}
              onClick={handelOnClickUpdateButton}
            >
              {editIsLoading ? (
                <>
                  <Loader className="mr-2 w-4 h-4" />
                  Update Lecture
                </>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }
};

export default EditLecture;
