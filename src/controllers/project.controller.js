import { upload } from "../middleware/multer.middleware";
import { Project } from "../model/project.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import uploadOnCloudinary from "../utils/cloudinary";

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

    for(let i=0; i<imgFileArray.length; i++){
        const currImgPath = uploadOnCloudinary(imgFileArray[i].path);
        if(!currImgPath){
            throw new ApiError(500, "Something went wrong uploading on database");
        }
        imgResArray.push(currImgPath);
    }
    const project = await Project.create({
        img : imgResArray || "",
        location,
        tasks,
        govBody,
        startDate,
        endDate
    })
    const createdProject = await Project.findById(project._id)
    if(!createdProject){
        throw new ApiError(500, "Something went wrond while creating project")
    }
})


export {fillProject}