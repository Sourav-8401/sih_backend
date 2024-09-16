import { asyncHandler } from "../utils/asyncHandler.js";
import { Worker } from "../model/worker.model.js";
const registerWorker= asyncHandler(async(req,res)=>{
    const {fullName, phoneNo, location, isVerified, allotedArea, addhaarNo, assignedTask} = req.body;
    console.log(fullName)
    const worker = await Worker.create({
        fullName,
        phoneNo,
        location,
        allotedArea,
        addhaarNo,
        assignedTask,  
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
export {
    registerWorker,
    getWorker
}