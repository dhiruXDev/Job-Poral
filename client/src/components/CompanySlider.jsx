import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im1 from "../assets/A-removebg-preview.png";
import im2 from "../assets/Amazin-removebg-preview.png";
import im3 from "../assets/apple-pay.png";
import im4 from "../assets/download-removebg-preview.png";
 
import im6 from "../assets/facebook.png";
import im7 from "../assets/Google-removebg-preview.png";
import im8 from "../assets/GooglePay-removebg-preview.png";
import im9 from "../assets/HP-removebg-preview.png";
import im10 from "../assets/Infosys-removebg-preview.png";
import im11 from "../assets/Microsoft-removebg-preview.png";
import im12 from "../assets/Ponepay-removebg-preview.png";
import im13 from "../assets/TCS-removebg-preview.png";
import im14 from "../assets/walmart-removebg-preview.png";
 

export const CompanySlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // optional: smaller screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  
  return (
    <div className="w-full flex items-center flex-col  ">

      <div className=" text-3xl md:text-5xl font-bold mb-8">
        <h1>Top companies trust us</h1>
      </div>

      <div className="relative w-full bg-gray-200 overflow-hidden py-1 md:py-4 ">
              {/* Left Shadow */}
             <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-300 via-gray-200/80 to-transparent z-10"></div>
             {/* Right Shadow */}
             <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-300 via-gray-200/80 to-transparent z-10"></div>
          <Slider {...settings}>
                <div><img src={im1} alt="1" className="w-40 h-40 object-contain" /></div>
                <div><img src={im2} alt="2" className="w-40 h-40 object-contain" /></div>
                <div><img src={im3} alt="3" className="w-40 h-40 object-contain" /></div>
                <div><img src={im4} alt="4" className="w-40 h-40 object-contain" /></div>
                <div><img src={im7} alt="2" className="w-40 h-40 object-contain" /></div>
                <div><img src={im8} alt="3" className="w-40 h-40 object-contain" /></div>
                <div><img src={im9} alt="4" className="w-40 h-40 object-contain" /></div>
                <div><img src={im10} alt="5" className="w-40 h-40 object-contain" /></div>
                <div><img src={im11} alt="1" className="w-40 h-40 object-contain" /></div>
                <div><img src={im12} alt="2" className="w-40 h-40 object-contain" /></div>
                <div><img src={im13} alt="3" className="w-40 h-40 object-contain" /></div>
                <div><img src={im14} alt="4" className="w-40 h-40 object-contain" /></div>
       </Slider>
      </div>
    </div>
  );
};
