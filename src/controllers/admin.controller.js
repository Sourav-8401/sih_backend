import { Admin } from "../model/admin.model.js"
import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const registerAdmin = asyncHandler(async (req,res)=>{
    const {adminId, fullName, phoneNo, govBody, location, allotedWorker, projects} = req.body;
    const existedUser = await Admin.findOne({phoneNo : phoneNo});
    console.log("FullName",adminId);
    if(existedUser){
        throw new ApiError(409, "User already existed")
    }
    
    let avatar = req.file;
    // console.log(avatar);
    let uploadAvatar;
    if(avatar){
        uploadAvatar = await uploadOnCloudinary(avatar?.path);
        if(!uploadAvatar){
            throw new ApiError(400, "Something went wrong while uploading on cloudinary");
        }
    }

    const admin = await Admin.create({
        adminId,
        fullName,
        avatar : uploadAvatar?.url || "",
        phoneNo : phoneNo,
        govBody,
        location,
        allotedWorker,
        projects
    })

    if(!admin){
        throw new ApiError(501, "something went wrong while creating new Admin")
    }
    return res.status(200).json({
        message: "succesfully created admin",
        admin
    })
});

const assignProject = asyncHandler(async(req, res)=>{
    const {location, tasks, govBody, startDate, endDate, address, adminPhoneNo} = req.body;
    console.log(govBody)
    const admin = await Admin.findOne({phoneNo: adminPhoneNo});
    if(!admin){
        throw new ApiError(401, "something went wrong while finding Admin")
    }

    const imgResArray = []
    const imgFileArray = req.files;
    // console.log(imgFileArray);
    if(imgFileArray){
        for(let i=0; i<imgFileArray.length; i++){
            const currImgPath = await uploadOnCloudinary(imgFileArray[i].path);
            if(!currImgPath){
                throw new ApiError(500, "Something went wrong uploading on database");
            }
            // console.log(currImgPath);
            imgResArray.push(currImgPath.url);
        }
    }

    const project = await Project.create({
        img : imgResArray || "",
        location,
        tasks,
        govBody,
        startDate,
        endDate,
        address,
        adminPhoneNo
    })
        
    if(!project){
        throw new ApiError(501, "something went wrong while creating new project")   
    }
    admin.projects.push(project._id);
    await admin.save();
    return res.status(200).json({
        message : "Project assigned successfully",
        project
    })
});
const getProjects = asyncHandler(async (req, res)=>{
    const {phoneNo} = req.body;
    console.log(phoneNo)
    const admin = await Admin.findOne({phoneNo});
    console.log(admin)
    if(!admin){
        throw new ApiError(401, "something went wrong while finding Admin")
    }

    const projectsArray = admin.projects;
    
    if(!projectsArray){
        throw new ApiError(501, "No projects found")   
    }
    const returnProjectsArray = await Promise.all(
        projectsArray.map(async (projectId)=>{
            return await Project.findById(projectId);
        })
    );
    return res.status(200).json({
        message: "projects found successfully",
        data : returnProjectsArray
    })
});

export {
    registerAdmin,
    getProjects,
    assignProject,
}