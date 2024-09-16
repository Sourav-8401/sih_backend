import { Router } from "express";
import {getProjects, registerAdmin,  assignProject} from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/registerAdmin").post(    
    upload.fields([
    {
        name : 'taskImg',
        maxCount: 10
    }
]),
registerAdmin);
router.route("/assignProject").post(
  upload.fields([
    {
      name: "projectImg",
      maxCount: 10,
    },
  ]),
  assignProject
);

router.route("/getProjects").post(  upload.fields([
    {
      name: "projectImg",
      maxCount: 10,
    },
  ]),
  getProjects);
export default router
