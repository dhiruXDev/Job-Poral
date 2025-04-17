import { useState, useEffect } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
 
export default function RatingAndReview() {
  const { allRatingAndReview } = useSelector((state) => state.auth);
  
  // Load liked reviews from localStorage on component mount
  const [likedReviews, setLikedReviews] = useState(() => {
    try {
      const savedLikes = localStorage.getItem('likedReviews');
      return savedLikes ? JSON.parse(savedLikes) : {};
    } catch (error) {
      console.error('Error loading liked reviews from localStorage:', error);
      return {};
    }
  });
  
  // Save liked reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('likedReviews', JSON.stringify(likedReviews));
  }, [likedReviews]);
  
  var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Modified like handler that takes a review ID parameter
  const likeClickHandler = (reviewId) => {
    setLikedReviews((prevLikedReviews) => {
      // Check if this specific review was previously liked
      const wasLiked = prevLikedReviews[reviewId] || false;
      const newLiked = !wasLiked;  // Toggle liked state for this review

      if (newLiked) {
        toast.success("Marked as helpful!");  // Success toast if liked
      } else {
        toast.error("You have unmarked this review as helpful!");  // Error toast if unliked
      }
      
      // Return updated state with just this review's liked status changed
      return {
        ...prevLikedReviews,
        [reviewId]: newLiked
      };
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 pb-20">
      <div className="mb-6 flex justify-center items-center">
        <h2 className="text-2xl sm:text-4xl text-center font-bold pb-5">What People Are Saying</h2>
      </div>
      <div className="h-full w-full relative">
        <Slider {...settings}>
          {allRatingAndReview?.map((review) => {
            // Use a consistent ID field - if there's both _id and id, prefer _id
            const reviewId = review._id || review.id;
            
            return (
              <div key={reviewId} className="px-2">
                <div className="bg-white h-[260px] p-6 rounded-lg shadow-md flex justify-center flex-col border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <img 
                          src={review.user.profile?.profilePhoto} 
                          alt={`${review.user.fullname}'s avatar`} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{review.user.fullname}</h3>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`${
                                review.rating >= star
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              size={16}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 line-clamp-4 mb-2">{review.reviews}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    <div
                      onClick={() => likeClickHandler(reviewId)} 
                      className="flex items-center cursor-pointer"
                    >
                      <ThumbsUp
                        className={`mr-1 transition-colors duration-300 ${
                          likedReviews[reviewId] ? 'text-blue-500 fill-blue-500' : 'text-gray-400 hover:text-blue-400'
                        }`}
                        size={16}
                      />
                      <span>{review.helpful} found helpful</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}