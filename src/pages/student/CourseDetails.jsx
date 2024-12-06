import BuyPurchaseCourse from "@/components/BuyPurchaseCourse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetails = () => {
    const purchaseCourse = false
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col gap-2 md:px-8">
          <h1 className="font-bold text-2xl md:text-3xl">Course details</h1>
          <p className="text-base md:text-lg">Course subtitle</p>
          <p>
            Created by{" "}
            <span className="text-[#C0C4FC] underline italic">
              chai aur code
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {"11-10-24"}</p>
          </div>
          <p>Student enrolled :10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10 ">
        <div className="lg:w-1/2 w-full space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
            voluptatibus officiis dolor eos amet laudantium suscipit temporibus
            dolores numquam quidem laboriosam, voluptate exercitationem vitae
            assumenda aspernatur consequatur a quas excepturi.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course title</CardTitle>
              <CardDescription>4 lecture</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
                {
                [1,2,3].map((lecture,i) => (
                    <div className=" flex items-center gap-2" key={i}>
                        <span>
                            {
                                true ? (<PlayCircle size={14}/>) : (<Lock size={14}/>)
                            }
                        </span>
                        <p>Lecture title</p>
                    </div>
                ))
                }
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3"> 
                <Card>
                    <CardTitle>
                        <CardDescription>
                            
                        </CardDescription>
                    </CardTitle>
                    <CardContent className='p-4 flex flex-col'>
                        <div className="w-full "></div>
                        <div className="w-full aspect-video mb-4 ">
                            Video aayega
                        </div>
                        <h1>Video title</h1>
                        <Separator className='my-2' />
                        <h1 className="text-lg md:text-xl font-semibold">Cource price</h1>
                    </CardContent>
                    <CardFooter>
                        {
                            purchaseCourse ? <Button className="w-full"> Continue course</Button>
                           : <BuyPurchaseCourse/>
                            }
                    </CardFooter>
                </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
