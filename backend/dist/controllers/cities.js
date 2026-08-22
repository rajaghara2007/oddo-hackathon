"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCities = exports.getCities = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getCities = async (req, res) => {
    try {
        const cities = await prisma_1.default.city.findMany({
            orderBy: { name: 'asc' },
        });
        res.json(cities);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getCities = getCities;
const searchCities = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string") {
            return res.json([]);
        }
        const cities = await prisma_1.default.city.findMany({
            where: {
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { country: { contains: q, mode: 'insensitive' } },
                ]
            },
            take: 10,
        });
        res.json(cities);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.searchCities = searchCities;
