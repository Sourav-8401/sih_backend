import { Task } from "../model/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const fillTask = asyncHandler(async (req, res)=>{
    const {taskTitle, location, isVerified, startDate,endDate, percentage} = req.body;
    console.log("taskTitle", taskTitle);
    console.log("taskTitle", location.latitude);
    console.log("taskTitle", endDate);
    
    const task = await Task.create({
            taskTitle,
            location : {
               latitude: location.latitude,
               longitude: location.longitude
            },
            startDate,
            endDate,
            percentage
    })
    console.log(task);
    res.status(200).json({
        message: "ok its working"
    })
})
const getTask = asyncHandler(async (req,res)=>{
    const data = await Task.find();
    //write the code to get the tasks and return to response
    res.status(200).json(
        {message: "Tasks retrieved successfully",
        data
    });

})

export {fillTask, getTask}