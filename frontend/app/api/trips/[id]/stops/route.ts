import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionFromCookies } from "@/lib/auth";
import { getTripAccess } from "@/lib/tripAuth";

const CreateStopSchema = z.object({
  cityName: z.string().min(1),
  country: z.string().min(1),
  arrivalDate: z.string(),
  departureDate: z.string(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromCookies();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const access = await getTripAccess(params.id, session.userId);
  if (!access.canView) return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  if (!access.canEdit) return NextResponse.json({ error: "You don't have permission to edit this trip" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = CreateStopSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

  const { cityName, country, arrivalDate, departureDate, notes } = parsed.data;

  // Reuse an existing city row instead of duplicating name/country per stop
  const city = await prisma.city.upsert({
    where: { name_country: { name: cityName, country } },
    update: {},
    create: { name: cityName, country },
  });

  const lastStop = await prisma.tripStop.findFirst({
    where: { tripId: params.id },
    orderBy: { orderIndex: "desc" },
  });

  const stop = await prisma.tripStop.create({
    data: {
      tripId: params.id,
      cityId: city.id,
      arrivalDate: new Date(arrivalDate),
      departureDate: new Date(departureDate),
      orderIndex: (lastStop?.orderIndex ?? -1) + 1,
      notes,
    },
    include: { city: true },
  });

  return NextResponse.json({ stop }, { status: 201 });
}
