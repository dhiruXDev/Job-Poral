import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { formatSalaryToINR } from '@/utils/RupeesConverter';
import { JobDescriptionNavBar } from './shared/JobDescriptionNavBar';
import { formatDate } from '@/utils/Datechanger';
import { Calendar ,Check,Clock,Edit,Edit2Icon,Edit3Icon,EditIcon,Forward,Globe, Group, Heart, LocateIcon, MapPinIcon, Share, Share2, Share2Icon, User, User2Icon, UsersRound   } from 'lucide-react';
 import calender from "../assets/Calender.webp"
import stipend from "../assets/stipend.webp"
import internshipTiming from "../assets/InternshipTypeTimeing.webp"
import workingDetails from "../assets/WorkingDetails.webp"
import jobdescImg from "../assets/JobDesc.png"
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import Perks from "../assets/Perks.webp"
import { PiShareFat } from 'react-icons/pi';
import { IoIosShareAlt } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { JobDescFooter } from './shared/JobDescFooter';
import RatingAndReview from './shared/RatingAndReview';
import RateAndReviewSystem from './shared/RateAndReviewKaro';
import { DaysLeftFormatter } from '@/utils/DaysLeftFormatter';
const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const{user} = useSelector((store)=>store.auth)
    console.log("INternship ", singleJob)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const[isActive, setIsActive] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const jobId = params.id;
    const dispatch = useDispatch();
    
    const [isShowRateModal , setisShowRateModal] =useState(false);

    const { text, status } = DaysLeftFormatter(singleJob?.deadline, singleJob?.createdAt);
        

    const applyJobHandler = async () => {
           setisShowRateModal(true);
        if(!user){
            toast.error('Please login to apply for this job');
            navigate('/login');
            return;
        }
        
        try {
 
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            console.log("Error ", res) 
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        if (isShowRateModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      
        // Cleanup just in case
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isShowRateModal]);
   
        const handleShare = () => {
          const currentURL = window.location.href;
          navigator.clipboard.writeText(currentURL)
            .then(() => toast.success('Link copied to clipboard! 📋'))
            .catch(() => alert('Failed to copy link.'));
        };
    
    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
 
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <> 
        <div className=' w-full flex flex-col  relative     '>
                 <JobDescriptionNavBar isApplied={isApplied} />
                 
                 <div className={`${isApplied ? "bg-green-50 shadow-green-50" : " bg-orange-50 shadow-orange-50"}  absolute h-[600px] w-full   shadow-xl  `}></div> 
 
                <div className=' w-full flex md:flex-row flex-col  px-5 xs:px-10 lg:px-40 gap-x-5  '>
{/* Left Part */}
                        <div className='w-full mx-auto sm:pl-5 lg:pl-0 my-10 flex flex-col gap-y-10 z-10'>
                            <div className=' flex flex-col gap-y-3    relative  ' >
                                    <div className=' h-[115%] w-[6px] bg-green-600 absolute  rounded-br-xl  -ml-4  '></div>
                                        <div className=' w-fit h-fit p-1 rounded-lg bg-white shadow-md shadow-gray-300'>
                                                <img src={singleJob?.company?.logo} alt="Company Logo" className='h-32 w-32 rounded-full' />
                                        </div>
                                        <h1 className='font-bold text-2xl md:text-5xl  text-gray-800'>{singleJob?.title}</h1>
                                        <div className='flex flex-col gap-y-2 mt-5 '>
                                                    <span className=' flex items-center gap-x-2'> 
                                                        <Globe  className=' font-extrabold   h-5 opacity-80' />
                                                        <a href={singleJob?.company?.website} target="_blank" rel="noopener noreferrer" className=' text-base text-gray-600 hover:underline'> {singleJob?.company?.name}</a>
                                                    </span>

                                                    <span className=' flex items-center gap-x-2'> 
                                                        <MapPinIcon className=' h-5 opacity-80'/> 
                                                        <span className='  font-semibold text-gray-800 text-base  '>Location: </span>
                                                        <span className=' text-sm'> {(singleJob?.location)}</span> 
                                                    </span>      

                                                    <span className=' flex items-center gap-x-2'> 
                                                        <Calendar className=' h-5 opacity-80'/> 
                                                        <span className='  font-semibold text-gray-800 text-base  '>Updated On: </span>
                                                        <span className=' text-sm'> {formatDate(singleJob?.updatedAt)}</span> 
                                                    </span>
                                        </div> 
                                    {/*  Days left*/}
                                    {singleJob?.deadline && singleJob?.createdAt && (() => {

                                            return (
                                                <div className='max-small:hidden absolute flex w-32 h-fit pt-4 rounded-lg flex-col gap-y-4 items-center gap-x-2 bg-white select-none shadow-lg shadow-gray-300 right-4 -bottom-10'>
                                                <span
                                                    className={`text-5xl pb-3 ${
                                                    status === 'closed'
                                                        ? 'text-red-500'
                                                        : status === 'closing_soon'
                                                        ? 'text-pink-500'
                                                        : 'text-green-600'
                                                    }`}
                                                >
                                                    {text === 0 ? 'Closed' : text}
                                                </span>
                                                <span className='font-semibold text-gray-800 bg-green-50 w-full bg-opacity-55 mb-1 text-center'>
                                                    {status === 'closed' ? 'Closed' : 'Days Left'}
                                                </span>
                                                </div>
                                            );
                                     })()}
                            </div>

                            {/* For small Width */}
                            <div className=' flex xs:-ml-4 md:-ml-0 md:hidden w-full md:w-[480px] z-10     flex-col    mx-auto   gap-y-3    duration-200  '>
                                <div className='flex flex-col p-2  md:px-4 border-2 border-gray-100 rounded-lg bg-white     mt-10'>
                                    {/* First  */}
                                    <div className=' flex flex-col gap-y-2  '>
                                                {/* Name , Elegible button */}
                                                <div className=' flex  items-center justify-between gap-x-2'> 
                                                        <div className=' flex flex-col '> 
                                                            <span className=''>{user?.fullname}</span>
                                                            <span className=' text-[13px] text-gray-600'>{user?.email}</span>
                                                        </div>
                                                        <div className=' bg-green-700 flex items-center gap-x-1 text-white rounded-sm px-2 py-1'>
                                                            <Check className=' h-4 w-4' />
                                                            <span className=' text-[13px]'>Eligible</span>
                                                        </div>
                                                </div>

                                                {/* Share */}
                                                <div className=' flex  items-center justify-between gap-x-2 my-2'> 
                                                        <div className=' flex   items-center gap-x-2'> 
                                                            {
                                                                 isActive ? ( 
                                                                    <FaHeart onClick={()=>{setIsActive((state)=>!state) ; toast.error(`This ${singleJob?.jobType} is removed from WatchList`) }} className={` ${isActive && "text-green-700"  } h-5 w-5  cursor-pointer   `} />
                                                                 ) : (
                                                                    <Heart onClick={()=>{setIsActive((state)=>!state) ;toast.success(`This ${singleJob?.jobType} is added ❤️ to WatchList`) }} className={`  h-5 w-5  text-gray-500  cursor-pointer  hover:text-gray-400 `} />
                                                                 )
                                                            }
                                                            <Calendar className=' h-5 w-5 text-gray-500 cursor-pointer  ' />
                                                        </div>
                                                        <buttom onClick = {handleShare}  className='     hover:bg-slate-100 duration-200 cursor-pointer  flex items-center gap-x-1 text-gray-700 rounded-lg px-4 py-2 border-2 border-gray-300'>
                                                            <IoIosShareAlt className=' text-xl'/>
                                                            <span className=' text-[14px]'>Share</span>
                                                        </buttom>
                                                </div>

                                               {/* Applied Button */}
                                               <Button
                                                        onClick={
                                                            status === 'closed'
                                                            ? undefined // disables navigation or action
                                                            : isApplied
                                                                ? () => navigate("/profile")
                                                                : applyJobHandler
                                                        }
                                                          // disables hover, click, and changes cursor
                                                        className={`
                                                            py-7 z-[100] duration-200 rounded-lg 
                                                            ${status === 'closed' 
                                                            ? 'bg-gray-800 cursor-not-allowed ' 
                                                            : isApplied 
                                                                ? 'bg-green-700 hover:bg-green-600' 
                                                                : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                                                            }
                                                        `}
                                                        >
                                                        {status === 'closed' ? (
                                                            <span className='flex flex-col items-center gap-x-2 text-lg text-white'>
                                                            Application Deadline Over
                                                            </span>
                                                        ) : isApplied ? (
                                                            <span className='flex flex-col items-center gap-x-2'>
                                                            <span className='text-lg'>You've applied</span>
                                                            <span className='flex items-center gap-1'>
                                                                <EditIcon className='h-4' /> (Check Your Status)
                                                            </span>
                                                            </span>
                                                        ) : (
                                                            <span className='flex flex-col items-center gap-x-2 text-lg'>
                                                            Apply Now
                                                            </span>
                                                        )}
                                                </Button>
                                    </div>
                                        {/* Second */}
                                    <div className=' flex flex-col gap-y-2 mt-4 border-t-[1px] border-gray-300 pt-4'>
                                                <div className=' flex gap-x-4 '> 
                                                    <div className=' bg-gray-200 p-3 rounded-lg'>
                                                            <MdGroups2  className=' h-6 w-6  ' />
                                                    </div>
                                                    <div className=' flex flex-col '>
                                                        <span className=' text-gray-500 text-sm '>Applied</span>
                                                        <span>{singleJob?.applications?.length}</span>
                                                    </div>
                                                </div>

                                                <div className=' flex gap-x-4 '> 
                                                    <div className=' bg-gray-200 p-3 rounded-lg'>
                                                            <Clock  className=' h-6 w-6  ' />
                                                    </div>
                                                    <div className=' flex flex-col '>
                                                        <span className=' text-gray-500 text-sm '>Application Deadline</span>
                                                        <span>{text +" days left"}</span>
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                                 {/* Eligibility */}
                                <div className=' flex flex-col p-2 px-4 border-2 border-gray-100 rounded-lg bg-white   '>                                                
                                                <div className=' flex flex-col gap-x-4 '> 
                                                    <span className=' '>
                                                            Eligibility
                                                    </span>
                                                    <div className="flex flex-col">
                                                        {
                                                            singleJob?.eligibility?.length > 0 ? (
                                                                        <ul className="text-gray-500 text-sm list-disc list-inside flex flex-wrap gap-x-4 gap-y-1">
                                                                                    {
                                                                                        singleJob?.eligibility.map((eligibility, index) => (
                                                                                        <li key={index}>{eligibility}</li>
                                                                                        ))
                                                                                    }  
                                                                       </ul>
                                                            ) :
                                                            (
                                                                <ul className="text-gray-500 text-sm list-disc list-inside flex flex-wrap gap-x-4 gap-y-1">
                                                                        <li>Engineering Students</li>
                                                                        <li>Undergraduate</li>
                                                                        <li>Postgraduate</li>
                                                            </ul>
                                                            )

                                                        }
                                                            
                                                    </div>
                                                </div>
                                </div>

                                {/*  */}
                                <div className='   h-80  relative shadow-sm  shadow-gray-300 rounded-lg  pb-2' >
                                     <img src= {jobdescImg}  alt='Job Image' className=' h-full w-full object-fill '/>
                                </div>

                             </div>

                           {/* job Details */}
                            <div className=' -ml-4 flex flex-col gap-y-3 relative mt-10  bg-white shadow-lg shadow-gray-300   py-4 rounded-lg'>
                                    <div className=' h-[28px] w-[6px] bg-green-600 absolute  rounded-br-xl   rounded-tr-xl   '></div>
                                    <div className=' flex flex-col gap-y-4 px-6'>
                                            <h1 className=' text-xl font-semibold  opacity-80 '> {singleJob?.jobType } Details</h1>
                                                <div>
                                                    <div className=' opacity-80 text-[15px] font-medium'> {singleJob?.description} </div>
                                                    {
                                                        singleJob?.detailedDescription?.length > 0 ? (
                                                            <>
                                                               {
                                                                singleJob?.detailedDescription.map((detail ,indx)=>(
                                                                    <div className=' mt-4 '>
                                                                                    <span className=' opacity-80 text-[15px] font-medium mt-4 '>{detail.heading} : </span>
                                                                                    <ul className='text-gray-500 text-[14.5px] list-disc list-inside '>
                                                                                        {
                                                                                            detail?.points?.length === 0 ? <li>Not {detail.heading} anything</li> : 
                                                                                            detail?.points?.map((item)=>(
                                                                                                <li>{item}</li>
                                                                                            ))
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                ))
                                                               }
                                                            </>
                                                        ) : 
                                                        (
                                                            <>
                                                                        <div className='  opacity-80 text-[15px] font-medium mt-4'>Get hands-on experience in web development with Vortec's internship program!</div>
                                                                                <div className=' mt-4 '>
                                                                                    <span className=' opacity-80 text-[15px] font-medium mt-4 '>Requirements : </span>
                                                                                    <ul className='text-gray-500 text-[14.5px] list-disc list-inside '>
                                                                                        {
                                                                                            singleJob?.requirements?.length === 0 ? <li>Not requirement anything</li> : 
                                                                                            singleJob?.requirements.map((requirement)=>(
                                                                                                <li>{requirement}</li>
                                                                                            ))
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                                <div className=' mt-4 '>
                                                                                    <span className=' opacity-80 text-[15px] font-medium mt-4 '>Perks : </span>
                                                                                    <ul className='text-gray-500 text-[14.5px] list-disc list-inside '>
                                                                                        {
                                                                                            singleJob?.requirements?.length === 0 ? <li>NaN</li> : 
                                                                                            ["Receive mentorship from experienced developers.","Earn a competitive stipend.","Receive a certificate of completion and a letter of recommendation.","Gained valuable work experience in a fast-paced environment."].map((requirement)=>(
                                                                                                <li>{requirement}</li>
                                                                                            ))
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                    

                                                    <div className=' mt-4 '>
                                                         <span className=' opacity-80 text-[15px] font-medium mt-4 '>Location : </span>
                                                         <ul className='text-gray-500 text-[14.5px] list-disc list-inside '>
                                                             {
                                                                 
                                                                    <li>{singleJob?.Work_Type}</li>
                                                             
                                                             }
                                                         </ul>
                                                    </div>
                                                </div>
                                    </div>
                                    
                            </div>

                             {/* Contact for Org */}
                            <div className=' -ml-4 flex flex-col gap-y-3 relative   bg-white shadow-lg shadow-gray-300   py-4 rounded-lg'>
                                    <div className=' h-[30%] w-[6px] bg-green-600 absolute  rounded-br-xl   rounded-tr-xl   '></div>
                                    <div className=' flex flex-col gap-y-4 px-6'>
                                            <h1 className=' text-xl font-semibold  opacity-80 '> Contact for organisers</h1>
                                                <div>
                                                    <div className=' opacity-80 text-[14px] font-medium'>{ singleJob?.contact ? singleJob?.contact : singleJob?.company?.userId?.email} </div>
                                                </div>
                                    </div> 
                            </div>

                            <div className=' -ml-4 flex flex-col gap-y-3 relative   bg-white shadow-lg shadow-gray-300     py-4 rounded-lg'>
                                    <div className=' h-[30px] w-[6px] bg-green-600 absolute  rounded-br-xl   rounded-tr-xl   '></div>
                                    <div className=' flex flex-col gap-y-4  px-2 xs:px-6'>
                                            <h1 className=' text-xl font-semibold  opacity-80 pl-2 xs:pl-0 '>Additional Information</h1>
                                                <div className=' grid lg:grid-cols-2 grid-rows-2 gap-x-4 gap-y-2'>
                                                    {/* First Calrd */}
                                                    <div className='   flex  items-center gap-x-2 justify-between  pt-4 border-[1.5px] border-gray-300 rounded-lg '> 
                                                        <div className=' flex flex-col gap-y-2 pl-4'>
                                                            <span className='  font-semibold text-gray-700 text-lg'>{singleJob?.jobType} Duration</span>
                                                            <span className='font-semibold text-gray-700  text-[15px] '>{singleJob?.duration}</span>
                                                        </div>
                                                        <div className='h-32 w-42'>
                                                            <img src={calender} alt="Duration" className='  h-full w-full object-fill' />
                                                        </div>
                                                    </div>
                                                        {/* Second Card */}
                                                        <div className=' flex items-center gap-x-2 justify-between  pt-4 border-[1.5px] border-gray-300 rounded-lg '> 
                                                        <div className=' flex flex-col gap-y-2 pl-4'>
                                                            <span className='  font-semibold text-gray-700 text-lg'>Stipend</span>
                                                            <span className='font-semibold text-gray-700  text-[15px] '>{formatSalaryToINR(singleJob.salary)}{singleJob?.jobType === "Internship" ?   "/month" : ""} </span>
                                                        </div>
                                                        <div className='h-32 w-42'>
                                                            <img src={stipend} alt="Duration" className='  h-full w-full object-fill' />
                                                        </div>
                                                    </div>

                                                        {/* Third Card */}  
                                                        <div className=' flex items-center gap-x-2 justify-between  pt-4  border-[1.5px] border-gray-300 rounded-lg '> 
                                                                <div className=' flex flex-col   pl-4'>
                                                                    <span className='  font-semibold text-gray-700 text-lg'> {singleJob?.jobType} Type/Timing </span>               
                                                                    <span className='font-semibold text-gray-700  text-[15px] mt- '>{singleJob?.jobType} Type : <span className='  text-gray-600   text-[14px] '>{singleJob?.Work_Type}</span></span>
                                                                    <span className='font-semibold text-gray-700  text-[15px] '>{singleJob?.jobType} Timing : <span className='  text-gray-600   text-[14px]  '>Dynamic</span></span>
                                                                </div>
                                                                <div className='h-32 w-36'>
                                                                    <img src={internshipTiming} alt="Duration" className='  h-full w-full object-fill' />
                                                                </div>
                                                    </div>

                                                        {/* Fourth Card */}
                                                    <div className=' flex items-center gap-x-2 justify-between  pt-4  border-[1.5px] border-gray-300 rounded-lg '> 
                                                                <div className=' flex flex-col gap-y-2 pl-4'>
                                                                    <span className='  font-semibold text-gray-700 text-lg'> Working Details</span>               
                                                                    <span className='font-semibold text-gray-700  text-[15px] '>Working Days : <span className='  text-gray-600   text-[14px] '>{singleJob?.workingDays ? singleJob?.workingDays +" Days" : "7 Days"}</span></span>
                                                                </div>
                                                                <div className='h-32 w-36'>
                                                                    <img src={workingDetails} alt="Duration" className='  h-full w-full object-fill' />
                                                                </div>
                                                    </div>

                                                    
                                                        {/* Fifth Card */}
                                                        <div className=' flex items-center gap-x-2 justify-between  pt-4  border-[1.5px] border-gray-300 rounded-lg '> 
                                                                <div className=' flex flex-col gap-y- pl-4'>
                                                                    <span className='  font-semibold text-gray-700 text-lg pb-2'> Perks</span>   
                                                                                
                                                                    <span className='font-semibold text-gray-500  text-[14px] '>Job Offer </span>
                                                                    <span className='font-semibold text-gray-500  text-[14px] '>Letter of Recomandation </span>
                                                                    <span className='font-semibold text-gray-500  text-[14px] pb-3 '>Flexible hour </span>

                                                                </div>
                                                                <div className='h-32 w-36'>
                                                                    <img src={Perks} alt="Duration" className='  h-full w-full object-fill' />
                                                                </div>
                                                    </div>
                                                </div>
                                    </div> 
                            </div>                    
                        </div>
{/* Right Card */}
                        <div className=' hidden md:!flex w-full md:w-[480px] z-10     flex-col    mx-auto   gap-y-3  sticky top-0 h-screen overflow-y-hidden  duration-200  '>
                                <div className='flex flex-col p-2  md:px-4 border-2 border-gray-100 rounded-lg bg-white     mt-10'>
                                    {/* First  */}
                                    <div className=' flex flex-col gap-y-2  '>
                                                {/* Name , Elegible button */}
                                                <div className=' flex  items-center justify-between gap-x-2'> 
                                                        <div className=' flex flex-col '> 
                                                            <span className=''>{user?.fullname}</span>
                                                            <span className=' text-[13px] text-gray-600'>{user?.email}</span>
                                                        </div>
                                                        <div className=' bg-green-700 flex items-center gap-x-1 text-white rounded-sm px-2 py-1'>
                                                            <Check className=' h-4 w-4' />
                                                            <span className=' text-[13px]'>Eligible</span>
                                                        </div>
                                                </div>

                                                {/* Share */}
                                                <div className=' flex  items-center justify-between gap-x-2 my-2'> 
                                                        <div className=' flex   items-center gap-x-2'> 
                                                            {
                                                                 isActive ? ( 
                                                                    <FaHeart onClick={()=>{setIsActive((state)=>!state) ; toast.error(`This ${singleJob?.jobType} is removed from WatchList`) }} className={` ${isActive && "text-green-700"  } h-5 w-5  cursor-pointer   `} />

                                                                 ) : (
                                                                    <Heart onClick={()=>{setIsActive((state)=>!state) ;toast.success(`This ${singleJob?.jobType} is added ❤️ to WatchList`) }} className={`  h-5 w-5  text-gray-500  cursor-pointer  hover:text-gray-400 `} />
                                                                 )
                                                            }
                                                            <Calendar className=' h-5 w-5 text-gray-500 cursor-pointer  ' />
                                                        </div>
                                                        <buttom onClick = {handleShare}  className='     hover:bg-slate-100 duration-200 cursor-pointer  flex items-center gap-x-1 text-gray-700 rounded-lg px-4 py-2 border-2 border-gray-300'>
                                                            <IoIosShareAlt className=' text-xl'/>
                                                            <span className=' text-[14px]'>Share</span>
                                                        </buttom>
                                                </div>

                                                {/* Applied Button */}
                                                <Button
                                                        onClick={
                                                            status === 'closed'
                                                            ? undefined // disables navigation or action
                                                            : isApplied
                                                                ? () => navigate("/profile")
                                                                : applyJobHandler
                                                        }
                                                          // disables hover, click, and changes cursor
                                                        className={`
                                                            py-7 z-[100] duration-200 rounded-lg 
                                                            ${status === 'closed' 
                                                            ? 'bg-gray-800 cursor-not-allowed ' 
                                                            : isApplied 
                                                                ? 'bg-green-700 hover:bg-green-600' 
                                                                : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                                                            }
                                                        `}
                                                        >
                                                        {status === 'closed' ? (
                                                            <span className='flex flex-col items-center gap-x-2 text-lg text-white'>
                                                            Application Deadline Over
                                                            </span>
                                                        ) : isApplied ? (
                                                            <span className='flex flex-col items-center gap-x-2'>
                                                            <span className='text-lg'>You've applied</span>
                                                            <span className='flex items-center gap-1'>
                                                                <EditIcon className='h-4' /> (Check Your Status)
                                                            </span>
                                                            </span>
                                                        ) : (
                                                            <span className='flex flex-col items-center gap-x-2 text-lg'>
                                                            Apply Now
                                                            </span>
                                                        )}
                                                </Button>

                                    </div>
                                        {/* Second */}
                                    <div className=' flex flex-col gap-y-2 mt-4 border-t-[1px] border-gray-300 pt-4'>
                                                <div className=' flex gap-x-4 '> 
                                                    <div className=' bg-gray-200 p-3 rounded-lg'>
                                                            <MdGroups2  className=' h-6 w-6  ' />
                                                    </div>
                                                    <div className=' flex flex-col '>
                                                        <span className=' text-gray-500 text-sm '>Applied</span>
                                                        <span>{singleJob?.applications?.length}</span>
                                                    </div>
                                                </div>

                                                <div className=' flex gap-x-4 '> 
                                                    <div className=' bg-gray-200 p-3 rounded-lg'>
                                                            <Clock  className=' h-6 w-6  ' />
                                                    </div>
                                                    <div className=' flex flex-col '>
                                                        <span className=' text-gray-500 text-sm '>Application Deadline</span>
                                                        <span>{text +" days left"}</span>
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                                 {/*  */}
                                <div className=' flex flex-col p-2 px-4 border-2 border-gray-100 rounded-lg bg-white   '>
                                                
                                                <div className=' flex flex-col gap-x-4 '> 
                                                    <span className=' '>
                                                            Eligibility
                                                    </span>
                                                    <div className="flex flex-col">
                                                        {
                                                            singleJob?.eligibility?.length > 0 ? (
                                                                        <ul className="text-gray-500 text-sm list-disc list-inside flex flex-wrap gap-x-4 gap-y-1">
                                                                                    {
                                                                                        singleJob?.eligibility.map((eligibility, index) => (
                                                                                        <li key={index}>{eligibility}</li>
                                                                                        ))
                                                                                    }  
                                                                       </ul>
                                                            ) :
                                                            (
                                                                <ul className="text-gray-500 text-sm list-disc list-inside flex flex-wrap gap-x-4 gap-y-1">
                                                                        <li>Engineering Students</li>
                                                                        <li>Undergraduate</li>
                                                                        <li>Postgraduate</li>
                                                            </ul>
                                                            )

                                                        }
                                                            
                                                    </div>
                                                </div>
                                </div>

                                {/*  */}
                                <div className='   h-80  relative shadow-sm  shadow-gray-300 rounded-lg  pb-2' >
                                     <img src= {jobdescImg}  alt='Job Image' className=' h-full w-full object-fill '/>
                                </div>

                        </div>
                </div>
 
                <div>
                     <RatingAndReview />
                </div>
                  <div className=' mt-10'>
                    <JobDescFooter/>
                  </div>
                  {
                   isShowRateModal && (
                        <div className="fixed inset-0 z-[1000] bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
                            <RateAndReviewSystem setisShowRateModal={setisShowRateModal} />
                            <button
                                onClick={() => setisShowRateModal(false)} // make sure you have this function
                                className="absolute top-3 right-5 text-gray-500 hover:text-black text-4xl"
                            >
                                &times;
                            </button>
                            </div>
                        </div>
                  )}

        </div>
        </>
    )
}

export default JobDescription
 