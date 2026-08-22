// @ts-nocheck
import { Response } from "express";
import { z } from "zod";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth";

const tripSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  isPublic: z.boolean().optional(),
  budgetTotal: z.number().optional(),
  status: z.enum(["PLANNING", "BOOKED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  coverImageUrl: z.string().url().optional(),
});

export const getTrips = async (req: AuthRequest, res: Response) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { ownerId: req.user!.id },
      orderBy: { startDate: 'asc' },
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const data = tripSchema.parse(req.body);
    const trip = await prisma.trip.create({
      data: {
        ...data,
        ownerId: req.user!.id,
      },
    });
    res.status(201).json(trip);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: (error as z.ZodError).errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: {
        id: req.params.id as string,
        OR: [
          { ownerId: req.user!.id },
          { collaborators: { some: { userId: req.user!.id } } },
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
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTrip = async (req: AuthRequest, res: Response) => {
  try {
    const data = tripSchema.partial().parse(req.body);
    
    // Check if user is owner or editor
    const trip = await prisma.trip.findFirst({
      where: {
        id: req.params.id as string,
        OR: [
          { ownerId: req.user!.id },
          { collaborators: { some: { userId: req.user!.id, role: { in: ["OWNER", "EDITOR"] } } } }
        ]
      }
    });

    if (!trip) {
      return res.status(403).json({ error: "Forbidden or Trip not found" });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: req.params.id as string },
      data,
    });
    res.json(updatedTrip);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: (error as z.ZodError).errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
  try {
    // Only owner can delete
    const trip = await prisma.trip.findFirst({
      where: { id: req.params.id as string, ownerId: req.user!.id },
    });

    if (!trip) {
      return res.status(403).json({ error: "Forbidden or Trip not found" });
    }

    await prisma.trip.delete({
      where: { id: req.params.id as string },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
