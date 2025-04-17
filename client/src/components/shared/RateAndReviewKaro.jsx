import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { RATING_AND_REVIEW_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

export default function RateAndReviewSystem( {setisShowRateModal}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');

  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState('');
  
   const location = useLocation();
  const fullPath = location.pathname; // e.g. "/jobs/frontend/developer"
  const jobId = fullPath.substring(fullPath.lastIndexOf('/') + 1);
 


  useEffect(() => {
    
    fetchReviews();
  }, []);
 

  const fetchReviews = async () => {
    try {
      const response = await axios(`${RATING_AND_REVIEW_API_END_POINT}/get`);
      console.log("res",response);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setMessage('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${RATING_AND_REVIEW_API_END_POINT}/create`,{ name,
        rating,
        reviews: review,
         jobId : jobId,}, {withCredentials:true});
     
      if (response.data.success) { 
        toast.success("Review submitted successfully!");
        setMessage('Review submitted successfully!');
        setRating(0);
        setReview('');
        setName('');
        fetchReviews(); // Refresh reviews after submission
        setisShowRateModal(false);  
      } else {
        setMessage('Failed to submit review. Please try again.');
      }
    } catch (error) {
      setMessage(error.response.data.message);
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {setMessage(''); setisShowRateModal(false)}, 5000); // Clear message after 5 seconds
    }
  };

// h-[458px] w-[420px] 
  return (
    <div className=" max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Review Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${
                    (hoverRating || rating) >= star
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  size={24}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 ? `${rating} out of 5` : 'Select a rating'}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium mb-1">Your Review</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          
          {message && (
            <div className={`mt-4 p-2 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
      
      {/* Reviews List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews ({reviews.length})</h3>
        
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`${
                        item.rating >= star
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                      size={18}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{item.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}