"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrip = exports.updateTrip = exports.getTripById = exports.createTrip = exports.getTrips = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const tripSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    startDate: zod_1.z.string().datetime(),
    endDate: zod_1.z.string().datetime(),
    isPublic: zod_1.z.boolean().optional(),
    budgetTotal: zod_1.z.number().optional(),
    status: zod_1.z.enum(["PLANNING", "BOOKED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
    coverImageUrl: zod_1.z.string().url().optional(),
});
const getTrips = async (req, res) => {
    try {
        const trips = await prisma_1.default.trip.findMany({
            where: { ownerId: req.user.id },
            orderBy: { startDate: 'asc' },
        });
        res.json(trips);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getTrips = getTrips;
const createTrip = async (req, res) => {
    try {
        const data = tripSchema.parse(req.body);
        const trip = await prisma_1.default.trip.create({
            data: {
                ...data,
                ownerId: req.user.id,
            },
        });
        res.status(201).json(trip);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createTrip = createTrip;
const getTripById = async (req, res) => {
    try {
        const trip = await prisma_1.default.trip.findFirst({
            where: {
                id: req.params.id,
                OR: [
                    { ownerId: req.user.id },
                    { collaborators: { some: { userId: req.user.id } } },
                ],
            },
            include: {
                stops: {
                    include: { city: true, activities: true },
                    orderBy: { orderIndex: 'asc' },
                },
                expenses: { orderBy: { date: 'desc' } },
                checklist: { orderBy: { createdAt: 'asc' } },
                collaborators: { include: { user: { select: { id: true, name: true, avatarUrl: true } } } },
            },
        });
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }
        res.json(trip);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getTripById = getTripById;
const updateTrip = async (req, res) => {
    try {
        const data = tripSchema.partial().parse(req.body);
        // Check if user is owner or editor
        const trip = await prisma_1.default.trip.findFirst({
            where: {
                id: req.params.id,
                OR: [
                    { ownerId: req.user.id },
                    { collaborators: { some: { userId: req.user.id, role: { in: ["OWNER", "EDITOR"] } } } }
                ]
            }
        });
        if (!trip) {
            return res.status(403).json({ error: "Forbidden or Trip not found" });
        }
        const updatedTrip = await prisma_1.default.trip.update({
            where: { id: req.params.id },
            data,
        });
        res.json(updatedTrip);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateTrip = updateTrip;
const deleteTrip = async (req, res) => {
    try {
        // Only owner can delete
        const trip = await prisma_1.default.trip.findFirst({
            where: { id: req.params.id, ownerId: req.user.id },
        });
        if (!trip) {
            return res.status(403).json({ error: "Forbidden or Trip not found" });
        }
        await prisma_1.default.trip.delete({
            where: { id: req.params.id },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteTrip = deleteTrip;
