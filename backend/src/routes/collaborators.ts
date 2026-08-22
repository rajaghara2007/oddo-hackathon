import { Router } from "express";
import { getCollaborators, inviteCollaborator, removeCollaborator } from "../controllers/collaborators";
import { authenticate } from "../middlewares/auth";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get("/", getCollaborators);
router.post("/", inviteCollaborator);
router.delete("/:userId", removeCollaborator);

export default router;
