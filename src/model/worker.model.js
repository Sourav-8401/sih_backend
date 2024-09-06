import { Schema } from "mongoose";
import mongoose from "mongoose";
const workerSchema  = new Schema({
    fullName : String,
    phoneNo : {
        type : Number,
        required : true,
        unique: true,
    },
    location: {latitude: String, longitude : String},
    isVerified : {type : Boolean, default: false},
    alloted_area : String, 
    adhaarNo : {
      type: String,
      unique: true  
    },
    assignedTask : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    tokens : [
        {
            token:{type: String, required: true},
        }
    ],
},{timestamps: true})

export const Worker = mongoose.model("Worker", workerSchema)

