import { asyncHandler } from "../utils/asyncHandler.js";
import { Worker } from "../model/worker.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../model/task.model.js";
const registerWorker= asyncHandler(async(req,res)=>{
    const {fullName, phoneNo, location, isVerified, allotedArea, addhaarNo} = req.body;
    console.log(fullName)
    const worker = await Worker.create({
        fullName,
        phoneNo,
        location,
        allotedArea,
        addhaarNo,
    })
    if(!worker){
        throw new ApiError(500, "Something went wrong while uploading on datbase")
    }
    return res.status(200).json({
        message: "createdWorker",
        worker
    })
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
        message: "task Fetched successfully",
        data : resTask
    })
})
export {
    registerWorker,
    getWorker,
    getWorkerTask
}