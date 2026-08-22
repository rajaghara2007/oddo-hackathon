import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@globetrotter.com" },
    update: {},
    create: {
      name: "Demo Traveler",
      email: "demo@globetrotter.com",
      passwordHash,
    },
  });

  const paris = await prisma.city.upsert({
    where: { name_country: { name: "Paris", country: "France" } },
    update: {},
    create: { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris" },
  });

  const rome = await prisma.city.upsert({
    where: { name_country: { name: "Rome", country: "Italy" } },
    update: {},
    create: { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964, timezone: "Europe/Rome" },
  });

  const trip = await prisma.trip.create({
    data: {
      ownerId: user.id,
      title: "Euro Summer",
      description: "Two-city hop through France and Italy",
      startDate: new Date("2026-06-01"),
      endDate: new Date("2026-06-10"),
      status: "PLANNING",
      budgetTotal: 2000,
      stops: {
        create: [
          {
            cityId: paris.id,
            arrivalDate: new Date("2026-06-01"),
            departureDate: new Date("2026-06-05"),
            orderIndex: 0,
            activities: {
              create: [
                { name: "Louvre Museum", category: "CULTURE", cost: 20, currency: "EUR" },
                { name: "Eiffel Tower Dinner", category: "FOOD", cost: 90, currency: "EUR" },
              ],
            },
          },
          {
            cityId: rome.id,
            arrivalDate: new Date("2026-06-05"),
            departureDate: new Date("2026-06-10"),
            orderIndex: 1,
            activities: {
              create: [{ name: "Colosseum Tour", category: "SIGHTSEEING", cost: 35, currency: "EUR" }],
            },
          },
        ],
      },
      checklist: {
        create: [{ content: "Passport" }, { content: "Travel adapter" }],
      },
    },
  });

  console.log("Seeded demo user (demo@globetrotter.com / password123) and trip:", trip.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
