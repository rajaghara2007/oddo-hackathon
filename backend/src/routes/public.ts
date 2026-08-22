import { Router } from "express";
import { getPublicTrips, getPublicTripById } from "../controllers/public";

const router = Router();

router.get("/trips", getPublicTrips);
router.get("/trips/:id", getPublicTripById);

export default router;
