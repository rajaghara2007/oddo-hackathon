import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_here") as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true }
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
