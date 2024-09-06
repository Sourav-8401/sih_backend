import { Schema } from "mongoose";
import mongoose from "mongoose";
const adminSchema  = new Schema({
    adminId : {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName : {
       type : String,
       required : true,
    },
    phoneNo : {
        type : Number,
        required: true,
        unique: true
    },
    govBody : String,
    location: {latitude: String, longitude : String},
    allotedWorker : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Worker"
    }],
    projects : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Project"
    }],
    tokens : [
        {
            token:{type: String, required: true},
        }
    ],
},{timestamps: true})

export const Admin = mongoose.model("Admin", adminSchema)