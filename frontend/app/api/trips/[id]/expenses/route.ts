import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionFromCookies } from "@/lib/auth";
import { getTripAccess } from "@/lib/tripAuth";

const CreateExpenseSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().min(1).max(10).default("USD"),
  category: z.enum(["SIGHTSEEING", "FOOD", "TRANSPORT", "ACCOMMODATION", "ADVENTURE", "CULTURE", "SHOPPING", "OTHER"]),
  date: z.string(),
  notes: z.string().optional(),
  activityId: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromCookies();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const access = await getTripAccess(params.id, session.userId);
  if (!access.canView) return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  if (!access.canEdit) return NextResponse.json({ error: "You don't have permission to edit this trip" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = CreateExpenseSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

  const expense = await prisma.expense.create({
    data: {
      tripId: params.id,
      paidById: session.userId,
      ...parsed.data,
      date: new Date(parsed.data.date),
    },
  });

  return NextResponse.json({ expense }, { status: 201 });
}
