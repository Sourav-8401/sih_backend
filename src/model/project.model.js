import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectId : String,
    img : {
        type:{
            url: String,
            localPath: String
        },
        default: {
            url: "",
            localPath:"",
        }
    },
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
    govBody: String,
    startDate: Date,
    endDate: Date,

},{timestamps: true})

export const Project = mongoose.model("Project", projectSchema)