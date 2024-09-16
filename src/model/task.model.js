import mongoose, { mongo } from "mongoose";
const taskSchema = new mongoose.Schema({
    taskId : {
        type: String,
    },  
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
    forProject : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    assignedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin"
    },
    assignedTo : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Worker"
        }
    ],
    progress : {
        type: Number,
        default: 0
    }

},{timestamps: true})

export const Task = mongoose.model("Task", taskSchema)