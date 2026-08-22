"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCollaborator = exports.inviteCollaborator = exports.getCollaborators = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const inviteSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(["OWNER", "EDITOR", "VIEWER"]).default("VIEWER"),
});
const getCollaborators = async (req, res) => {
    try {
        const { tripId } = req.params;
        const collaborators = await prisma_1.default.tripCollaborator.findMany({
            where: { tripId },
            include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
        });
        res.json(collaborators);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getCollaborators = getCollaborators;
const inviteCollaborator = async (req, res) => {
    try {
        const { tripId } = req.params;
        const { email, role } = inviteSchema.parse(req.body);
        const trip = await prisma_1.default.trip.findFirst({
            where: { id: tripId, ownerId: req.user.id }
        });
        if (!trip)
            return res.status(403).json({ error: "Forbidden. Only owner can invite." });
        const userToInvite = await prisma_1.default.user.findUnique({ where: { email } });
        if (!userToInvite)
            return res.status(404).json({ error: "User not found" });
        if (userToInvite.id === req.user.id) {
            return res.status(400).json({ error: "Cannot invite yourself" });
        }
        const collabo = await prisma_1.default.tripCollaborator.create({
            data: {
                tripId,
                userId: userToInvite.id,
                role,
            },
            include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
        });
        res.status(201).json(collabo);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            return res.status(400).json({ error: error.errors });
        if (error.code === 'P2002')
            return res.status(400).json({ error: "User is already a collaborator" });
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.inviteCollaborator = inviteCollaborator;
const removeCollaborator = async (req, res) => {
    try {
        const { tripId, userId } = req.params;
        const trip = await prisma_1.default.trip.findFirst({
            where: { id: tripId, ownerId: req.user.id }
        });
        if (!trip)
            return res.status(403).json({ error: "Forbidden. Only owner can remove." });
        await prisma_1.default.tripCollaborator.delete({
            where: { tripId_userId: { tripId, userId } }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.removeCollaborator = removeCollaborator;
