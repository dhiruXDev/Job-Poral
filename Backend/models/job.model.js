// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     requirements: [
//       {
//         type: String,
//       },
//     ],
//     salary: {
//       type: String,  
//       required: true,
//     },
//     Work_Type: {
//       type: String, 
//       required: true,
//     },
//     duration: {
//       type: String,
//     },
//     experienceLevel: {
//       type: Number,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     jobType: {
//       type: String,
//       required: true,
//     },
//     position: {
//       type: Number,
//       required: true,
//     },
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Company",
//       required: true,
//     },
//     created_by: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     applications: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Application",
//       },
//     ],
//   },
//   { timestamps: true }
// );
// export const Job = mongoose.model("Job", jobSchema);


import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      type: String,  
      required: true,
    },
    Work_Type: {
      type: String, 
      required: true,
    },
    duration: {
      type: String,
    },
    experienceLevel: {
      type: String, // Changed from Number to String to match frontend
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String, 
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    // New fields
    deadline: {
      type: Date,
    },
    workingDays: {
      type: Number,
    },
    eligibility: [
      {
        type: String,
      },
    ],
    detailedDescription: [
      {
        heading: {
          type: String,
        },
        points: [
          {
            type: String,
          },
        ],
      },
    ],
    contact: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);
export const Job = mongoose.model("Job", jobSchema);