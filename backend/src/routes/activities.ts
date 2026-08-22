import { Router } from "express";
import { getActivities, createActivity, updateActivity, deleteActivity } from "../controllers/activities";
import { authenticate } from "../middlewares/auth";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get("/", getActivities);
router.post("/", createActivity);
router.patch("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
