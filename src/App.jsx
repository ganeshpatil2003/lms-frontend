import React from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import ProfilePage from './pages/student/ProfilePage'
import Sidebar from './pages/admin/lecture/Sidebar'
import Dashboard from './pages/admin/lecture/Dashboard'
import AddCourse from './pages/admin/course/AddCourse'
import CourseTable from './pages/admin/course/CourseTable'


const route = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children : [
      {
        path : '/',
        element:(
        <>
          <HeroSection/>
          <Courses/>
        </>
        )
      },
      {
        path:'my-learning',
        element:<MyLearning/>
      },
      {
        path:"profile",
        element:<ProfilePage/>
      },
      {
        path : "login",
        element:<Login/>
      },

      // admin routes starts

      {
        path : "admin",
        element : <Sidebar/>,
        children : [
          {
            path : 'dashboard',
            element:<Dashboard/>,
          },
          {
            path : 'courses',
            element : <CourseTable/>
          },
          {
            path : 'courses/create',

            element:<AddCourse/>
          },
        ]
      }

    ]
  },
 
])
const App = () => {
  return (
      <main>
        <RouterProvider router ={route}/>
      </main>
  )
}

export default App