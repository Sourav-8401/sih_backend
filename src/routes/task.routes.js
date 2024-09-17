import { Router } from "express";
import { addTaskToProject, assignTask, fillTask, getAllTask, getTaskById, updateLocation } from "../controllers/task.controller.js";
import { upload } from "../middleware/multer.middleware.js";

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
export default router