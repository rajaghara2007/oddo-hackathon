"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import PackingList from "@/components/trek/PackingList";
import Journal from "@/components/trek/Journal";

// Leaflet touches `window` on import, so the map must be client-only and
// loaded lazily — SSR-rendering it throws.
const TripMap = dynamic(() => import("@/components/trek/TripMap"), { ssr: false });

type Stop = {
  id: string;
  orderIndex: number;
  arrivalDate: string;
  departureDate: string;
  city: { name: string; country: string; latitude: number | null; longitude: number | null };
  activities: { id: string; name: string; category: string; cost: string | null; currency: string }[];
};

type Expense = { id: string; amount: string; currency: string; date: string; category: string; paidBy: { name: string } };
type ChecklistItem = { id: string; content: string; isDone: boolean };

const TABS = ["itinerary", "map", "budget", "packing", "journal"] as const;
type Tab = (typeof TABS)[number];

export default function TripTabs({
  tripId,
  stops,
  expenses,
  checklist,
  budgetTotal,
}: {
  tripId: string;
  stops: Stop[];
  expenses: Expense[];
  checklist: ChecklistItem[];
  budgetTotal: number | null;
}) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("itinerary");

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const mapStops = stops.map((s) => ({
    id: s.id,
    name: s.city.name,
    country: s.city.country,
    latitude: s.city.latitude,
    longitude: s.city.longitude,
    order: s.orderIndex,
  }));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 border-b border-ink/10 dark:border-white/10 pb-4">
        {TABS.map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`tab-btn ${tab === key ? "tab-btn-active" : "tab-btn-inactive"}`}
          >
            {t(`trip.${key}`)}
          </button>
        ))}
      </div>

      {tab === "itinerary" && (
        <section>
          {stops.length === 0 ? (
            <p className="text-ink/50 dark:text-paper/50 text-sm">No stops added yet.</p>
          ) : (
            <div className="space-y-4">
              {stops.map((stop, i) => (
                <div key={stop.id} className="card">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-route">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg font-semibold">{stop.city.name}, {stop.city.country}</h3>
                    <span className="text-xs text-ink/50 dark:text-paper/50 ml-auto">
                      {new Date(stop.arrivalDate).toLocaleDateString()} – {new Date(stop.departureDate).toLocaleDateString()}
                    </span>
                  </div>
                  {stop.activities.length > 0 && (
                    <ul className="mt-3 space-y-1.5 pl-6">
                      {stop.activities.map((a) => (
                        <li key={a.id} className="text-sm text-ink/70 dark:text-paper/70 flex justify-between">
                          <span>{a.name} <span className="text-xs text-ink/40 dark:text-paper/40 font-mono">· {a.category}</span></span>
                          {a.cost && <span className="font-mono text-xs">{a.currency} {Number(a.cost).toFixed(2)}</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {checklist.length > 0 && (
            <div className="mt-10">
              <p className="label-eyebrow mb-4">{t("trip.checklist")}</p>
              <ul className="space-y-2">
                {checklist.map((item) => (
                  <li key={item.id} className="flex items-center gap-2 text-sm">
                    <span className={item.isDone ? "text-route" : "text-ink/30 dark:text-paper/30"}>{item.isDone ? "✓" : "○"}</span>
                    <span className={item.isDone ? "line-through text-ink/40 dark:text-paper/40" : ""}>{item.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {tab === "map" && <TripMap stops={mapStops} />}

      {tab === "budget" && (
        <section>
          <div className="card mb-6 flex items-center justify-between">
            <div>
              <p className="label-eyebrow mb-1">{t("trip.budget")}</p>
              <p className="text-2xl font-semibold">
                ${totalSpent.toFixed(2)}
                {budgetTotal !== null && <span className="text-ink/40 dark:text-paper/40 text-lg"> / ${budgetTotal.toFixed(2)}</span>}
              </p>
            </div>
            {budgetTotal !== null && (
              <div className="w-40 h-2 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${totalSpent > budgetTotal ? "bg-compass" : "bg-route"}`}
                  style={{ width: `${Math.min(100, (totalSpent / budgetTotal) * 100)}%` }}
                />
              </div>
            )}
          </div>
          {expenses.length === 0 ? (
            <p className="text-sm text-ink/50 dark:text-paper/50">No expenses logged yet.</p>
          ) : (
            <ul className="space-y-2">
              {expenses.map((e) => (
                <li key={e.id} className="card !py-3 !px-4 flex items-center justify-between text-sm">
                  <span>
                    <span className="font-mono text-xs text-ink/40 dark:text-paper/40 mr-2">{e.category}</span>
                    {new Date(e.date).toLocaleDateString()} · paid by {e.paidBy.name}
                  </span>
                  <span className="font-mono font-medium">{e.currency} {Number(e.amount).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {tab === "packing" && <PackingList storageKey={`gt_packing_${tripId}`} />}

      {tab === "journal" && <Journal storageKey={`gt_journal_${tripId}`} />}
    </div>
  );
}
