import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
        <div><Loader className='animate-spin  h-16 w-16 text-indigo-600'/></div>
    </div>
  )
}

export default LoadingSpinner