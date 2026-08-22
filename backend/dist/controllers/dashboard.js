"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const trips = await prisma_1.default.trip.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    { collaborators: { some: { userId } } }
                ]
            },
            include: { expenses: true },
        });
        const upcomingTrips = trips.filter(t => t.startDate > now && t.status !== "CANCELLED");
        const activeTrips = trips.filter(t => t.startDate <= now && t.endDate >= now && t.status !== "CANCELLED");
        const completedTrips = trips.filter(t => t.endDate < now || t.status === "COMPLETED");
        const totalBudget = trips.reduce((acc, t) => acc + (t.budgetTotal ? Number(t.budgetTotal) : 0), 0);
        const totalSpending = trips.reduce((acc, trip) => {
            const tripSpent = trip.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
            return acc + tripSpent;
        }, 0);
        // Recent trips (last 3)
        const recentTrips = [...trips].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 3);
        res.json({
            stats: {
                upcomingCount: upcomingTrips.length,
                activeCount: activeTrips.length,
                completedCount: completedTrips.length,
                totalBudget,
                totalSpending,
            },
            recentTrips,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getDashboardStats = getDashboardStats;
