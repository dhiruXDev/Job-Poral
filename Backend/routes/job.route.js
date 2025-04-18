import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get( getAllJobs);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);
router.route("/get/:id").get(authenticateToken, getJobById);
router.route("/delete/:id").delete(authenticateToken, deleteJob);
export default router;
