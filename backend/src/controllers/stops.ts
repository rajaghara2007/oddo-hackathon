// @ts-nocheck
import { Response } from "express";
import { z } from "zod";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth";

const stopSchema = z.object({
  cityId: z.string().uuid(),
  arrivalDate: z.string().datetime(),
  departureDate: z.string().datetime(),
  orderIndex: z.number().int(),
  notes: z.string().optional(),
});

// Helper to check trip access
const checkTripAccess = async (tripId: string, userId: string) => {
  return await prisma.trip.findFirst({
    where: {
      id: tripId,
      OR: [
        { ownerId: userId },
        { collaborators: { some: { userId, role: { in: ["OWNER", "EDITOR"] } } } }
      ]
    }
  });
};

export const getStops = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const stops = await prisma.tripStop.findMany({
      where: { tripId },
      orderBy: { orderIndex: 'asc' },
      include: { city: true },
    });
    res.json(stops);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createStop = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const data = stopSchema.parse(req.body);

    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const stop = await prisma.tripStop.create({
      data: { ...data, tripId },
      include: { city: true },
    });
    res.status(201).json(stop);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStop = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, id } = req.params;
    const data = stopSchema.partial().parse(req.body);

    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const stop = await prisma.tripStop.update({
      where: { id },
      data,
      include: { city: true },
    });
    res.json(stop);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteStop = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, id } = req.params;
    
    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    await prisma.tripStop.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
