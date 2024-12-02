import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserQuery, useUpdateUserMutation } from "@/store/apis/userApi";
import { Loader2 } from "lucide-react";

import React from "react";
import { useEffect } from "react";
import { useState } from "react"; 
import { toast } from "sonner";
import Course from "./Course";

const ProfilePage = () => {
  const { data, isLoading, isSuccess, isError, refetch  } = useGetUserQuery();

  const [
    updateUser,
    {
      data: formData,
      isLoading: formtDataIsLoading,
      error: formDataError,
      isSuccess: formDataSuccess,
    },
  ] = useUpdateUserMutation();
  const [inputData, setInputData] = useState("");
  const [photoFile, setPhotoFile] = useState("");

  const handelOnClick = async () => {
    const forminput = new FormData();
    forminput.append("username", inputData);
    forminput.append("avatar", photoFile);
    const result = await updateUser(forminput);
    // console.log(inputData,photoFile);
    if (result?.data?.statuscode === 200) {
      setInputData("");
    }
  };

  const handelOnchange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoFile(file);
  };

  useEffect(() => {
    if (formData && formDataSuccess) {
      toast.success(formData.data?.message || "User updated successfully.");
      console.log(formData)
      refetch();
    }
    if (formDataError) {
      toast.error(formDataError?.data?.message);
      console.log(formDataError);
    }
  }, [formData, formDataError, formDataSuccess]);

  // const user = data.data

  if (isLoading) {
    return (
      <p className="m-auto text-5xl font-semibold text-gray-900">
        Loading.....
      </p>
    );
  }
  const { data: user } = data;
  
  // console.log(data)
  const enrolledCourses = user.enrolledCourses;

  return (
    <>
      <div className="pt-24 w-screen h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="px-5 font-bold text-2xl text-center md:text-left">
            PROFILE
          </h1>
          <div className="flex flex-col md:flex-row md:items-start items-center gap-16 my-5">
            <div className="flex items-start">
              <Avatar className="h-20 w-20 md:h-36 md:w-36 mb-4">
                <AvatarImage className='bg-cover'
                  src={user.avatar || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  Name:
                  <span className="text-gray-700 dark:text-gray-300 mr-2 font-normal">
                    {` ${user.username}`}
                  </span>
                </h2>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  Mail:
                  <span className="text-gray-700 dark:text-gray-300 mr-2 font-normal">
                    {` ${user.email}`}
                  </span>
                </h2>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  Role:
                  <span className="text-gray-700 dark:text-gray-300 mr-2 font-normal">
                    {` ${user.role}`}
                  </span>
                </h2>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile and click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 items-center gap-2">
                      <Label className="">Name</Label>
                      <Input
                        placeholder="Name"
                        value={inputData}
                        name="inputData"
                        onChange={(e) => setInputData(e.target.value)}
                        type="text"
                        className="col-span-3"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-2">
                      <Label className="">Profile photo</Label>
                      <Input
                        placeholder="Choose file"
                        name="avatar"
                        onChange={handelOnchange}
                        type="file"
                        accept="image/*"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      disabled={formtDataIsLoading}
                      onClick={handelOnClick}
                    >
                      {formtDataIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 animate-spin" /> Please
                          Wait
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-lg ">Courses you're enrolled in</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              {enrolledCourses.length === 0 ? (
                <>
                  <h2 className="text-lg">You haven't enrolled yet :) </h2>
                </>
              ) : (
                enrolledCourses.map((course, i) => <Course key={i} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
