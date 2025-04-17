import express from "express";
const router = express.Router();
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  createRatingAndReview,
  getAllRatingAndReviews,
  getJobRatings,
  getUserRatings,
  updateRatingAndReview,
  deleteRatingAndReview,
}  from  "../controllers/ratingAndReview.controller.js";
 
// Create rating and review - requires authentication
router.post("/create", authenticateToken, createRatingAndReview);

// Get all ratings and reviews
router.get("/get", getAllRatingAndReviews);

// Get ratings and reviews for a specific job
router.get("/job/:jobId", getJobRatings);

// Get ratings and reviews by a specific user
router.get("/user/:userId", getUserRatings);

// Update a rating and review - requires authentication
router.put("/:reviewId", authenticateToken, updateRatingAndReview);

// Delete a rating and review - requires authentication
router.delete("/:reviewId", authenticateToken, deleteRatingAndReview);

export default router;