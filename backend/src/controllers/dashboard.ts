// @ts-nocheck
import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const now = new Date();

    const trips = await prisma.trip.findMany({
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
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
