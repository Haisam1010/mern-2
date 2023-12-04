import { StatusCodes } from "http-status-codes";
import UserModel from "../Models/UserModel.js";
import {HashPassword,comparePassword} from "../utils/HashPassword.js";
import { Unauthenticated } from "../Errors/CustomErrors.js";
import  {createToken}  from "../utils/tokenUtils.js";



export const register = async (req, res) => {
    const isFirstUser = (await UserModel.countDocuments()) === 0;
    req.body.role = isFirstUser ? "admin" : "user";

    const hashedpassword = await HashPassword(req.body.password);
    req.body.password = hashedpassword;

    const User = await UserModel.create(req.body);
    res.status(StatusCodes.CREATED).json({"message":"User created successfully"});
};

export const login = async (req, res) => {
    const loginUser = await UserModel.findOne({email:req.body.email})
    const isValidUser =  loginUser && await comparePassword(req.body.password,loginUser.password)
    if(!isValidUser) throw new Unauthenticated("Invalid credentials")
    const token = createToken({Userid:loginUser._id,role:loginUser.role})
    const oneDay = 1000 * 60 * 60 * 24;
   res.cookie('token',token,{
         expires:new Date(Date.now()+oneDay),
         httpOnly:true,
         secure:process.env.NODE_ENV === "production"
   })
    res.status(StatusCodes.OK).json({"message":"User logged in successfully"});
};

export const logOut = (req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({"message":"User logged out successfully"})
}
