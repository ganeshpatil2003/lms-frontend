import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { usePurchaseCourseMutation } from '../store/apis/purchaseApi'
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const isLoading = true;
const BuyPurchaseCourse = ({ courseId,refetch }) => {
  const [purchaseCourse,{isLoading,isSuccess,isError,error,data}] = usePurchaseCourseMutation(courseId)
  const handelOnClick = async () => {
    await purchaseCourse(courseId);
  };
  useEffect(()=>{
    if(isSuccess){toast.success(data.message)
      refetch();
     }
      if(isError)toast.error(error.data.message)
  },[isSuccess,isError,error])
  return (
    <Button className="w-full" disabled={isLoading} onClick={handelOnClick}>
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Purchase course
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyPurchaseCourse;
