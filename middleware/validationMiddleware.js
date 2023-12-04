import { body,param,validationResult } from "express-validator";
import {BadRequestError,NotFoundError, Unauthorized}  from "../Errors/CustomErrors.js";
import { JOB_STATUS,JOB_TYPE } from "../utils/constatnt.js";
import mongoose from "mongoose";
import JobModel from "../Models/JobModel.js";
import UserModel from "../Models/UserModel.js";
import isEmail from "validator/lib/isEmail.js";


const withValidationErrors = (validateValues)=> {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
  
          const firstMessage = errorMessages[0];
          console.log(Object.getPrototypeOf(firstMessage));
          if (errorMessages[0].startsWith('no job')) {
            throw new NotFoundError(errorMessages);
          }
          if (errorMessages[0].startsWith('not authorized')) {
            throw new Unauthorized('not authorized to access this route');
          }
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
  };
  
export const ValidationJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('Company is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Job Status is required'),

])

export const validateId = withValidationErrors([
    param('id').custom(async (value,{req})=>{
      const validId =  mongoose.Types.ObjectId.isValid(value)
      if(!validId) throw new BadRequestError('Invalid Id')
      const job = await JobModel.findById(value)
      if(!job) throw new NotFoundError(`No job with id of ${value}`)
      const isAdmin = req.user.role === 'admin'
      const isOwner = req.user.Userid === job.createdBy.toString()

      if(!isAdmin && !isOwner) throw new Unauthorized('You are not authorized to perform this action')
    })
])

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid').custom(async (email)=>{
        const user = await UserModel.findOne({email})
        if(user) throw new BadRequestError('Email already exists')
    }),
    body('password').notEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('location').notEmpty().withMessage('Location is required')
])
export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
])

export const updateValidation = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid').custom(async (email,{req})=>{
        const user = await UserModel.findOne({email})
        if(user && user._id.toString() !== req.user.Userid) throw new BadRequestError('Email already exists')
    }),
    body('location').notEmpty().withMessage('Location is required'),
    body('password').notEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
])