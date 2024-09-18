import { asyncHandler } from "../utils/asyncHandler.js";
import { Worker } from "../model/worker.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../model/task.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const workerLogin = asyncHandler(async(req,res)=>{
    const {phoneNo,otp} = req.body
    if(!phoneNo){
        throw new ApiError(401, "Phone no required")
    }
    if(!otp){
        throw new ApiError(401, "Otp required")
    }
    if(otp != 123){
        return res.status(401).json({
            message : "wrong otp",
            value : false
        })
    }else{
        return res.status(401).json({
            message : "right otp",
            value : true,
            phoneNo : phoneNo
        })
    }
})
const registerWorker= asyncHandler(async(req,res)=>{
    const {fullName, phoneNo, location, isVerified, allotedArea, addhaarNo} = req.body;
    console.log(fullName)


    const avatar = req.file;
    let resAvatar;
    if(avatar){
        resAvatar = await uploadOnCloudinary(avatar?.path);
        if(!resAvatar){
            throw new ApiError(401, "Something went wrong while uploading on cloudinary")
        }
    }
    const worker = await Worker.create({
        fullName,
        avatar : resAvatar.url || "",
        phoneNo,
        location,
        allotedArea,
        addhaarNo,
    })
    if(!worker){
        throw new ApiError(500, "Something went wrong while uploading on datbase")
    }
    return res.status(200).json(
        worker
    )
})

const getWorker = asyncHandler(async (req,res)=>{
    const {phoneNo} = req.body;
    const worker = await Worker.findOne({phoneNo});
    if(!worker){
        throw new ApiError(500, " worker not found")
    }
    return res.status(200).json(worker);
})

const getWorkerTask = asyncHandler(async(req,res)=>{
    const {phoneNo} = req.body;

    const worker = await Worker.findOne({phoneNo});
    if(!worker){
        throw new ApiError(401,"Worker not found")
    }
    const taskArray = worker.assignedTask;
    const resTask = await Promise.all(
        taskArray.map(async (id)=>{
            return await Task.findById(id);
    }))
    
    if(!resTask){
        throw new ApiError(501, "something went wrong while fetching tasks")
    }

    return res.status(201).json({
        resTask
    })
})
export {
    registerWorker,
    getWorker,
    getWorkerTask,
    workerLogin
}