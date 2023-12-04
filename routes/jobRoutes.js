import { Router } from "express";
const route = Router();
import { ValidationJobInput,validateId } from "../middleware/validationMiddleware.js";
import { CreateJob, deleteJob, getAllJobs, getSingleJob, updateJob } from "../controllers/jobController.js";


route.route("/").get(getAllJobs).post(ValidationJobInput,CreateJob);
route.route("/:id").get(validateId,getSingleJob).patch(ValidationJobInput,updateJob).delete(validateId,deleteJob);

export default route;