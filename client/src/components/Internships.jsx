import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Internships = () => {
    const { allInternships } = useSelector(store => store.job);
    const [filterinternship, setfilterinternship] = useState(allInternships);
    const pathnames = useLocation();
    const pathname = pathnames.pathname.split("/")[1];
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        profile: [],
        location: [],
        workType: [],
        salary: null,
    });

    const extractMinSalary = (salaryString) => {
        if (!salaryString) return 0;
        const parts = salaryString.split("-").map((s) => parseInt(s.replace(/\D/g, "")));
        return parts.length > 1 ? Math.min(...parts) : parts[0] || 0;
    };
    
    useEffect(() => {
        const baseList = allInternships;
        const filtered = baseList.filter((item) => {
            const matchProfile = filters.profile.length > 0 ? filters.profile.includes(item.title) : true;
            const matchLocation = filters.location.length > 0 ? filters.location.includes(item.location) : true;
            const matchWorkType = filters.workType.length > 0 ? filters.workType.includes(item.Work_Type) : true;
            const matchSalary = filters.salary ? extractMinSalary(item.salary) <= filters.salary : true;
        
            return matchProfile && matchLocation && matchWorkType && matchSalary;
        });
    
        setfilterinternship(filtered);
    }, [filters, allInternships]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-2 sm:mt-5 px-3 sm:px-4'>
                {/* Mobile filter toggle */}
                <div className="lg:hidden mb-4 flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Internships</h2>
                    <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        
                        {
                            showFilters ? <span className='text-xs text-red-700 font-semibold flex items-center gap-x-2 '><X size={18} /> Close </span> : <span className='text-xs text-black flex items-center gap-x-2'> <Menu size={18} /> <span> Show Filters </span> </span>

                        }
                    </Button>
                </div>

                <div className='flex flex-col lg:flex-row gap-4'>
                    {/* Filter sidebar */}
                    <div className={`${showFilters ? 'block' : 'hidden'} lg:!block w-full lg:w-[25%] xl:w-[20%]`}>
 
                        <FilterCard setFilters={setFilters} />
                    </div>

                    {/* Main content */}
                    {filterinternship.length <= 0 ? (
                        <div className="flex-1 flex justify-center items-center min-h-[50vh]">
                            <span className='text-lg'>No internships found!</span>
                        </div>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4'>
                                {filterinternship.map((internship) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        key={internship?._id || internship?.internship}
                                    >
                                        <Job job={internship} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Internships;
