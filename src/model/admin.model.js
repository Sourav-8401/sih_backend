import { Schema } from "mongoose";
import mongoose from "mongoose";
const adminSchema  = new Schema({
    adminId : {
      type: String,
    },
    fullName : {
       type : String,
    },
    phoneNo : {
        type : Number,
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
            token:{type: String},
        }
    ],
},{timestamps: true})

export const Admin = mongoose.model("Admin", adminSchema)