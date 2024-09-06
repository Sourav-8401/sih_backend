import { Router } from "express";
import { fillTask, getTask } from "../controllers/task.controller.js";

const router = Router();

router.route("/fillTask").post(fillTask);
router.route("/getTask").post(getTask);

export default router