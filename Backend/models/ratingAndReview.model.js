 import mongoose from "mongoose";
const ratingAndReviewsSchema = new mongoose.Schema({
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
      },
      rating : {
        type : Number,
        required : true
      },
      reviews : {
        type : String,
        required :true,
        trim : true
      },
      job : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Job"
      } ,
      
      createdAt: {
        type: Date,
        default: Date.now()
    }
 
});

export const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewsSchema);

 