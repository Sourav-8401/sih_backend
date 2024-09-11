import { Router } from "express";
import { fillTask, getTask } from "../controllers/task.controller.js";
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

export default router