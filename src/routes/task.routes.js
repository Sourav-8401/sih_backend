import { Router } from "express";
import { addTaskToProject, assignStage, assignTask, fillTask, getAllTask, getGroupedTask, getTaskById, updateLocation, updateProgress, uploadTaskImg } from "../controllers/task.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { getTaskByProjectId } from "../controllers/project.controller.js";

const router = Router();

router.route("/fillTask").post(
    upload.fields([
        {
            name : 'taskImg',
            maxCount: 10
        }
    ]),
    fillTask);
router.route("/getAllTask").get(getAllTask);
router.route("/getTaskById").get(getTaskById)
router.route("/updateLocation").post(updateLocation)
router.route("/assignTask").post(
    upload.none(),
    assignTask)
router.route("/addTaskToProject").post(upload.none(), 
addTaskToProject)
router.route("/getGroupedTask").post(upload.none(), getGroupedTask)
router.route("/assignStage").post(upload.none(), assignStage)
router.route("/uploadTaskImg").post(upload.array('taskImg', 12),uploadTaskImg)
router.route("/updateProgress").post(upload.none(), updateProgress)
export default router