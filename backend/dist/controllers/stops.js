"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStop = exports.updateStop = exports.createStop = exports.getStops = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const stopSchema = zod_1.z.object({
    cityId: zod_1.z.string().uuid(),
    arrivalDate: zod_1.z.string().datetime(),
    departureDate: zod_1.z.string().datetime(),
    orderIndex: zod_1.z.number().int(),
    notes: zod_1.z.string().optional(),
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
const getStops = async (req, res) => {
    try {
        const { tripId } = req.params;
        const stops = await prisma_1.default.tripStop.findMany({
            where: { tripId },
            orderBy: { orderIndex: 'asc' },
            include: { city: true },
        });
        res.json(stops);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getStops = getStops;
const createStop = async (req, res) => {
    try {
        const { tripId } = req.params;
        const data = stopSchema.parse(req.body);
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const stop = await prisma_1.default.tripStop.create({
            data: { ...data, tripId },
            include: { city: true },
        });
        res.status(201).json(stop);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createStop = createStop;
const updateStop = async (req, res) => {
    try {
        const { tripId, id } = req.params;
        const data = stopSchema.partial().parse(req.body);
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        const stop = await prisma_1.default.tripStop.update({
            where: { id },
            data,
            include: { city: true },
        });
        res.json(stop);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateStop = updateStop;
const deleteStop = async (req, res) => {
    try {
        const { tripId, id } = req.params;
        const trip = await checkTripAccess(tripId, req.user.id);
        if (!trip)
            return res.status(403).json({ error: "Forbidden" });
        await prisma_1.default.tripStop.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteStop = deleteStop;
