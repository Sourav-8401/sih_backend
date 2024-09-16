import { Task } from "../model/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";
import { Worker } from "../model/worker.model.js";
/**
 * admin will allot the task 
 * post req of the -: building id , img, taskTitle, address, 
 *                    start date, end date, assigned, progress
 *                    address of the task req,
 * checks the req filled are there or not - ///
 * 
 * methods: 1. update address, 
 *          2. fill Task, ///
 *          3. getTask, gettask by id;
 *          4. post Location from worker of the site ///
 *          5. update the progress ///
 *          6. update images
 *          7. update the task
 */
const fillTask = asyncHandler(async (req, res)=>{
    const {taskTitle, govBody, location, test, address, isVerified, startDate, endDate, progress,} = req.body;
    console.log("taskTitle", taskTitle);
    console.log("taskTitle", address);
    // console.log(req.body);
    
    if([taskTitle, address, startDate, endDate, progress].some((fields)=>{
        fields?.trim() === "";   
    })){
        throw new ApiError(401, "All fields required");
    }


    let taskImgArray = req.files['taskImg'];
    // console.log("taskImgARRAY: ", taskImgArray)
    let resTaskImgArray = [];
    if(taskImgArray){
        let taskImgLocalFilePath = [];
        for(let i=0; i<taskImgArray.length; i++){
            let currPath = taskImgArray[i]?.path;
            if(!currPath){
                throw new ApiError(500, "Something went wrong while uploading files");
            }
            taskImgLocalFilePath.push(currPath);
            console.log(currPath);
        }
        for(let i=0; i<taskImgLocalFilePath.length; i++){
            const currTaskImg = await uploadOnCloudinary(taskImgLocalFilePath[i]);
            if(!currTaskImg){
                throw new ApiError(400, "Something went wrong while uploading on cloudinary");
            }
            resTaskImgArray.push(currTaskImg.url);
        }
    }
    const taskId = uuidv4();
    const task = await Task.create({
            taskId,
            taskTitle,
            img : resTaskImgArray || "",
            address,
            startDate,
            endDate,
            progress,
            test,
            govBody

    })
    const createdTask = await Task.findById(task._id)
    if(!createdTask){
        throw new ApiError(500, "Something went wrong while uploading on datbase")
    }
    return res.status(201).json(
        new ApiResponse(200, task, "Task created")
        // {message: "done"}
    )
})
const getTask = asyncHandler(async (req,res)=>{
    const data = await Task.find();
    //write the code to get the tasks and return to response
    res.status(200).json(
        {message: "Tasks retrieved successfully",
        data
    });
})


const getTaskById = asyncHandler(async (req,res)=>{
    const {taskId} = req.body;
    const dataById = Task.findById(taskId);
    if(!dataById){
        throw new ApiError(400, "Task doesn't exist")
    }
})

const updateLocation = asyncHandler(async (req,res)=>{
    const {taskId, location} = req.body;

    const task = await Task.findById(taskId);
    task.location = location;
    const isSave = task.save({validateBeforeSave : false});
    if(!isSave){
        throw new ApiError(500, "Something went wrong while updating location")
    }
})
const fillLocation = asyncHandler(async (req, res)=>{
    const {taskId, location} = req.body;

    if(location.latitude === "" || location.longitude === ""){
        throw ApiError(401, 'location required');
    }
    const task = await Task.updateOne({_id: taskId}, {
        $set : {
            latitude : location.latitude,
            longitude : location.longitude
        }
    })
    if(!task){
        return ApiError(500, "Something went wrong while updating location")
    }
})
const updateProgress = asyncHandler(async (req, res)=>{
    const {taskId, progress} = req.body;

    if(progress === ""){
        throw new  ApiError(401, 'progress required');
    }
    const task = await Task.updateOne({taskId: taskId}, {
        $set : {
            progress : progress
        }
    })
    if(!task){
        throw new ApiError(500, "Something went wrong while updating progress")
    }
})

const assignTask = asyncHandler(async(req, res)=>{
    const {workerPhoneNo, adminPhoneNo, taskOId} = req.body;

    if(!workerPhoneNo || !adminPhoneNo || !taskOId){
        throw new ApiError(401, "All fields required for assigningTask");
    }
    const worker = await Worker.findOne({phoneNo: workerPhoneNo});
    const task = await Task.findById(taskOId);
    if(!worker){
        throw new ApiError(401, "Worker doesn't exist")
    }
    if(!task){
        throw new ApiError(501, "Task not found by given Id")
    }
    worker.assignedTask.push(taskOId);
    task.assignedTo.phoneNo = workerPhoneNo;
    task.assignedBy.phoneNo = adminPhoneNo;
    await task.save();
    await worker.save();

    return res.status(200).json({
        message : "task assigned successfully",
        task
    })

})

export {fillTask, getTask, getTaskById, updateLocation, assignTask}