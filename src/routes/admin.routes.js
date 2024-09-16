import { Router } from "express";
import {getProjects, registerAdmin,  assignProject} from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/registerAdmin").post(    
    upload.single('avatar'),
    registerAdmin
  );

router.route("/assignProject").post(
  upload.array('projectImg',12),
  assignProject
);

router.route("/getProjects").post( 
  upload.none(),
  getProjects);

export default router
