import express, { Router } from "express";
import { fillProject } from "../controllers/project.controller";
router = Router();


router.route("fillProject").post(
    upload.fields([
        {
            name : 'projectImg',
            maxCount: 10
        }
    ]),
    fillProject
);

router.route("getProject").get()