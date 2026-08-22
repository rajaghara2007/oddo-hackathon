import { Response } from "express";
import { z } from "zod";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth";

const checklistSchema = z.object({
  content: z.string().min(1),
  isDone: z.boolean().optional(),
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

export const getChecklist = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const items = await prisma.checklistItem.findMany({
      where: { tripId },
      orderBy: { createdAt: 'asc' },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createChecklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const data = checklistSchema.parse(req.body);

    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const item = await prisma.checklistItem.create({
      data: { ...data, tripId },
    });
    res.status(201).json(item);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateChecklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, id } = req.params;
    const data = checklistSchema.partial().parse(req.body);

    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const item = await prisma.checklistItem.update({
      where: { id },
      data,
    });
    res.json(item);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteChecklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, id } = req.params;
    
    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    await prisma.checklistItem.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
