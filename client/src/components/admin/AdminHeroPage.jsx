

import React, { useEffect, useState } from 'react'

import { Search, Briefcase, MapPin, ArrowRight, Clock, Heart, Star, Filter } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Building, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { User, } from 'lucide-react';
import { JobDesc } from '@/assets/JobDesc'
import { PostJobImg } from '@/assets/PostJobImg'
import { HireImg } from '@/assets/HireImg'
import { setSearchCompanyByText } from '@/redux/companySlice'
import imgs from "@/assets/AdminHeroSectiomImg.png"
const AdminHeroSection = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
     const { user } = useSelector((state) => state.auth)

    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");

    //  useEffect(()=>{
    //      console.log("Company" , companyName);
    //      dispatch(setSearchCompanyByText(companyName));
    //  },[companyName]);


    const [isVisible, setIsVisible] = useState(false);

    const handlePostJob = () => {
        dispatch(setSearchCompanyByText(companyName));
       // navigate("/admin/companies");
        navigate(`/admin/companies?search=${companyName}`);

    };


    // Example industries for the dropdown
    const industries = [
        "Technology", "Healthcare", "Finance", "Education",
        "Manufacturing", "Retail", "Marketing", "Hospitality"
    ];
    const steps = [
        {
            number: 1,
            title: "Register",
            description: "Get started by creating your account",
            icon: <User className="text-white" size={28} />,
            color: "bg-blue-600",
            src: <JobDesc />
        },
        {
            number: 2,
            title: "Post",
            description: "Post internships for any profile and location",
            icon: <Briefcase className="text-white" size={28} />,
            color: "bg-blue-600",
            src: <PostJobImg />
        },
        {
            number: 3,
            title: "Hire",
            description: "Screen and hire using our world class ATS",
            icon: <CheckCircle className="text-white" size={28} />,
            color: "bg-green-500",
            src: <HireImg />
        }
    ];
    useEffect(() => {
        setIsVisible(true);
    }, []);


    //bg-gradient-to-r from-purple-50 to-indigo-50
    return (
        <div id="hero" className=" ">
            {
                user?.role === 'Recruiter' && (
                    <div className="relative min-h-screen px-4 md:px-12 lg:px-32">
                        {/* Background with light color */}
                        <div className="absolute inset-0 z-0">
                            <div className="w-full h-full  bg-gradient-to-r from-sky-50 to-indigo-50"></div>
                        </div>

                        <div className="  mx-auto px-4 relative z-10    pt-10 pb-32">
                            <div className="flex flex-col md:flex-row   gap-x-12">
                                {/* Left content */}

                                <div className="flex-1">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                                        <Star className="h-4 w-4 mr-2" fill="currentColor" />
                                         Trusted by 1,000+ companies
                                    </span>

                                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                        Post jobs and <span className="text-indigo-600">hire top talent</span> for your company
                                    </h1>

                                    <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                                        Create your employer account, post jobs, and connect with qualified candidates ready to contribute to your company's success.
                                    </p>

                                    {/* Company Account Creation Box */}
                                    <div className="bg-white p-1 rounded-xl shadow-lg flex flex-col md:flex-row items-stretch border border-gray-100">
                                        <div className="flex-1 flex items-center pl-4">
                                            <Building className="h-5 w-5 text-gray-400 mr-3" />
                                            <input
                                                type="text"
                                                placeholder="Your company name"
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handlePostJob();
                                                    }
                                                }}
                                                className="w-full outline-none text-gray-800 placeholder-gray-400 py-3"
                                            />
                                        </div>

                                        <div className="hidden md:flex items-center mx-4">
                                            <div className="h-8 w-px bg-gray-200"></div>
                                        </div>

                                        <div className="flex items-center gap-2 pl-2 pr-4 mt-2 md:mt-0">
                                            <Briefcase className="h-5 w-5 text-gray-400" />

                                            <select
                                                className="outline-none text-gray-600 bg-transparent pr-8 py-3"
                                                onChange={(e) => setIndustry(e.target.value)}
                                            >
                                                <option value="">Select Industry</option>
                                                {industries.map((ind, index) => (
                                                    <option key={index} value={ind}>{ind}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            onClick={handlePostJob}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white mt-2 md:mt-1 px-4 md:px-8 py-2 md:py-3 rounded-lg text-lg font-medium"
                                        >
                                            Get Started
                                        </button>
                                    </div>

                                    {/* Benefits */}
                                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <CheckCircle className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Easy Job Posting</h3>
                                                <p className="text-gray-600">Create and manage job listings with our simple interface</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <Users className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Quality Candidates</h3>
                                                <p className="text-gray-600">Connect with pre-screened, qualified applicants</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <TrendingUp className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Hiring Analytics</h3>
                                                <p className="text-gray-600">Track application metrics and optimize your hiring</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Employer Stats */}
                                    <div className="flex flex-wrap gap-8 mt-12">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-indigo-100 rounded-full">
                                                <Building className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-2xl text-gray-900">5,000+</p>
                                                <p className="text-sm text-gray-600">Company Employers</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-indigo-100 rounded-full">
                                                <Briefcase className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-2xl text-gray-900">12,500+</p>
                                                <p className="text-sm text-gray-600">Active Job Listings</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-indigo-100 rounded-full">
                                                <Users className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-2xl text-gray-900">48hr</p>
                                                <p className="text-sm text-gray-600">Avg. Hiring Time</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Image - Custom SVG Illustration with Animation */}
                                <div className="flex-1 flex justify-center md:-mr-20  ">
                                    <div className="relative w-full">
                                        {/* SVG illustration for employers/recruiters */}
                                        <svg
                                            className="w-full h-auto"
                                            viewBox="0 0 600 500"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {/* Background circle */}
                                            <circle cx="380" cy="240" r="220" fill="#EEF2FF" className="animate-pulse" style={{ animationDuration: '8s' }} />

                                            {/* Small decorative dots */}
                                            <g className="animate-pulse" style={{ animationDuration: '2s' }}>
                                                <circle cx="100" cy="110" r="5" fill="#A5B4FC" />
                                                <circle cx="120" cy="100" r="3" fill="#A5B4FC" />
                                                <circle cx="110" cy="90" r="4" fill="#A5B4FC" />
                                                <circle cx="500" cy="130" r="6" fill="#A5B4FC" />
                                                <circle cx="520" cy="110" r="4" fill="#A5B4FC" />
                                                <circle cx="90" cy="450" r="5" fill="#A5B4FC" />
                                                <circle cx="70" cy="470" r="3" fill="#A5B4FC" />
                                                <circle cx="60" cy="440" r="4" fill="#A5B4FC" />
                                                <circle cx="480" cy="450" r="5" fill="#A5B4FC" />
                                                <circle cx="500" cy="470" r="3" fill="#A5B4FC" />
                                            </g>
                                                                                    

                                            {/* Decorative elements */}
                                            <g className="animate-bounce" style={{ animationDuration: '6s', transformOrigin: '90px 250px' }}>
                                                <path d="M60,210 C40,170 60,120 110,140 C160,160 120,220 90,250 C80,260 65,230 60,210Z" fill="#818CF8" />
                                                <path d="M80,210 C85,190 90,180 95,190 C100,200 90,240 85,245" fill="none" stroke="#4F46E5" strokeWidth="2" />
                                            </g>
                                             {/* Persong */}
                                          <image height="600" width="600" href={imgs} />
                                            {/* Job posting interface mockup */}
                                            <g className="animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>
                                                <rect x="330" y="160" width="140" height="120" rx="6" fill="white" stroke="#4F46E5" strokeWidth="1" />
                                                <rect x="340" y="170" width="120" height="10" rx="2" fill="#4F46E5" opacity="0.7" />
                                                <rect x="340" y="190" width="80" height="6" rx="2" fill="#4F46E5" opacity="0.4" />
                                                <rect x="340" y="205" width="90" height="6" rx="2" fill="#4F46E5" opacity="0.4" />
                                                <rect x="340" y="220" width="70" height="6" rx="2" fill="#4F46E5" opacity="0.4" />
                                                <rect x="340" y="245" width="120" height="25" rx="4" fill="#C7D2FE" />
                                                <text x="380" y="262" fill="#4F46E5" fontSize="12" textAnchor="middle" fontWeight="bold">Post Job</text>
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
            {/* step for hiring */}
            <div className="w-full     py-16">
                <div className="max-w-6xl mx-auto px-4 ">
                    <h2
                        className={` text-3xl  md:text-5xl font-bold text-center mb-16 transition-all duration-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
                    >
                        Hire interns in 3 simple steps
                    </h2>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 ">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className={`flex hover:scale-105  flex-col items-center w-full md:w-1/3 bg-white rounded-lg p-6 shadow-lg  transition-all duration-500 delay-${index * 2}00 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{
                                    transitionDelay: `${index * 200}ms`
                                }}
                            >
                                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                                    {step.icon}
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className="text-2xl font-bold mr-2">{step.number}.</span>
                                    <h3 className="text-2xl font-bold">{step.title}</h3>
                                </div>

                                <p className="text-gray-600 text-center mb-6">{step.description}</p>

                                <div className="w-full h-56   rounded-lg overflow-hidden relative mb-4">
                                    {step.src}
                                </div>

                            </div>
                        ))}
                    </div>


                    <div
                        className={`flex justify-end mt-8 transition-all duration-500 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <ArrowRight onClick={() => navigate("/admin/jobs")} className="text-blue-600 hover:text-blue-400 cursor-pointer " size={32} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminHeroSection
