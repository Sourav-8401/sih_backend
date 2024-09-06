import { Router } from "express";

const router = Router();

router.route("/registerWorker").post(registerWorker);
router.route("/loginWorker").post(loginAdmin);

export default router