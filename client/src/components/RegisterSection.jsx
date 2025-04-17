import React from 'react';
import bgImage from "../assets/bgimg.jpg"; // Import the image
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button'
import { useSelector } from 'react-redux';
export const RegisterSection = () => {
    const navigate = useNavigate();
    const{user} =useSelector((state)=>state.auth);
  return (
    <>  
    {
        user?.role ==="Recruiter" ? (
            <div>
                {/* Call to Action for Recruiters */}
                <div className="bg-gradient-to-r from-indigo-100 to-sky-100 py-20">
                    <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Hire Top Talent Faster and Smarter
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                        Connect with skilled candidates actively seeking internships and full-time roles. Post your openings and let the right talent come to you.
                    </p>
                    <div className="flex gap-4 flex-col sm:flex-row justify-center">
                        <Button 
                        className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-transform duration-300"
                        onClick={() => { user ? navigate("/admin/companies") : navigate("/signup") }}
                        >
                        {user ? "Register Your Company" : "Get Started"}
                        </Button>
                        <Button 
                        variant="outline" 
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-transform duration-300"
                        onClick={() => navigate("/admin/jobs")}
                        >
                        Post a Job
                        </Button>
                    </div>
                    </div>
                </div>
            </div>

        ) :(
            <div>
                    {/* Call to Action For Students */}
                    <div className="bg-gradient-to-r from-indigo-100 to-sky-100 py-20">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                                Ready to find your dream job or Internship?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-base md:text-xl">
                                Create your profile now and get matched with the best opportunities from top companies worldwide.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-transform duration-300"
                                    onClick={() =>{ user ?  navigate("/internships") : navigate("/signup")   } }
                                >
                                {
                                    user ? "Browse Internships" :"Sign Up"
                                } 
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => navigate("/browse")}
                                >
                                    Browse Jobs
                                </Button>
                            </div>
                        </div>
                    </div>
            </div>

        )
    }
    
    </>
 
  );
};

