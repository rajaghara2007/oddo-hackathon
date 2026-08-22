import { Router } from "express";
import { getCities, searchCities } from "../controllers/cities";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.get("/", getCities);
router.get("/search", searchCities);

export default router;
