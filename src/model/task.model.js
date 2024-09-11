import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    buildingId : [{
        type: String,
    }],  
    img : [{
        type: String
    }],//cloudinary url
    taskTitle : {
        type: String,
        required : true
    },  
    location: {latitude: String, longitude : String},
    address : {
        type: String,
        required : true,
    },
    isVerified : { type: Boolean, default: false},
    startDate : Date,
    endDate : Date,
    assignedTo : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Worker"
        }
    ],
    percentage : {
        type: Number,
        default: 0
    }

},{timestamps: true})

export const Task = mongoose.model("Task", taskSchema)