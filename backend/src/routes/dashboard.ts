import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.get("/", getDashboardStats);

export default router;
