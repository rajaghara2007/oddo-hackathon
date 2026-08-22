import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "../components/Navbar";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = getSessionFromCookies();
  // if (!session) redirect("/login");

  let trips: any[] = [];
  if (session) {
    trips = await prisma.trip.findMany({
      where: {
        OR: [
          { ownerId: session.userId },
          { collaborators: { some: { userId: session.userId } } },
        ],
      },
      include: { _count: { select: { stops: true } } },
      orderBy: { startDate: "asc" },
    });
  }

  // Dates/Decimals aren't serializable across the server->client boundary as-is
  const serializedTrips = trips.map((t) => ({
    id: t.id,
    title: t.title,
    status: t.status,
    startDate: t.startDate.toISOString(),
    endDate: t.endDate.toISOString(),
    stopCount: t._count.stops,
  }));

  return (
    <>
      <Navbar signedIn />
      <DashboardClient trips={serializedTrips} />
    </>
  );
}
