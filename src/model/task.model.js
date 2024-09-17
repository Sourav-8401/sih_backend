import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    taskId : {
        type: String,
    },  
    img : [String],//cloudinary url
    taskTitle : {
        type: String,
        required : true
    },  
    location: {
        latitude: String, 
        longitude : String
    },
    address : {
        type: String,
        required : true,
    },
    stages : String,
    priority : Number, 
    isVerified : { type: Boolean, default: false},
    startDate : Date,
    endDate : Date,
    forProject : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    assignedBy : String, //Admin phone NO,
    assignedTo : String, //Worker phone NO,
    progress: {
        prevProgress: {
            percentage: { type: Number},
            updationTime: { type: Date},
        },
        currProgress: {
            percentage: { type: Number},
            updationTime: { type: Date},
        }
    },
    tests : [{
        slumpTest : String,
        date : Date
    }]

},{timestamps: true})

export const Task = mongoose.model("Task", taskSchema)