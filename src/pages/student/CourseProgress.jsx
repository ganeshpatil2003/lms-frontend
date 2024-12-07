import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React from "react";
const isCompleted = false
const CourseProgress = () => {
  return (
    <div className="text-xl mt-20 font-bold mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Course title</h2>
        <Button>Completed</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {/* <Video>
                    Video
                </Video> */}
          </div>
          <div className="text-lg mt-2 font-medium">lecture intro</div>
        </div>
        <div className="flex flex-col md:w-2/5 border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0 ">
                <h2 className="font-semibold text-xl mb-4">Course lectures</h2>
                <div className="flex-1 overflow-y-auto space-y-4">
                    {[1,2,3].map((lecture,i) => 
                        (<Card key={i} className="cursor-pointer transition transform">
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center justify-start gap-1">
                                    {
                                        isCompleted ? <><CheckCircle2 className="text-green-500 mr-2" size={24}/></> :
                                         <><CirclePlay className="text-gray-500 mr-2" size={24}/></>
                                    }
                                    <CardTitle className={'text-lg font-medium'}>Lecture title</CardTitle>
                                </div>
                                <div className="flex items-center">
                                    <Badge variant={'outline'} className={'bg-green-200 text-green-500'}>Completed</Badge>
                                </div>
                            </CardContent>
                        </Card>))}
                </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
