import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import morgan from 'morgan'
import JobRouter from './routes/jobRoutes.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRouter.js'
import mongoose from 'mongoose'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { body,validationResult } from 'express-validator'
import { authRout } from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser'
// Middleware 
// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Body parser
app.use(express.json())
app.use(cookieParser())

app.get('/api/v1/test',(req,res)=>{
  res.json({message:' route test'})
})

// Jobs routes
app.use('/api/v1/jobs',authRout,JobRouter)
// User routes
app.use('/api/v1/users',authRout,userRouter)
// Auth routes
app.use('/api/v1/auth',authRouter)
// Error handling
app.use('*',(req,res)=>{
  res.status(404).json({message:'Route not found'})
})
app.use((err,req,res,next)=>{
  res.status(500).json({message:err.message})
})
app.use(errorHandlerMiddleware)
// Server
const PORT = process.env.PORT || 5100
const MONGO_URL = process.env.MONGO_URL
// const PORT = 5100

await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
