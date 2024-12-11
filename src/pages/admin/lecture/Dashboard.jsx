import LoadingSpinner from '@/components/LoadingSpinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAllPurchaseCoursesQuery } from '@/store/apis/purchaseApi'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const Dashboard = () => {
  const {data,isLoading,isSuccess,isError} = useAllPurchaseCoursesQuery();
  if(isLoading)return<><LoadingSpinner></LoadingSpinner></>
  if(isError)return <><p className='text-lg text-red-700  text-center m-auto'>Failed to load courses details</p></>
  const courses = data.data || []
  const courseData = courses.map(course =>({price: course.courseId.price,name : course.courseId.courseTitle}))
  const totalRevenue = courses.reduce((acc,curr) => acc + (curr.amount  || 0),0)
  const totalSales = courses.length;
  return (
    <>
    <div className='grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
            <CardTitle>Total sales</CardTitle>
        </CardHeader>
        <CardContent>
           <p className='text-blue-600 text-3xl font-bold'>{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
            <CardTitle>Total revenue</CardTitle>
        </CardHeader>
        <CardContent>
           <p className='text-blue-600 text-3xl font-bold'>{totalRevenue}</p>
        </CardContent>
      </Card>
    </div>
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mt-14">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30} // Rotated labels for better visibility
                textAnchor="end"
                interval={0} // Display all labels
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2" // Changed color to a different shade of blue
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    
     </>
  )
}

export default Dashboard