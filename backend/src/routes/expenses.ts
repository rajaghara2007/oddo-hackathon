import { Router } from "express";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../controllers/expenses";
import { authenticate } from "../middlewares/auth";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get("/", getExpenses);
router.post("/", createExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
