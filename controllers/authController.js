import { StatusCodes } from "http-status-codes";
import UserModel from "../Models/UserModel.js";
import {HashPassword,comparePassword} from "../utils/HashPassword.js";
import { Unauthenticated } from "../Errors/CustomErrors.js";
import  {createToken}  from "../utils/tokenUtils.js";



export const register = async (req, res) => {
    const isFirstAccount = (await UserModel.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
  
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
  
    const user = await UserModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
  };
  export const login = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
  
    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));
  
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
  
    const token = createJWT({ userId: user._id, role: user.role });
  
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'development',
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged in' });
  };
  
  export const logOut = (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
  };