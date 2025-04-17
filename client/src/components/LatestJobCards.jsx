import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import job1 from "../assets/job1.avif"
import job2 from "../assets/job2.avif"
import job3 from "../assets/job3.png"
import job4 from "../assets/job4.png"
import { Calendar, MapPin } from 'lucide-react'
import { formatSalaryToINR } from '@/utils/RupeesConverter'

const LatestJobCards = ({job,index}) => {
    const navigate = useNavigate();
    const  bgarr = [job1,job2,job3,job4];
    // Assign background image based on index to ensure variety
    const backgroundImage = bgarr[index % bgarr.length];

    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='   rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:scale-[1.02]  transition-transform duration-300 ease-in-out'>
          
           <div className="bg-cover bg-center h-24 w-full  rounded-t-md  relative " style={{ backgroundImage: `url(${backgroundImage})` }}>
                {/* <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p> */}
                <div className=' bg-white py-3 px-3 w-fit rounded-lg z-[10] absolute bottom- right-4 top-10 shadow-sm shadow-slate-400'>
                    <img src= {job?.company?.logo} className=' h-14 w-14' />
                </div>
            </div>

            <div className='px-4'>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600   '>{job?.description}</p>
            </div>
            <div>
              <div className=' px-4 pt-3 flex gap-x-1 items-center  text-slate-400'> <MapPin   className='  h-4 w-4'/> <p className=' text-sm'>{job?.location}</p></div> 
               <div className=' px-4 pt-2 flex gap-x-1 items-center  text-slate-400'><Calendar  className='  h-4 w-4'/><p className=' text-sm'>{job?.duration ? `${job?.duration}` : `NAN`}</p> </div>  
            </div>
            <div className='flex items-center gap-2 mt-4 p-2 pb-5'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{formatSalaryToINR(job?.salary)} </Badge>
            </div>

        </div>
    )
}

export default LatestJobCards