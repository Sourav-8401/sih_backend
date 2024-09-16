import { Router } from "express";
import { getWorker, getWorkerTask, registerWorker } from "../controllers/worker.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/registerWorker").post(
    upload.single('avatar'),
    registerWorker
);
router.route("/getWorker").post(
    upload.none(),
    getWorker
);
router.route("/getWorkerTask").post(
    upload.none()
    ,getWorkerTask
);
export default router