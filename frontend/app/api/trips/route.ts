import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionFromCookies } from "@/lib/auth";

const CreateTripSchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(2000).optional(),
  startDate: z.string(),
  endDate: z.string(),
  budgetTotal: z.number().nonnegative().optional(),
});

export async function GET() {
  const session = getSessionFromCookies();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // Trips the user owns OR collaborates on - real many-to-many query
  const trips = await prisma.trip.findMany({
    where: {
      OR: [
        { ownerId: session.userId },
        { collaborators: { some: { userId: session.userId } } },
      ],
    },
    include: {
      _count: { select: { stops: true } },
      owner: { select: { id: true, name: true } },
    },
    orderBy: { startDate: "asc" },
  });

  return NextResponse.json({ trips });
}

export async function POST(req: NextRequest) {
  const session = getSessionFromCookies();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = CreateTripSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const { title, description, startDate, endDate, budgetTotal } = parsed.data;

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end < start) {
    return NextResponse.json({ error: "End date cannot be before start date" }, { status: 400 });
  }

  const trip = await prisma.trip.create({
    data: {
      ownerId: session.userId,
      title,
      description,
      startDate: start,
      endDate: end,
      budgetTotal,
      collaborators: {
        create: { userId: session.userId, role: "OWNER", acceptedAt: new Date() },
      },
    },
  });

  return NextResponse.json({ trip }, { status: 201 });
}
