import { Response, Request } from "express";
import { z } from "zod";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth";

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["OWNER", "EDITOR", "VIEWER"]).default("VIEWER"),
});

export const getCollaborators = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const collaborators = await prisma.tripCollaborator.findMany({
      where: { tripId },
      include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
    });
    res.json(collaborators);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const inviteCollaborator = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const { email, role } = inviteSchema.parse(req.body);

    const trip = await prisma.trip.findFirst({
      where: { id: tripId, ownerId: req.user!.id }
    });
    if (!trip) return res.status(403).json({ error: "Forbidden. Only owner can invite." });

    const userToInvite = await prisma.user.findUnique({ where: { email } });
    if (!userToInvite) return res.status(404).json({ error: "User not found" });

    if (userToInvite.id === req.user!.id) {
      return res.status(400).json({ error: "Cannot invite yourself" });
    }

    const collabo = await prisma.tripCollaborator.create({
      data: {
        tripId,
        userId: userToInvite.id,
        role,
      },
      include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
    });
    res.status(201).json(collabo);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    if (error.code === 'P2002') return res.status(400).json({ error: "User is already a collaborator" });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeCollaborator = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, userId } = req.params;
    
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, ownerId: req.user!.id }
    });
    if (!trip) return res.status(403).json({ error: "Forbidden. Only owner can remove." });

    await prisma.tripCollaborator.delete({
      where: { tripId_userId: { tripId, userId } }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
