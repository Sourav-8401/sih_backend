import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { v4 } from "uuid";
/**
 * checks whether the req data are there are not
 * 
 */

const fillProject = asyncHandler(async (req,res)=>{
    const {location, tasks, govBody, startDate, endDate} = req.body;
    if([location, tasks, govBody, startDate, endDate].some((fields)=>{
        fields?.trim() === ""
    })){
        throw new ApiError(401,"All fields are required")
    }
    const imgResArray = []
    const imgFileArray = req.files['projectImg'];
    if(location){
        location = JSON.parse(location);
        console.log("latitude:",location.latitude)
    }
    for(let i=0; i<imgFileArray.length; i++){
        const currImgPath = uploadOnCloudinary(imgFileArray[i].path);
        if(!currImgPath){
            throw new ApiError(500, "Something went wrong uploading on database");
        }
        imgResArray.push(currImgPath);
    }
    const projectId = v4();
    const project = await Project.create({
        projectId,
        img : imgResArray || "",
        location,
        tasks,
        govBody,
        startDate,
        location: location ? {
            latitude : location.latitude ,
            longitude : location.longitude
        }: {},
        endDate
    })
    const createdProject = await Project.findById(project._id)
    if(!createdProject){
        throw new ApiError(500, "Something went wrond while creating project")
    }
})

const getAllProject = asyncHandler(async(req,res)=>{
    const project = await Project.find();
    if(!project){
        throw new ApiError(401,"Project doesn't exist");
    } 
    return res.status(200).json(
        project
    )
})
const updateLocation = asyncHandler(async(req, res)=>{
    const {location, projectId} = req.body;
    if(!projectId){
        throw new ApiError("Project ID required");
    }
    console.log(location)
    const project = await Project.findById(projectId);
    const parsedLocation = JSON.parse(location)
    project.location =  parsedLocation ? {
        latitude : parsedLocation.latitude ,
        longitude : parsedLocation.longitude
    }: {},
    await project.save();
    return res.status(200).json(
        project
    )
})
/**
 * getTask by projectId
 * projectid
 * project.tasks
 * filter the tasks according to 
 */
const getTaskByProjectId = asyncHandler(async(req,res)=>{
    const {projectId} = req.body;
    if(!projectId){
        throw new ApiError("Project ID required");
    }
    const project = await Project.findById(projectId);
    const taskArray = project.tasks;

    let resTaskArray = [];

})
export {fillProject, getAllProject, updateLocation}