import { Response } from "express";
import { z } from "zod";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth";

const activitySchema = z.object({
  name: z.string().min(1),
  category: z.enum(["SIGHTSEEING", "FOOD", "TRANSPORT", "ACCOMMODATION", "ADVENTURE", "CULTURE", "SHOPPING", "OTHER"]).optional(),
  cost: z.number().optional(),
  currency: z.string().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  bookingUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

// Helper to check trip access via stop
const checkTripAccessViaStop = async (stopId: string, userId: string) => {
  const stop = await prisma.tripStop.findUnique({
    where: { id: stopId },
    include: { trip: { include: { collaborators: true } } }
  });

  if (!stop) return null;
  
  const trip = stop.trip;
  if (trip.ownerId === userId) return trip;
  if (trip.collaborators.some(c => c.userId === userId && ["OWNER", "EDITOR"].includes(c.role))) return trip;
  return null;
};

export const getActivities = async (req: AuthRequest, res: Response) => {
  try {
    const { stopId } = req.params;
    const activities = await prisma.activity.findMany({
      where: { tripStopId: stopId },
      orderBy: { startTime: 'asc' },
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { stopId } = req.params;
    const data = activitySchema.parse(req.body);

    const trip = await checkTripAccessViaStop(stopId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const activity = await prisma.activity.create({
      data: { ...data, tripStopId: stopId },
    });
    res.status(201).json(activity);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { stopId, id } = req.params;
    const data = activitySchema.partial().parse(req.body);

    const trip = await checkTripAccessViaStop(stopId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const activity = await prisma.activity.update({
      where: { id },
      data,
    });
    res.json(activity);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { stopId, id } = req.params;
    
    const trip = await checkTripAccessViaStop(stopId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    await prisma.activity.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
