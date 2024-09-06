import mongoose, { modelNames } from "mongoose";

const userSchema = new mongoose.Schema({
    username : String,
    location: {latitude: String, longitude : String},
    nearby_construction: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
    
},{timestamps: true})

export const User = mongoose.model("User", userSchema)