import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    lastName:{
        type:String,
        default:''
    },
    location:{
        type:String,
        default:'my city'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
    },{timestamps:true})

    userSchema.methods.toJson = function(){
        let obj = this.toObject()
        delete obj.password
        return obj
    }
    
export default mongoose.model('User',userSchema)