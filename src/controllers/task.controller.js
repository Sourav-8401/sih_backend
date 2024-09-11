import { Task } from "../model/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
/**
 * admin will allot the task 
 * post req of the -: building id , img, taskTitle, address, 
 *                    start date, end date, assigned, progress
 *                    address of the task req,
 * checks the req filled are there or not - ///
 * 
 * methods: 1. update address, 
 *          2. fill Task, ///
 *          3. getTask,
 *          4. post Location from worker of the site ///
 *          5. update the progress ///
 *          6. update images
 *          7. update the task
 */
const fillTask = asyncHandler(async (req, res)=>{
    const {taskTitle, address, isVerified, startDate, endDate, percentage} = req.body;
    console.log("taskTitle", taskTitle);
    console.log("taskTitle", endDate);
    
    
    if([taskTitle, address, startDate, endDate, percentage].some((fields)=>{
        fields?.trim() === "";   
    })){
        throw new ApiError(401, "All fields required");
    }
    // const taskId = uuidv4();
    // const existedTask = await Task.findById(task._id);

    // if(existedTask){
    //     throw new ApiError(401, "Task already existed");
    // }

    let taskImgLocalFilePath = [];
    let taskImgArray = req.files['taskImg'];

    for(let i=0; i<taskImgArray.length; i++){
        let currPath = taskImgArray[i]?.path;
        if(!currPath){
            throw new ApiError(500, "Something went wrong while uploading files");
        }
        taskImgLocalFilePath.push(currPath);
        console.log(currPath);
    }
    // taskImgLocalFilePath = req.files?.taskImg[0]?.path;

    // if(!taskImgLocalFilePath){
    //     throw new ApiError(500, "Something went wrong while uploading files");
    // }

    // taskImgLocalFilePath.map(asyncHandler(async (filePath)=>{
    //     await uploadOnCloudinary(filePath);
    // }))
    // const taskImg = await uploadOnCloudinary(taskImgLocalFilePath);
    let resTaskImgArray = [];
    for(let i=0; i<taskImgLocalFilePath.length; i++){
        const currTaskImg = await uploadOnCloudinary(taskImgLocalFilePath[i]);
        if(!currTaskImg){
            throw new ApiError(400, "Task img is required went wrong while uploading on cloudinary");
        }
        resTaskImgArray.push(currTaskImg.url);
    }
    const task = await Task.create({
            taskTitle,
            img : resTaskImgArray || "",
            address,
            startDate,
            endDate,
            percentage
    })
    const createdTask = await Task.findById(task._id)
    return res.status(201).json(
        new ApiResponse(200, task, "Task created")
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
        throw ApiError(401, 'progress required');
    }
    const task = await Task.updateOne({_id: taskId}, {
        $set : {
            percentage : progress
        }
    })
    if(!task){
        return ApiError(500, "Something went wrong while updating progress")
    }
})


export {fillTask, getTask}