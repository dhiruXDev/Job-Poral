// import React from "react";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">
//       {/* Header */}
//       <header className="flex justify-between items-center px-10 py-6 shadow-md">
//         <div className="flex items-center space-x-2">
//           <img src="/logo.png" alt="Job Portal Logo" className="h-10 w-10" />
//           <h1 className="text-xl font-bold text-red-600">Portal</h1>
//         </div>
//         <nav className="space-x-6">
//           <a href="#features" className="hover:text-red-600 font-medium">Features</a>
//           <a href="#jobs" className="hover:text-red-600 font-medium">Jobs</a>
//           <a href="#about" className="hover:text-red-600 font-medium">About</a>
//           <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Login</button>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row justify-between items-center px-10 py-20 bg-gray-50">
//         <div className="md:w-1/2 space-y-6">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//             Build Your Career as an Engineer
//           </h2>
//           <p className="text-lg text-gray-600">
//             Discover internships, placements, and full-time opportunities crafted for engineering students and fresh graduates.
//           </p>
//           <div className="flex space-x-4">
//             <input
//               type="text"
//               placeholder="Search jobs..."
//               className="px-4 py-2 w-64 rounded border border-gray-300 focus:outline-none"
//             />
//             <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700">
//               Search
//             </button>
//           </div>
//         </div>
//         <img
//           src="/engineer-illustration.png"
//           alt="Engineering Career"
//           className="md:w-1/2 mt-10 md:mt-0"
//         />
//       </section>

//       {/* Job Categories */}
//       <section id="features" className="px-10 py-14 bg-white text-center">
//         <h3 className="text-2xl font-bold mb-6">Explore Job Categories</h3>
//         <div className="flex flex-wrap justify-center gap-4">
//           {[
//             "Software Engineering",
//             "Product Design",
//             "Data Science",
//             "Cybersecurity",
//             "AI & ML",
//             "Mechanical",
//             "Civil",
//             "Electronics"
//           ].map((category) => (
//             <button
//               key={category}
//               className="px-4 py-2 border border-red-500 text-red-600 rounded-full hover:bg-red-50"
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="px-10 py-6 bg-gray-100 text-center text-sm text-gray-600">
//         © 2025 Portal. Empowering Engineers for Tomorrow.
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;


// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Search, Briefcase, MapPin, TrendingUp } from 'lucide-react'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'
// import { useNavigate } from 'react-router-dom'

// const LandingPage = () => {
//     const [query, setQuery] = useState("")
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const searchJobHandler = () => {
//         dispatch(setSearchedQuery(query))
//         navigate("/browse")
//     }

//     const categories = [
//         { icon: <Briefcase className="h-4 w-4" />, text: "Tech" },
//         { icon: <MapPin className="h-4 w-4" />, text: "Remote" },
//         { icon: <TrendingUp className="h-4 w-4" />, text: "Marketing" }
//     ]

//     return (
//         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
//             <div className="container mx-auto px-4">
//                 <div className="flex flex-col md:flex-row items-center gap-12">
//                     {/* Left content */}
//                     <div className="flex-1 text-left">
//                         <span className="inline-block bg-purple-100 text-purple-800 font-medium text-sm px-4 py-1 rounded-lg mb-6">
//                             Find Your Career Path
//                         </span>
                        
//                         <h1 className="text-4xl md:text-6xl font-bold mb-6">
//                             Discover & Connect with <span className="text-purple-700">Top Employers</span>
//                         </h1>
                        
//                         <p className="text-gray-600 mb-8 text-lg">
//                             Join thousands who've found their dream careers through our platform.
//                             Personalized job matches delivered to qualified candidates.
//                         </p>

//                         <div className="bg-white p-2 rounded-xl shadow-lg mb-8">
//                             <div className="flex flex-col md:flex-row gap-2">
//                                 <div className="flex-1 relative">
//                                     <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                                     <input
//                                         type="text"
//                                         placeholder="Job title, keywords, or company"
//                                         onChange={(e) => setQuery(e.target.value)}
//                                         onKeyDown={(e) => {
//                                             if (e.key === "Enter") {
//                                                 searchJobHandler();
//                                             }
//                                         }}
//                                         className="pl-10 pr-4 py-3 rounded-lg w-full outline-none border border-gray-200"
//                                     />
//                                 </div>
//                                 <Button 
//                                     onClick={searchJobHandler} 
//                                     className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3"
//                                 >
//                                     Search Jobs
//                                 </Button>
//                             </div>
//                         </div>

//                         <div className="flex flex-wrap gap-3">
//                             <span className="text-sm text-gray-500 pt-1">Popular:</span>
//                             {categories.map((category, index) => (
//                                 <Button 
//                                     key={index}
//                                     variant="outline" 
//                                     className="flex items-center gap-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
//                                 >
//                                     {category.icon}
//                                     {category.text}
//                                 </Button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Right image */}
//                     <div className="flex-1 flex justify-center">
//                         <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
//                             <div className="absolute -top-3 -right-3 bg-purple-600 text-white rounded-full px-4 py-1 text-sm">
//                                 Featured Jobs
//                             </div>
                            
//                             {[1, 2, 3].map((job) => (
//                                 <div key={job} className="mb-4 p-4 border border-gray-100 rounded-lg hover:shadow-md cursor-pointer transition-all">
//                                     <div className="flex justify-between items-start mb-2">
//                                         <div className="bg-gray-100 w-10 h-10 rounded-md flex items-center justify-center">
//                                             <Briefcase className="h-5 w-5 text-purple-700" />
//                                         </div>
//                                         <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
//                                             New
//                                         </span>
//                                     </div>
//                                     <h3 className="font-medium">Senior Product Designer</h3>
//                                     <div className="text-sm text-gray-500 flex items-center gap-2">
//                                         <MapPin className="h-3 w-3" />
//                                         Remote, Worldwide
//                                     </div>
//                                 </div>
//                             ))}
                            
//                             <div className="text-center mt-2">
//                                 <Button 
//                                     variant="ghost" 
//                                     className="text-purple-700 hover:text-purple-800 text-sm"
//                                     onClick={() => navigate("/browse")}
//                                 >
//                                     View all jobs →
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LandingPage

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, MapPin, ChevronRight, TrendingUp, Star, Buildings, Code, Timer } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const [query, setQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")
    const [animatedCount, setAnimatedCount] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // For counter animation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (animatedCount < 10000) {
                setAnimatedCount(prev => Math.min(prev + 250, 10000))
            }
        }, 50)
        return () => clearTimeout(timer)
    }, [animatedCount])

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    const categories = [
        { name: "All", icon: <Star className="h-4 w-4" /> },
        { name: "Tech", icon: <Code className="h-4 w-4" /> },
        { name: "Remote", icon: <MapPin className="h-4 w-4" /> },
        { name: "Finance", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Part-time", icon: <Timer className="h-4 w-4" /> }
    ]

    const featuredJobs = [
        { title: "Senior Product Designer", company: "Airbnb", location: "Remote", badge: "New", color: "bg-purple-600" },
        { title: "Frontend Developer", company: "Google", location: "New York", badge: "Featured", color: "bg-blue-600" },
        { title: "Marketing Manager", company: "Tesla", location: "Remote", badge: "Urgent", color: "bg-red-600" }
    ]

    return (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            
            <div className="container mx-auto px-4 py-20 relative">
                {/* Stats bar */}
                <div className="flex justify-center gap-8 mb-12">
                    <div className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <Briefcase className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Job Offers</p>
                            <p className="font-bold text-lg">{animatedCount.toLocaleString()}+</p>
                        </div>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Buildings className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Companies</p>
                            <p className="font-bold text-lg">2,500+</p>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mb-12">
                    <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-800 font-medium text-sm inline-block mb-4">
                        Your Career Journey Starts Here
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
                        Find Your Dream Job Today
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Connect with top employers and discover opportunities that match your skills and ambitions.
                        Join thousands who've already found their perfect career fit.
                    </p>
                </div>

                {/* Search bar */}
                <div className="bg-white p-3 rounded-2xl shadow-lg mb-16 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        searchJobHandler();
                                    }
                                }}
                                className="pl-12 pr-4 py-3.5 rounded-xl w-full outline-none border border-gray-100 bg-gray-50 hover:bg-white focus:bg-white transition-colors focus:border-purple-200 focus:ring-2 focus:ring-purple-100"
                            />
                        </div>
                        <Button 
                            onClick={searchJobHandler} 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-6 rounded-xl font-medium"
                        >
                            Search Jobs
                        </Button>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-center">Explore by Category</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <Button 
                                key={category.name}
                                variant={activeCategory === category.name ? "default" : "outline"}
                                onClick={() => setActiveCategory(category.name)}
                                className={`
                                    flex items-center gap-2 rounded-xl px-6 py-3 
                                    ${activeCategory === category.name 
                                        ? "bg-purple-600 text-white shadow-md shadow-purple-200" 
                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                    }
                                `}
                            >
                                {category.icon}
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Featured Jobs */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Featured Opportunities</h2>
                        <Button 
                            variant="ghost" 
                            className="text-purple-700 hover:text-purple-800 flex items-center gap-1"
                            onClick={() => navigate("/browse")}
                        >
                            View all
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredJobs.map((job, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden cursor-pointer group"
                                onClick={() => navigate(`/job/${index}`)}
                            >
                                <div className={`h-2 ${job.color}`}></div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center">
                                            <Briefcase className="h-6 w-6 text-purple-700" />
                                        </div>
                                        <span className={`${job.color.replace('bg-', 'bg-').replace('600', '100')} ${job.color.replace('bg-', 'text-')} text-xs px-3 py-1 rounded-full`}>
                                            {job.badge}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-purple-700 transition-colors">{job.title}</h3>
                                    <p className="text-gray-600 mb-3">{job.company}</p>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm">{job.location}</span>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Posted 2 days ago</span>
                                        <Button 
                                            variant="ghost" 
                                            className="text-purple-700 hover:text-purple-800 p-0 text-sm font-medium"
                                        >
                                            Apply Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage