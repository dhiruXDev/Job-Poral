import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { formatSalaryToINR } from '@/utils/RupeesConverter'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

const Job = ({job}) => {
    const navigate = useNavigate();
    
    const { user } = useSelector(store => store.auth);
 
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div 
            onClick={ ()=>{
                if(user){
                    navigate(`/description/${job?._id}`);
                } else {
                    navigate("/login", { 
                        state: { from: location.pathname }, // tracks current path
                    });
                }
            }} 
            className='p-3 sm:p-4 md:p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:scale-[1.02] duration-300 transition-all'
        >
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full p-0 h-8 w-8 sm:h-9 sm:w-9" size="icon">
                    <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
            </div>
    
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-0 sm:p-2 md:p-4" variant="outline" size="icon">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div className="overflow-hidden">
                    <h1 className='font-medium text-base sm:text-lg truncate'>{job?.company?.name}</h1>
                    <p className='text-xs sm:text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-base sm:text-lg my-2 truncate'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            
            <div className='flex flex-wrap items-center gap-1 sm:gap-2 mt-3 sm:mt-4'>
                <Badge className={'text-blue-700 font-bold text-xs'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold text-xs'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold text-xs'} variant="ghost">
                    {job?.jobType === "Job" ? formatSalaryToINR(job?.salary) : formatSalaryToINR(job?.salary)+'/month'}
                </Badge>
            </div>
            
            <div className='flex items-center gap-2 sm:gap-4 mt-3 sm:mt-4'>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }} 
                    variant="outline" 
                    className="text-xs sm:text-sm py-1 h-8 sm:h-9"
                >
                    Details
                </Button>
                <Button 
                    className="bg-[#7209b7] text-xs sm:text-sm py-1 h-8 sm:h-9"
                    onClick={(e) => e.stopPropagation()}
                >
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job