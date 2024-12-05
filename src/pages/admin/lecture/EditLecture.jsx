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
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { toast } from "sonner";

const MEDIA_URL = 'http://localhost:8040/api1/v1/media'
const EditLecture = () => {
  const [title,setTitle] = useState('')
  const [uploadVideoInfo,setUploadVideoInfo] = useState(null)
  const [mediaProgress,setMediaProgress] = useState(false)
  const [uploadProgress,setUploadProgress] = useState(0)
  const [btnDisable,setBtnDisable] = useState(true)
  const [isFree,setIsFree] = useState(false);

  const handelFileChangeHandeler = async (e) => {
        const file = e.target.files[0];
        if(file){
            const formData = new FormData();
            formData.append('file',file);
           try {
                setMediaProgress(true);
                const res = await axios.post(`${MEDIA_URL}/upload-video`,formData,{
                    onUploadProgress : ({loaded,total}) => {
                        setUploadProgress(Math.round(loaded * 100)/total);
                    }
                });

                if(res.data.successCode){
                    console.log(res);
                    setUploadVideoInfo({videoUrl : res.data.data.url,publicId : res.data.data.publicId});
                    setBtnDisable(false);
                    toast.success(res.data.message)
                }
           } catch (error) {
                    toast.error('Video uploaded fail')
           }finally{
            setMediaProgress(false)
           }
        }
  }
  const { id, lectureId } = useParams();
  return (
    <>
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Link
            className="flex items-center relative"
            to={`/admin/courses/${id}/lecture`}
          >
            <Button size={"icon"} variant={"outline"} className="rounded-full">
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
            <Button variant="destructive">Remove Lecture</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="">
            <Label className="">Title</Label>
            <Input
              type="text"
            //   value={input}
              placeholder="Enter lecture title here"
              onChange={() => (console.log('click'))}
            />
          </div>
          <div>
            <Label>
              Video <span className="text-sm text-red-700">*</span>
            </Label>
            <Input type="file" accept="video/*" onChange={handelFileChangeHandeler}/>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="free" />
            <Label htmlFor="free" className="font-semibold text-lg">
              is this video free?
            </Label>
          </div>

          <Button className="p-3 mt-3" variant={mediaProgress ? `Loading` : ''}>
            Update Lecture
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default EditLecture;
