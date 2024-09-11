import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
    location: {latitude: String, longitude : String},
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Task"
        }
    ],
    govBody: string,
    startDate: Date,
    endDate: Date,

},{timestamps: true})

export const Project = mongoose.model("Project", projectSchema)