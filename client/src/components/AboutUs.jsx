import React, { useEffect, useRef } from 'react';
import { Users, Award, TrendingUp, Heart } from 'lucide-react';
import imgAboutUsImgs from "../assets/AboutImg2.jpeg";
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const AboutUs = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current) return;

      const statsSection = statsRef.current;
      const statsSectionTop = statsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (statsSectionTop < windowHeight * 0.75) {
        Array.from(statsSection.children).forEach((stat, index) => {
          setTimeout(() => {
            stat.classList.add('animate-pulse');
            setTimeout(() => {
              stat.classList.remove('animate-pulse');
            }, 1000);
          }, index * 200);
        });

        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-10">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105">
            <img 
              src={imgAboutUsImgs}
              alt="Our team at work" 
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-600">About Us</h2>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Connecting Top Talent with Amazing Opportunities
            </h3>
            
            <p className="text-gray-700 mb-5">
              Our platform bridges the gap between talented students and innovative companies. 
              We believe in creating meaningful internship experiences that benefit both parties, 
              accelerating careers and driving business growth.
            </p>
            
            <p className="text-gray-700 mb-8">
              Founded in 2020, we've helped thousands of students find their dream internships 
              and supported businesses in discovering their next generation of leaders.
            </p>

            {/* Stats Section */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6"
              ref={statsRef}
            >
              <StatCard icon={<Users size={32} className="text-blue-600" />} value="10,000+" label="Interns Placed" />
              <StatCard icon={<Award size={32} className="text-blue-600" />} value="1,500+" label="Partner Companies" />
              <StatCard icon={<TrendingUp size={32} className="text-blue-600" />} value="92%" label="Success Rate" />
              <StatCard icon={<Heart size={32} className="text-blue-600" />} value="4.8/5" label="Satisfaction Score" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="flex flex-col items-center p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    {icon}
    <span className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">{value}</span>
    <span className="text-gray-600 text-sm sm:text-base">{label}</span>
  </div>
);

export default AboutUs;
