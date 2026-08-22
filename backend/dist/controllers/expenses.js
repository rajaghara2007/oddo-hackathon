"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.getExpenses = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const expenseSchema = zod_1.z.object({
    amount: zod_1.z.number().positive(),
    currency: zod_1.z.string().optional(),
    category: zod_1.z.enum(["SIGHTSEEING", "FOOD", "TRANSPORT", "ACCOMMODATION", "ADVENTURE", "CULTURE", "SHOPPING", "OTHER"]).optional(),
    date: zod_1.z.string().datetime(),
    notes: zod_1.z.string().optional(),
    activityId: zod_1.z.string().uuid().optional(),
});
// Helper to check trip access
const checkTripAccess = async (tripId, userId) => {
    return await prisma_1.default.trip.findFirst({
        where: {
            id: tripId,
            OR: [
                { ownerId: userId },
                { collaborators: { some: { userId, role: { in: ["OWNER", "EDITOR"] } } } }
            ]
        }
    });
};
const getExpenses = async (req, res) => {
    try {
        const { tripId } = req.params;
        const expenses = await prisma_1.default.expense.findMany({
            where: { tripId },
            orderBy: { date: 'desc' },
            include: { paidBy: { select: { id: true, name: true, avatarUrl: true } } },
        });
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getExpenses = getExpenses;
const createExpense = async (req, res) => {
    try {
        const { tripId } = req.params;
        const data = expenseSchema.parse(req.body);
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const expense = await prisma_1.default.expense.create({
            data: {
                ...data,
                tripId,
                paidById: req.user.id,
            },
            include: { paidBy: { select: { id: true, name: true, avatarUrl: true } } },
        });
        res.status(201).json(expense);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createExpense = createExpense;
const updateExpense = async (req, res) => {
    try {
        const { tripId, id } = req.params;
        const data = expenseSchema.partial().parse(req.body);
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const expense = await prisma_1.default.expense.update({
            where: { id },
            data,
        });
        res.json(expense);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res) => {
    try {
        const { tripId, id } = req.params;
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        await prisma_1.default.expense.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteExpense = deleteExpense;
