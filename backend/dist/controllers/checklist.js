"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChecklistItem = exports.updateChecklistItem = exports.createChecklistItem = exports.getChecklist = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const checklistSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
    isDone: zod_1.z.boolean().optional(),
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
const getChecklist = async (req, res) => {
    try {
        const { tripId } = req.params;
        const items = await prisma_1.default.checklistItem.findMany({
            where: { tripId },
            orderBy: { createdAt: 'asc' },
        });
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getChecklist = getChecklist;
const createChecklistItem = async (req, res) => {
    try {
        const { tripId } = req.params;
        const data = checklistSchema.parse(req.body);
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const item = await prisma_1.default.checklistItem.create({
            data: { ...data, tripId },
        });
        res.status(201).json(item);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createChecklistItem = createChecklistItem;
const updateChecklistItem = async (req, res) => {
    try {
        const { tripId, id } = req.params;
        const data = checklistSchema.partial().parse(req.body);
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const item = await prisma_1.default.checklistItem.update({
            where: { id },
            data,
        });
        res.json(item);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateChecklistItem = updateChecklistItem;
const deleteChecklistItem = async (req, res) => {
    try {
        const { tripId, id } = req.params;
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        await prisma_1.default.checklistItem.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteChecklistItem = deleteChecklistItem;
