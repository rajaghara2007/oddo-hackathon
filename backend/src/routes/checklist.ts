import { Router } from "express";
import { getChecklist, createChecklistItem, updateChecklistItem, deleteChecklistItem } from "../controllers/checklist";
import { authenticate } from "../middlewares/auth";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get("/", getChecklist);
router.post("/", createChecklistItem);
router.patch("/:id", updateChecklistItem);
router.delete("/:id", deleteChecklistItem);

export default router;
