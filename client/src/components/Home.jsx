import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CompanySlider } from './CompanySlider'
import { StatsCounter } from './StatsCounter'
import { RegisterSection } from './RegisterSection'
import { setAllJobs ,setAllJobsTittle } from '@/redux/jobSlice'
import {setAllInternships} from '@/redux/jobSlice'
import axios from 'axios'
import { JOB_API_END_POINT, RATING_AND_REVIEW_API_END_POINT } from '@/utils/constant'
import { setAllRatingAndReview } from '@/redux/authSlice'
import RatingAndReview from './shared/RatingAndReview'
// import {LandingPage} from './xyz'

const Home = () => {
  //useGetAllJobs();
  const {user , allRatingAndReview} = useSelector(store => store.auth);
   const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);


useEffect(()=>{
  const fetchReviews = async () => {
    try {
      const response = await axios(`${RATING_AND_REVIEW_API_END_POINT}/get`);
      console.log("res",response.data.data);
 
      if (response.data.success) {
 
        dispatch(setAllRatingAndReview(response.data.data));
      }
     } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  fetchReviews();
},[])
 

  useEffect(()=>{
      const fetchallJobs= async()=>{
       try {
             const res = await axios.get(`${JOB_API_END_POINT}/get` ,{withCredentials:true});
              if(res.data.success){
              const jobs = res.data.jobs;
              console.log("alls jobs",res)
              
             let filterJobs = jobs.filter((job)=>job.jobType?.toLowerCase() === "job")
             let filterInternship = jobs.filter((job)=>job.jobType?.toLowerCase() === "internship");
              
                 dispatch(setAllJobs(filterJobs));
                 dispatch(setAllInternships(filterInternship));
             // Extract unique job titles, limited to 10
             const uniqueJobTitles = [...new Set(res.data.jobs.map(job => job.title))].slice(0, 10);
             dispatch(setAllJobsTittle(uniqueJobTitles));
             }
       } catch (error) {
         console.log( "Error during fetching all JObs",error);
       }
      }
      fetchallJobs(); 
  },[]);

  // useEffect(async()=>{

  // },[])

  return (
    <div>
      <Navbar />
      {/* <LandingPage /> */}
      <HeroSection />
      {/* <CategoryCarousel /> */}
      <LatestJobs />
      <CompanySlider />
      <StatsCounter />
      <RegisterSection />
      <RatingAndReview />
      <Footer />
    </div>
  )
}

export default Home