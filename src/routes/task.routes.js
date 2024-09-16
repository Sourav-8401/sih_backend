import { Router } from "express";
import { assignTask, fillTask, getTask, getTaskById, updateLocation } from "../controllers/task.controller.js";
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
router.route("/getTask").get(getTask);
router.route("/getTaskById").get(getTaskById)
router.route("/updateLocation").post(updateLocation)
router.route("/assignTask").post(
    upload.none(),
    assignTask)
export default router