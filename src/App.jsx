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
      }
    ]
  },
  {
    path : "login",
    element:<Login/>
  }
])
const App = () => {
  return (
      <main>
        <RouterProvider router ={route}/>
      </main>
  )
}

export default App
