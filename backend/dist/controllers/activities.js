"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivities = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const activitySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    category: zod_1.z.enum(["SIGHTSEEING", "FOOD", "TRANSPORT", "ACCOMMODATION", "ADVENTURE", "CULTURE", "SHOPPING", "OTHER"]).optional(),
    cost: zod_1.z.number().optional(),
    currency: zod_1.z.string().optional(),
    startTime: zod_1.z.string().datetime().optional(),
    endTime: zod_1.z.string().datetime().optional(),
    bookingUrl: zod_1.z.string().url().optional(),
    notes: zod_1.z.string().optional(),
});
// Helper to check trip access via stop
const checkTripAccessViaStop = async (stopId, userId) => {
    const stop = await prisma_1.default.tripStop.findUnique({
        where: { id: stopId },
        include: { trip: { include: { collaborators: true } } }
    });
    if (!stop)
        return null;
    const trip = stop.trip;
    if (trip.ownerId === userId)
        return trip;
    if (trip.collaborators.some(c => c.userId === userId && ["OWNER", "EDITOR"].includes(c.role)))
        return trip;
    return null;
};
const getActivities = async (req, res) => {
    try {
        const { stopId } = req.params;
        const activities = await prisma_1.default.activity.findMany({
            where: { tripStopId: stopId },
            orderBy: { startTime: 'asc' },
        });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getActivities = getActivities;
const createActivity = async (req, res) => {
    try {
        const { stopId } = req.params;
        const data = activitySchema.parse(req.body);
        const trip = await checkTripAccessViaStop(stopId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const activity = await prisma_1.default.activity.create({
            data: { ...data, tripStopId: stopId },
        });
        res.status(201).json(activity);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createActivity = createActivity;
const updateActivity = async (req, res) => {
    try {
        const { stopId, id } = req.params;
        const data = activitySchema.partial().parse(req.body);
        const trip = await checkTripAccessViaStop(stopId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const activity = await prisma_1.default.activity.update({
            where: { id },
            data,
        });
        res.json(activity);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateActivity = updateActivity;
const deleteActivity = async (req, res) => {
    try {
        const { stopId, id } = req.params;
        const trip = await checkTripAccessViaStop(stopId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        await prisma_1.default.activity.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteActivity = deleteActivity;
