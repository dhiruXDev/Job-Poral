import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
 
// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-5 md:my-8 px-4 md:px-6 lg:px-8'>
                <h1 className='font-bold text-lg md:text-xl my-6 md:my-10'>
                    Search Results ({allJobs.length})
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>
                {allJobs.length === 0 && (
                    <div className='text-center py-10'>
                        <p className='text-gray-500'>No jobs found. Try adjusting your search criteria.</p>
                    </div>
                )}
            </div>

            <Footer/>
        </div>
    )
}

export default Browse