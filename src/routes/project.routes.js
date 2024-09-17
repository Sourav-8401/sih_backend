import express, { Router } from "express";
import { fillProject, getAllProject } from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();


router.route("/fillProject").post(
    upload.fields([
        {
            name : 'projectImg',
            maxCount: 10
        }
    ]),
    fillProject
);
router.route("/getAllProject").get(getAllProject)
// router.route("/getProject").get()
export default router;