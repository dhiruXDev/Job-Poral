 

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
 import { Search, Briefcase, MapPin, ArrowRight, Clock, Heart, Star, Filter } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
 
import y from './Cartoo-Photoroom.png'
 
import AdminHeroSection from './admin/AdminHeroPage'
 
const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [mergedFilters,setMergedFilters] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{allJobs,allInternships ,searchedQuery} = useSelector((state) => state.job)
   const{user} = useSelector((state) => state.auth)
     const searchJobHandler = (value) => {
        // console.log("query",query)
        // dispatch(setSearchedQuery(query))
        // navigate("/browse")

        setQuery(value); // still updates the UI, not relied upon here
        if(query){
            dispatch(setSearchedQuery(query));
        }
        else{
            const query = value || query;
            dispatch(setSearchedQuery(query));
        }  
        navigate("/browse");
       
    }


      const popularOptions = ["Work from home", "In Office", "Part Time"];
    
     useEffect(()=>{
                let newhai = [...allJobs,...allInternships] ; // mergeing both 
                let locations = newhai.map((item)=>item.location); // extracting location from both
                let uniqueLocations = [...new Set(locations)]; // Optional: remove duplicates
                setMergedFilters(uniqueLocations);
     },[allJobs,allInternships])

 
    return (
        <div  id="hero" className=" ">
             {
                user?.role === 'Recruiter' ? (
                     <AdminHeroSection />
                ) : 
                (
                    <div className="relative min-h-screen px-1  md:px-5 lg:px-32">
                    {/* Background with light color */}
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full bg-gradient-to-r from-sky-50 to-indigo-50"></div>
                    </div>
                    
                    <div className="  mx-auto px-4 relative z-10 pt-20 pb-32 ">
                        <div className="flex flex-col lg:flex-row   gap-x-12">
                            {/* Left content */}
                            <div className="flex-1">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                                    <Star className="h-4 w-4 mr-2" fill="currentColor" />
                                    Over 5,000 jobs available
                                </span>
                                
                                <h1 className=" text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Find the job that matches your <span className="text-indigo-600">ambition</span>
                                </h1>
                                
                                <p className=" text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl">
                                    Connect with top employers worldwide. Your next career opportunity is just a search away.
                                </p>
                                
                                {/* Search Box */}
                                <div className="bg-white p-2 rounded-xl shadow-lg flex md:flex-row flex-col items-stretch border border-gray-100">
                                    <div className="flex-1 flex items-center pl-4">
                                        <Search className="h-5 w-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="Job title, keywords, or company"
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    searchJobHandler();
                                                }
                                            }}
                                            className="w-full outline-none text-gray-800 placeholder-gray-400 py-3"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center mx-4">
                                        <div className="h-8 w-px bg-gray-200"></div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 pl-2 pr-4">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                         
                                        <select  className="outline-none text-gray-600 bg-transparent pr-8 py-3" onChange={(e) =>setQuery(e.target.value) }>
                                            <option value={""}>Any Location</option>
                                            {
                                                mergedFilters?.map((filter, index) => (
                                                    <option key={index} value={filter}>{filter}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    
                                    <Button 
                                        onClick={searchJobHandler} 
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white mt-1 px-8 py-4 rounded-lg text-lg font-medium"
                                    >
                                        Search
                                    </Button>
                                </div>
                                
                                {/* Popular Searches */}
                                <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 text-gray-600">
                                        <span>Popular:</span>
                                        <div className="flex md:gap-2  xs:flex-col ">
                                        {popularOptions.map((option, index) => (
                                            <Button
                                            key={index}
                                            onClick={() =>  searchJobHandler(option) } 
                                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full text-sm py-1"
                                            variant="ghost"
                                            >
                                            {option}
                                            </Button>
                                        ))}
                                 </div>
                            </div>
                                
                            </div>
                            
                            {/* Right Image - Custom SVG Illustration with Animation */}
                            <div className="flex-1 flex justify-center md:-mr-20  md:p-0   ">
                                <div className="relative lg:w-full  w-full md:w-[70%] mt-10  ">
                                    {/* New SVG illustration based on reference image */}
                                    <svg 
                                        className="w-full h-auto" 
                                        viewBox="0 0 600 500" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        {/* Background circle */}
                                        <circle cx="380" cy="240" r="220" fill="#EBF5FF" className="animate-pulse" style={{animationDuration: '8s'}} />
                                        
                                        {/* Small decorative dots */}
                                        <g className="animate-pulse  " style={{animationDuration: '2s'}}>
                                            <circle cx="100" cy="110" r="5" fill="#A4CAFE" />
                                            <circle cx="120" cy="100" r="3" fill="#A4CAFE" />
                                            <circle cx="110" cy="90" r="4" fill="#A4CAFE" />
                                            <circle cx="500" cy="130" r="6" fill="#A4CAFE" />
                                            <circle cx="520" cy="110" r="4" fill="#A4CAFE" />
                                            <circle cx="90" cy="450" r="5" fill="#A4CAFE" />
                                            <circle cx="70" cy="470" r="3" fill="#A4CAFE" />
                                            <circle cx="60" cy="440" r="4" fill="#A4CAFE" />
                                            <circle cx="480" cy="450" r="5" fill="#A4CAFE" />
                                            <circle cx="500" cy="470" r="3" fill="#A4CAFE" />
                                        </g>
                                        
                                        {/* Decorative leaf */}
                                        <g className="animate-bounce" style={{animationDuration: '6s', transformOrigin: '90px 250px'}}>
                                            <path d="M60,210 C40,170 60,120 110,140 C160,160 120,220 90,250 C80,260 65,230 60,210Z" fill="#60A5FA" />
                                            <path d="M80,210 C85,190 90,180 95,190 C100,200 90,240 85,245" fill="none" stroke="#1D4ED8" strokeWidth="2" />
                                        </g>
                                        {/* Small UI cards floating */}
                                        <g className="animate-bounce" style={{animationDuration: '7s', animationDelay: '1s'}}>
                                            <rect x="340" y="170" width="70" height="80" rx="6" fill="white" stroke="#3B82F6" strokeWidth="1" />
                                            <rect x="350" y="180" width="50" height="4" rx="2" fill="#3B82F6" opacity="0.7" />
                                            <rect x="350" y="190" width="30" height="4" rx="2" fill="#3B82F6" opacity="0.7" />
                                            <rect x="350" y="210" width="40" height="20" rx="2" fill="#E0E7FF" />
                                        </g>
                                        
                                        <g className="animate-bounce" style={{animationDuration: '8s', animationDelay: '0.5s'}}>
                                            <rect x="330" y="260" width="70" height="80" rx="6" fill="white" stroke="#3B82F6" strokeWidth="1" />
                                            <rect x="340" y="270" width="50" height="4" rx="2" fill="#3B82F6" opacity="0.7" />
                                            <rect x="340" y="280" width="30" height="4" rx="2" fill="#3B82F6" opacity="0.7" />
                                            <rect x="340" y="300" width="40" height="20" rx="2" fill="#E0E7FF" />
                                        </g>
    
                                        {/* Persong */}
                                        <image height="600" width="600" href={y} />
                                        
                                        {/* UI Elements behind the person */}
                                        <g className="animate-bounce " style={{animationDuration: '10s', animationDirection: 'alternate'}}>
                                            {/* Larger website mockup */}
                                            <rect x="160" y="140" width="120" height="180" rx="8" fill="white" stroke="#3B82F6" strokeWidth="2" />
                                            <rect x="160" y="140" width="120" height="20" rx="8" fill="#3B82F6" />
                                            <circle cx="210" cy="150" r="3" fill="white" />
                                            <circle cx="220" cy="150" r="3" fill="white" />
                                            <circle cx="230" cy="150" r="3" fill="white" />
                                            
                                            {/* Blue rectangle in mockup */}
                                            <rect x="170" y="170" width="100" height="60" rx="4" fill="#3B82F6" fillOpacity="0.3" />
                                            <path d="M235,190 C240,180 250,180 255,190 C260,200 270,200 275,190" stroke="white" strokeWidth="3" fill="none" />
                                            <circle cx="245" cy="190" r="8" fill="white" />
                                            
                                            {/* Text lines in mockup */}
                                            <rect x="170" y="240" width="100" height="6" rx="3" fill="#3B82F6" opacity="0.7" />
                                            <rect x="170" y="255" width="80" height="6" rx="3" fill="#3B82F6" opacity="0.7" />
                                            <rect x="170" y="270" width="90" height="6" rx="3" fill="#3B82F6" opacity="0.7" />
                                            <rect x="170" y="285" width="70" height="6" rx="3" fill="#3B82F6" opacity="0.7" />
                                            <rect x="170" y="300" width="60" height="6" rx="3" fill="#3B82F6" opacity="0.7" />
                                        </g>
    
                                        {/* Animated typing effect */}
                                        <g className="animate-pulse" style={{animationDuration: '1s'}}>
                                            <circle cx="405" cy="350" r="5" fill="#A5B4FC" />
                                        </g>
                                    </svg>
    
                                    
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    
                    {/* Subtle wave shape */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#FFFFFF">
                            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
                        </svg>
                    </div>
                    </div>
                )
             }


        </div>
    )
}

export default HeroSection
 