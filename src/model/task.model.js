import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    buildingId : String,
    taskTitle : String,
    location: {latitude: String, longitude : String},
    isVerified : Boolean,
    startDate : Date,
    endDate : Date,
    assignedTo : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Worker"
        }
    ],
    percentage : Number

},{timestamps: true})

export const Task = mongoose.model("Task", taskSchema)