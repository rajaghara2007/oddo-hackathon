import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getCities = async (req: Request, res: Response) => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchCities = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res.json([]);
    }

    const cities = await prisma.city.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { country: { contains: q, mode: 'insensitive' } },
        ]
      },
      take: 10,
    });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
