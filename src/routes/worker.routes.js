import { Router } from "express";
import { getWorker, registerWorker } from "../controllers/worker.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/registerWorker").post(upload.fields([
    {
        name : 'workerImg',
        maxCount: 10
    }
]),registerWorker);
router.route("/getWorker").post(upload.fields([
    {
        name : 'workerImg',
        maxCount: 10
    }
]),getWorker)
export default router