// @ts-nocheck
import { Response, Request } from "express";
import prisma from "../utils/prisma";

export const getPublicTrips = async (req: Request, res: Response) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { isPublic: true },
      include: { owner: { select: { name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPublicTripById = async (req: Request, res: Response) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id: req.params.id, isPublic: true },
      include: {
        owner: { select: { name: true, avatarUrl: true } },
        stops: { include: { city: true, activities: true }, orderBy: { orderIndex: 'asc' } },
      }
    });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
