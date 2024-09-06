import { Router } from "express";

const router = Router();

router.route("/registerAdmin").post(regiserAdmin);
router.route("/loginAdmin").post(loginAdmin);

export default router