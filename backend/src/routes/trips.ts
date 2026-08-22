import { Router } from "express";
import { getTrips, createTrip, getTripById, updateTrip, deleteTrip } from "../controllers/trips";
import { authenticate } from "../middlewares/auth";
import stopsRoutes from "./stops";
import expensesRoutes from "./expenses";
import checklistRoutes from "./checklist";

const router = Router();

router.use(authenticate);

router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getTripById);
router.patch("/:id", updateTrip);
router.delete("/:id", deleteTrip);

router.use("/:tripId/stops", stopsRoutes);
router.use("/:tripId/expenses", expensesRoutes);
router.use("/:tripId/checklist", checklistRoutes);

export default router;
