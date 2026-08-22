// @ts-nocheck
import { Response } from "express";
import { z } from "zod";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth";

const expenseSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().optional(),
  category: z.enum(["SIGHTSEEING", "FOOD", "TRANSPORT", "ACCOMMODATION", "ADVENTURE", "CULTURE", "SHOPPING", "OTHER"]).optional(),
  date: z.string().datetime(),
  notes: z.string().optional(),
  activityId: z.string().uuid().optional(),
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

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const expenses = await prisma.expense.findMany({
      where: { tripId },
      orderBy: { date: 'desc' },
      include: { paidBy: { select: { id: true, name: true, avatarUrl: true } } },
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const data = expenseSchema.parse(req.body);

    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const expense = await prisma.expense.create({
      data: {
        ...data,
        tripId,
        paidById: req.user!.id,
      },
      include: { paidBy: { select: { id: true, name: true, avatarUrl: true } } },
    });
    res.status(201).json(expense);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, id } = req.params;
    const data = expenseSchema.partial().parse(req.body);

    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    const expense = await prisma.expense.update({
      where: { id },
      data,
    });
    res.json(expense);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, id } = req.params;
    
    const trip = await checkTripAccess(tripId, req.user!.id);
    if (!trip) return res.status(403).json({ error: "Forbidden" });

    await prisma.expense.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
