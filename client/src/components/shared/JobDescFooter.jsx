import React from 'react'
import job from "../../assets/job-search.png"
export const JobDescFooter = () => {
  return (
    <footer className="border-t border-t-gray-200 py-4">
            <div className="container mx-auto px-4">
          
            <div className="flex flex-col   items-center">
            <div onClick={() => navigate("/")} className='cursor-pointer'>
                    <span className=' flex gap-x-1 items-center '><span className=' text-xl font-semibold  text-gray-600'> Powered by</span>  <img src={`${job}`}  className=' h-10 w-10 relative top-1 left-2'/> <span className='text-[#F83002] text-2xl font-bold'>Portal</span></span>
                </div>
 
                <p className="text-sm mt-3"> Best Viewed in Chrome, Opera, Mozilla, EDGE & Safari © 2025 Your Company. All rights reserved.</p>
               
            </div>
    </div>
  </footer>
  )
}
