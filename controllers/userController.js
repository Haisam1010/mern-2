import { StatusCodes } from "http-status-codes";
import UserModel from "../Models/UserModel.js";
import JobModel from "../Models/JobModel.js";

export const getCurrentUser = async (req,res) => {
    const user = await UserModel.findOne({_id:req.user.Userid})
    const withoutPassword = user.toJson()
    res.status(StatusCodes.OK).json({user:withoutPassword})
}
export const getApplicationStats = async (req,res) => {
    const users = await UserModel.countDocuments()
    const jobs = await JobModel.countDocuments()
    res.status(StatusCodes.OK).json({users,jobs})
}
export const updateUser = async (req,res) => {
    const obj = {...req.body}
    delete obj.password
    console.log(obj);
    const updatedUser = await UserModel.findByIdAndUpdate(req.user.Userid,obj,{new:true})
    res.status(StatusCodes.OK).json({msg:'Update user'})
} 