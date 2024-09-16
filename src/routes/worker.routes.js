import { Router } from "express";
import { getWorker, getWorkerTask, registerWorker } from "../controllers/worker.controller.js";
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
router.route("/getWorkerTask").post(upload.fields([
    {
        name : 'workerImg',
        maxCount: 10
    }
]),getWorkerTask)
export default router