import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionFromCookies } from "@/lib/auth";
import { getTripAccess } from "@/lib/tripAuth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromCookies();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const access = await getTripAccess(params.id, session.userId);
  if (!access.canView) return NextResponse.json({ error: "Trip not found" }, { status: 404 });

  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: {
      owner: { select: { id: true, name: true, avatarUrl: true } },
      stops: {
        orderBy: { orderIndex: "asc" },
        include: { city: true, activities: true },
      },
      expenses: { include: { paidBy: { select: { id: true, name: true } } } },
      checklist: true,
      collaborators: { include: { user: { select: { id: true, name: true, email: true } } } },
    },
  });

  return NextResponse.json({ trip, access });
}

const UpdateTripSchema = z.object({
  title: z.string().min(1).max(150).optional(),
  description: z.string().max(2000).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["PLANNING", "BOOKED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  budgetTotal: z.number().nonnegative().optional(),
  isPublic: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromCookies();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const access = await getTripAccess(params.id, session.userId);
  if (!access.canView) return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  if (!access.canEdit) return NextResponse.json({ error: "You don't have permission to edit this trip" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = UpdateTripSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.startDate) data.startDate = new Date(data.startDate as string);
  if (data.endDate) data.endDate = new Date(data.endDate as string);

  const trip = await prisma.trip.update({ where: { id: params.id }, data });
  return NextResponse.json({ trip });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromCookies();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const access = await getTripAccess(params.id, session.userId);
  if (!access.canView) return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  if (!access.isOwner) return NextResponse.json({ error: "Only the trip owner can delete this trip" }, { status: 403 });

  await prisma.trip.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
