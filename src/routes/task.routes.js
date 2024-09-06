import { Router } from "express";
import { fillTask, getTask } from "../controllers/task.controller.js";

const router = Router();

router.route("/fillTask").post(fillTask);
router.route("/getTask").get(getTask);

export default router