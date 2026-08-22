"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicTripById = exports.getPublicTrips = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getPublicTrips = async (req, res) => {
    try {
        const trips = await prisma_1.default.trip.findMany({
            where: { isPublic: true },
            include: { owner: { select: { name: true, avatarUrl: true } } },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
        res.json(trips);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getPublicTrips = getPublicTrips;
const getPublicTripById = async (req, res) => {
    try {
        const trip = await prisma_1.default.trip.findFirst({
            where: { id: req.params.id, isPublic: true },
            include: {
                owner: { select: { name: true, avatarUrl: true } },
                stops: { include: { city: true, activities: true }, orderBy: { orderIndex: 'asc' } },
            }
        });
        if (!trip)
            return res.status(404).json({ error: "Trip not found" });
        res.json(trip);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getPublicTripById = getPublicTripById;
