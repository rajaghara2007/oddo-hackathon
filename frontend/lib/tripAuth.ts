import { prisma } from "@/lib/prisma";

export type TripAccess = { canView: boolean; canEdit: boolean; isOwner: boolean };

/**
 * Central place that decides what a given user can do with a given trip.
 * Every trip-scoped API route should call this instead of re-deriving
 * access rules inline, so permission logic can't drift between routes.
 */
export async function getTripAccess(tripId: string, userId: string): Promise<TripAccess> {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: {
      ownerId: true,
      isPublic: true,
      collaborators: { where: { userId }, select: { role: true } },
    },
  });

  if (!trip) return { canView: false, canEdit: false, isOwner: false };

  const isOwner = trip.ownerId === userId;
  const membership = trip.collaborators[0];
  const role = isOwner ? "OWNER" : membership?.role;

  return {
    isOwner,
    canView: isOwner || !!membership || trip.isPublic,
    canEdit: isOwner || role === "EDITOR",
  };
}
