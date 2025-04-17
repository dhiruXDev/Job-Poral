import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

// //Admin job posting
// export const postJob = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       requirements,
//       salary,
//       location,
//       jobType,
//       experience,
//       position,
//       companyId,
//       mode,
//       duration
//     } = req.body;
//     const userId = req.id;

//     if (
//       !title ||
//       !description ||
//       !requirements ||
//       !salary ||
//       !location ||
//       !jobType ||
//       !experience ||
//       !position ||
//       !companyId
//     ) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }
//     const job = await Job.create({
//       title,
//       description,
//       requirements: requirements.split(","),
//       // salary: Number(salary), ---> here we are storing salary as pure numberic value
//       salary: salary, // HEere storing the salary as string
//       location,
//       jobType,
//       experienceLevel: experience,
//       position,
//       Work_Type :mode,
//       duration : duration,
//       company: companyId,
//       created_by: userId,
//     });
//     // Update Company with new job
//     await Company.findByIdAndUpdate(companyId, { $push: { jobs: job._id } });

//     res.status(201).json({
//       message: "Job posted successfully.",
//       job,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error", success: false });
//   }
// };


//Admin job posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
      mode,
      duration,
      deadline,
      workingDays,
      eligibility,
      detailedDescription,
      contact
    } = req.body;
    const userId = req.id;
console.log("all data" , title,
  description,
  requirements,
  salary,
  location,
  jobType,
  experience,
  position,
  companyId,
  mode,
  duration,
  deadline,
  workingDays,
  eligibility,
  detailedDescription,
  contact)
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    
    const job = await Job.create({
      title,
      description,
      requirements: typeof requirements === 'string' ? requirements.split(",") : requirements,
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
      Work_Type: mode,
      duration,
      company: companyId, 
      created_by: userId,
      // New fields
      deadline,
      workingDays,
      eligibility,
      detailedDescription,
      contact
    });
         
    // Update Company with new job
    await Company.findByIdAndUpdate(companyId, { $push: { jobs: job._id } });

    res.status(201).json({
      message: "Job posted successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
//Users
export const getAllJobs = async (req, res) => {
  try {
 
    const keyword = req.query.keyword || "";
 
    const query = { 
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
         { location: { $regex: keyword, $options: "i" } },
        { Work_Type: { $regex: keyword, $options: "i" } },
        
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Users
export const getJobById = async (req, res) => {
  try { 
 
    const jobId = req.params.id;
 
    const job = await Job.findById(jobId) 
    .populate("applications")
    .populate({
      path: "company",
      populate: {
        path: "userId"
      }
    });
  
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true , message: "Job fetched successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Admin job created 
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      sort: { createdAt: -1 },
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

export const deleteJob = async (req, res) => { 
  console.log("Called");
  
  try {
    const jobId = req.params.id;

    // Step 1: Find the Job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    console.log("Job", job);

    // Step 2: Find the Company & Remove Job from Its Job List
    const company = await Company.findById(job.company);  // Fetch the company

    console.log("company Details", company);
    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    // Remove job ID from the company's job list
    company.jobs = company.jobs.filter(id => id.toString() !== jobId);
    await company.save(); // Save updated company data
    
    // Step 3: Delete the Job
    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({ message: "Job deleted successfully", success: true });

  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

