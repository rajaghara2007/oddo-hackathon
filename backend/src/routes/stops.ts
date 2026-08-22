import { Router } from "express";
import { getStops, createStop, updateStop, deleteStop } from "../controllers/stops";
import { authenticate } from "../middlewares/auth";
import activitiesRoutes from "./activities";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get("/", getStops);
router.post("/", createStop);
router.patch("/:id", updateStop);
router.delete("/:id", deleteStop);

router.use("/:stopId/activities", activitiesRoutes);

export default router;
