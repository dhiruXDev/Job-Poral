import mongoose from "mongoose";
import {RatingAndReview} from "../models/ratingAndReview.model.js";
import {User} from "../models/user.model.js"; 
import {Job} from "../models/job.model.js";  
        
// Create a new rating and review 
export const createRatingAndReview = async (req, res) => {
  try {
    const { rating, reviews, jobId } = req.body;
    const userId = req.id;

     // Validate input 
    if (!rating || !reviews || !jobId) {
      return res.status(400).json({
        success: false,  
        message: "All fields are required",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if user has already reviewed this job
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      job: jobId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this job",
      });
    }

    // Create rating and review
    const newRatingAndReview = await RatingAndReview.create({
      user: userId,
      rating,
      reviews,
      job: jobId,
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      data: newRatingAndReview,
    });
  } catch (error) {
    console.error("Error creating rating and review:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create rating and review",
      error: error.message,
    });
  }
};

// Get all ratings and reviews
export const getAllRatingAndReviews = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
    .populate({
      path: "user",
      select: "fullname  email ",
      populate: {
        path: "profile",
        select: "profilePhoto",
      },
    })
    .populate({
      path: "job",
      select: "title companyName location",
    })
    .sort({ createdAt: -1 });
  
    return res.status(200).json({
      success: true,
      message: "All ratings and reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.error("Error fetching ratings and reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch ratings and reviews",
      error: error.message,
    });
  }
};


// Get ratings and reviews for a specific job
export const getJobRatings = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate job ID
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID format",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Get all ratings for the job
    const ratings = await RatingAndReview.find({ job: jobId })
      .populate({
        path: "user",
        select: "firstName lastName profileImage",
      })
      .sort({ createdAt: -1 });

    // Calculate average rating
    let totalRating = 0;
    ratings.forEach((item) => {
      totalRating += item.rating;
    });
    const averageRating = ratings.length > 0 ? totalRating / ratings.length : 0;

    return res.status(200).json({
      success: true,
      message: "Job ratings and reviews fetched successfully",
      data: {
        reviews: ratings,
        averageRating: parseFloat(averageRating.toFixed(1)),
        reviewCount: ratings.length,
      },
    });
  } catch (error) {
    console.error("Error fetching job ratings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job ratings",
      error: error.message,
    });
  }
};

// Get ratings and reviews by a specific user
export const getUserRatings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get all ratings by the user
    const ratings = await RatingAndReview.find({ user: userId })
      .populate({
        path: "job",
        select: "title companyName location",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "User ratings and reviews fetched successfully",
      data: ratings,
    });
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user ratings",
      error: error.message,
    });
  }
};

// Update a rating and review
export const updateRatingAndReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, reviews } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!rating && !reviews) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required for update",
      });
    }

    // Check if review exists
    const review = await RatingAndReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Rating and review not found",
      });
    }

    // Check if user is authorized to update this review
    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this review",
      });
    }

    // Update review
    const updatedReview = await RatingAndReview.findByIdAndUpdate(
      reviewId,
      {
        rating: rating || review.rating,
        reviews: reviews || review.reviews,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Error updating rating and review:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update rating and review",
      error: error.message,
    });
  }
};

// Delete a rating and review
export const deleteRatingAndReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    // Check if review exists
    const review = await RatingAndReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Rating and review not found",
      });
    }

    // Check if user is authorized to delete this review
    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this review",
      });
    }

    // Delete review
    await RatingAndReview.findByIdAndDelete(reviewId);

    return res.status(200).json({
      success: true,
      message: "Rating and review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting rating and review:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete rating and review",
      error: error.message,
    });
  }
};