import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectId : String,
    img : [String],
    adminPhoneNo: Number,
    adminName: String,
    address: String,
    location: {latitude: String, longitude : String},
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Task"
        }
    ],
    description: String,
    govBody: String,
    startDate: Date,
    endDate: Date,
},{timestamps: true})

export const Project = mongoose.model("Project", projectSchema)