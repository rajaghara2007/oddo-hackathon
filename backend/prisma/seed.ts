import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create a demo user
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@tripora.com" },
    update: {},
    create: {
      name: "Demo Explorer",
      email: "demo@tripora.com",
      passwordHash,
    },
  });
  console.log(`User created: ${user.name}`);

  // 2. Create some sample cities
  const citiesData = [
    { name: "Kyoto", country: "Japan", latitude: 35.0116, longitude: 135.7681 },
    { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
    { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964 },
  ];

  const cities = [];
  for (const c of citiesData) {
    const city = await prisma.city.upsert({
      where: { name_country: { name: c.name, country: c.country } },
      update: {},
      create: c,
    });
    cities.push(city);
  }
  console.log(`Cities seeded.`);

  // 3. Create a sample trip
  const trip = await prisma.trip.create({
    data: {
      ownerId: user.id,
      title: "Autumn in Kyoto",
      description: "A cultural exploration of Japan's ancient capital.",
      startDate: new Date("2025-10-15T00:00:00Z"),
      endDate: new Date("2025-10-22T00:00:00Z"),
      status: "BOOKED",
      isPublic: true,
      budgetTotal: 3000.00,
      stops: {
        create: [
          {
            cityId: cities[0].id,
            arrivalDate: new Date("2025-10-15T12:00:00Z"),
            departureDate: new Date("2025-10-22T12:00:00Z"),
            orderIndex: 0,
            activities: {
              create: [
                {
                  name: "Kinkaku-ji (Golden Pavilion)",
                  category: "SIGHTSEEING",
                  cost: 10.00,
                  startTime: new Date("2025-10-16T09:00:00Z"),
                }
              ]
            }
          }
        ]
      },
      expenses: {
        create: [
          {
            paidById: user.id,
            amount: 1250,
            category: "TRANSPORT",
            date: new Date("2025-10-01T00:00:00Z"),
            notes: "Flights",
          }
        ]
      },
      checklist: {
        create: [
          { content: "Buy JR Pass", isDone: true },
          { content: "Pack international adapter", isDone: false }
        ]
      }
    }
  });

  console.log(`Sample trip created: ${trip.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
