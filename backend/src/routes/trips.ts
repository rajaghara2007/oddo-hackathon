import { Router } from "express";
import { getTrips, createTrip, getTripById, updateTrip, deleteTrip } from "../controllers/trips";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getTripById);
router.patch("/:id", updateTrip);
router.delete("/:id", deleteTrip);

export default router;
