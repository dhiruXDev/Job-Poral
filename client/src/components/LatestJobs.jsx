import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import LatestInternshipCard from './LatestInternshipCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs ,allInternships} = useSelector(store=>store.job);
    
    var settings = {
        dots: false,
        infinite: true,  // Keeps looping infinitely
        speed: 1800,  // Speed of slide transition
        slidesToShow: 8,  // Number of slides visible at once
        slidesToScroll: 1,  // Moves 2 slides at a time
        autoplay: true,  // ✅ Enables automatic movement
        autoplaySpeed: 0,  // Moves every 2 seconds
        cssEase: "linear",  // Smooth continuous sliding effect
      };

    return (
        <div className=' w-full  lg:px-0 lg:max-w-7xl mx-auto my-20'>
 {/* Intenship */}
            <h1 className=' text-2xl sm:text-4xl font-bold pb-5  lg:px-1  px-3 '><span className='text-[#6A38C2] '>Latest & Top </span> internships on Job Portal</h1>
            <div className="my-5 lg:px-1 px-3">
                {/* Mobile horizontal scroll */}
                <div className="flex gap-4 overflow-x-auto md:hidden hide-scrollbar">
                    {
                    allInternships?.length <= 0 
                        ? <span>No Internship Available</span> 
                        : allInternships?.slice(0, 8)?.map((job, index) =>
                            job?.jobType === "Internship" && (
                            <div className="min-w-[280px]" key={job._id}>
                                <LatestInternshipCard index={index} job={job} />
                            </div>
                            )
                        )
                    }
                </div>

                {/* Grid for md and up */}
                <div className="hidden md:!grid md:grid-cols-2 lg:grid-cols-4  gap-y-6 gap-x-10 lg:gap-4">
                    {
                    allInternships?.length <= 0 
                        ? <span>No Internship Available</span> 
                        : allInternships?.slice(0, 8)?.map((job, index) =>
                            job?.jobType === "Internship" && (
                            <LatestInternshipCard key={job._id} index={index} job={job} />
                            )
                        )
                    }
                </div>
           </div>



{/* Jobs */}
            <h1 className='text-2xl sm:text-4xl font-bold mt-10 lg:px-1  px-2 '><span className='text-[#6A38C2]'>Latest & Top </span> Jobs on Job Portal</h1>

            {/* Scrollable on mobile, grid on md and up */}
                <div className="my-5 lg:px-1 px-3">
                {/* Mobile scroll container */}
                <div className="flex gap-4 overflow-x-auto md:hidden hide-scrollbar">
                    {allJobs.length <= 0 
                    ? <span>No Job Available</span> 
                    : allJobs.slice(0, 8).map((job, index) =>
                        job?.jobType === "Job" && (
                            <div className="min-w-[280px]" key={job._id}>
                            <LatestJobCards index={index} job={job} />
                            </div>
                        ))}
                </div>

                {/* Grid for md and up */}
                <div className="hidden md:!grid md:grid-cols-2 lg:grid-cols-4  gap-y-6 gap-x-10 lg:gap-4">
                    {allJobs.length <= 0 
                    ? <span>No Job Available</span> 
                    : allJobs.slice(0, 8).map((job, index) =>
                        job?.jobType === "Job" && (
                            <LatestJobCards key={job._id} index={index} job={job} />
                        ))}
                </div>
                </div>


        </div>
    )
}

export default LatestJobs