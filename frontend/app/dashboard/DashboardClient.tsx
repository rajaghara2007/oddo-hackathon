"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type TripSummary = {
  id: string;
  title: string;
  status: string;
  startDate: string;
  endDate: string;
  stopCount: number;
};

export default function DashboardClient({ trips }: { trips: TripSummary[] }) {
  const { t } = useLanguage();
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <main className="max-w-5xl mx-auto px-8 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="label-eyebrow mb-2">{t("dashboard.subtitle")}</p>
          <h1 className="text-3xl font-semibold">{t("dashboard.title")}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-full border border-ink/15 dark:border-white/15 p-1">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded-full text-xs font-mono ${view === "grid" ? "bg-ink text-paper dark:bg-paper dark:text-ink" : "text-ink/50 dark:text-paper/50"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-full text-xs font-mono ${view === "list" ? "bg-ink text-paper dark:bg-paper dark:text-ink" : "text-ink/50 dark:text-paper/50"}`}
            >
              List
            </button>
          </div>
          <Link href="/trips/new" className="btn-primary">{t("dashboard.newTrip")}</Link>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-ink/60 dark:text-paper/60 mb-4">{t("dashboard.empty")}</p>
          <Link href="/trips/new" className="btn-primary">{t("dashboard.emptyCta")}</Link>
        </div>
      ) : (
        <div className={view === "grid" ? "grid md:grid-cols-2 gap-5" : "space-y-3"}>
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className={`card hover:border-compass/40 transition-colors block ${view === "list" ? "flex items-center justify-between" : ""}`}
            >
              <div>
                <p className="label-eyebrow mb-1">{trip.status.replace("_", " ")}</p>
                <h3 className="text-xl font-semibold mb-1">{trip.title}</h3>
                <p className="text-sm text-ink/60 dark:text-paper/60">
                  {new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
              <p className="text-xs font-mono text-route mt-3">
                {trip.stopCount} stop{trip.stopCount !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
