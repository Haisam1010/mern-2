import { StatusCodes } from 'http-status-codes'
import Job from '../Models/JobModel.js'
import { nanoid } from 'nanoid'


// Get All Jobs
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy:req.user.Userid})
    res.status(StatusCodes.OK).json({jobs})
}

// Create Jobs
export const CreateJob = async (req, res) => {
    req.body.createdBy = req.user.Userid
    const jobs = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({jobs})
  }

// Get Single Job
export const getSingleJob = async (req, res) => {
    const {id} = req.params
    const job = await Job.findById(id)
    res.status(StatusCodes.OK).json({job})
    }

    
// Update Job
export const updateJob = async (req, res) => {
  const {id} = req.params
  const updatedJob = await Job.findOneAndUpdate(id,req.body,{new:true})
  res.status(StatusCodes.OK).json({message:'Job Modified',updatedJob})
}

// Delete Job
export const deleteJob = async (req, res) => {
    const {id} = req.params
    const Deletejob = await Job.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({message:'Job Deleted', job:Deletejob})
  }
