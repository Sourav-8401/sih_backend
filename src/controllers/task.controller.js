import { Task } from "../model/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";
import { Worker } from "../model/worker.model.js";
import { Project } from "../model/project.model.js";

const fillTask = asyncHandler(async (req, res)=>{
    let {taskTitle, govBody, description, location, tests, address, isVerified, startDate, endDate, progress,forProject, assignedBy, assignedTo, priority, stages, budgetAlloted} = req.body;
    console.log("taskTitle", taskTitle);
    console.log("taskTitle", address);
    console.log(req.body);
    
    if([taskTitle, address, startDate, endDate, progress].some((fields)=>{
        fields?.trim() === "";   
    })){
        throw new ApiError(401, "All fields required");
    }
    if(progress){
        progress = progress.replace("'", "");
    }
    if(tests){
        tests = tests.replace("'", "");
    }
    console.log(location);

    if(location){
        location = JSON.parse(location);
        console.log("latitude:",location.latitude)
    }
    console.log(tests)
    console.log(progress)
    console.log(typeof location)

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
            progress: progress ? {
                prevProgress : {
                    percentage: progress.prevProgress.percentage,
                    updationTime : progress.prevProgress.updationTime
                },
                currProgress : {
                    percentage : progress.currProgress.percentage,
                    updationTime : progress.currProgress.updationTime
                }
            }: {},
            tests: tests ? tests.push({
                slumpTest : tests[0].slumpTest,
                date : tests[0].date
            }): [],
            govBody,
            location: location ? {
                latitude : location.latitude ,
                longitude : location.longitude
            }: {},
            assignedBy : assignedBy || "",
            assignedTo : assignedTo || "",
            forProject : forProject || "",
            isVerified,
            stages,
            priority,
            description,
            budgetAlloted
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





const getAllTask = asyncHandler(async (req,res)=>{
    const data = await Task.find();
    //write the code to get the tasks and return to response
    if(!data){
        return res.status(501).json({
            message : "Something went wrong while retriving all task"
        })
    }
    console.log(data)
    return res.status(200).json(
        data
    );
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


//Task assign tarika
// workerPhoneNo, adminPhoneNo, taskOId, projectId = req.body
// ye wali task kon si project ki hai
// ye task 


const addTaskToProject = asyncHandler(async(req, res)=>{
    const {taskId, projectId} = req.body;
    const project = await Project.findById(projectId);
    // const task = await Task.findById(taskId);
    if(!project){
        throw new ApiError(401, "TaskId, ProjectId required");
    }
    project.tasks.push(taskId);
    const resProject = await project.save();
    return res.status(200).json(
        resProject
    )
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


//take projectId
//find project
//group according to stages and arrange assending

const getTaskByProjectId = asyncHandler(async (req,res)=>{
    try {
            const {projectId} = req.body;
        
            if(!projectId){
                return res.status(401).json({
                    message: "ProjectId required"
                })
            }
            const tasks = await Task.find();
        
    } catch (error) {
        throw new ApiError(501, error);
    }
})

export {fillTask, getAllTask, getTaskById, updateLocation, assignTask, addTaskToProject}