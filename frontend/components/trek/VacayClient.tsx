"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, UserPlus, Sun, Building2 } from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  // returns 0=Mon … 6=Sun (ISO week)
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

// Demo highlighted ranges – (month 0-indexed, days)
const DEMO_HOLIDAYS: Record<string, string> = {
  "2026-0-1": "public",
  "2026-1-14": "company",
  "2026-3-3": "public",
  "2026-5-10": "user",
  "2026-5-11": "user",
  "2026-5-23": "user",
  "2026-5-24": "user",
  "2026-5-25": "user",
  "2026-5-29": "user",
  "2026-5-30": "user",
  "2026-7-27": "company",
  "2026-9-17": "user",
  "2026-9-18": "user",
};

// ─── Month card ──────────────────────────────────────────────────────────────
function MonthGrid({ year, month, today }: { year: number; month: number; today: Date }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="min-w-0">
      <h3 className="text-sm font-bold text-white mb-3">{MONTHS[month]}</h3>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <span key={d} className={`text-center text-[10px] font-bold pb-1 ${i >= 5 ? "text-gray-600" : "text-gray-500"}`}>{d}</span>
        ))}
      </div>
      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <span key={idx} />;
          const col = idx % 7;
          const isWeekend = col >= 5;
          const isToday = year === todayYear && month === todayMonth && day === todayDate;
          const key = `${year}-${month}-${day}`;
          const hlType = DEMO_HOLIDAYS[key];

          let bg = "";
          let dot = "";
          if (isToday) bg = "bg-indigo-500 text-white rounded-full";
          else if (hlType === "user") bg = "bg-indigo-500/25 text-indigo-300 rounded-sm";
          else if (hlType === "public") dot = "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-rose-400";
          else if (hlType === "company") dot = "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-amber-400";

          return (
            <div
              key={idx}
              className={`relative flex items-center justify-center h-7 text-[11px] font-medium cursor-pointer
                ${bg}
                ${!bg && isWeekend ? "text-gray-600" : ""}
                ${!bg && !isWeekend ? "text-gray-400 hover:bg-[#1E293B] hover:text-white rounded-sm" : ""}
                ${dot}
                transition-colors`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function VacayClient() {
  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 pt-20 pb-16 flex">

      {/* ── Left Sidebar ── */}
      <aside className="w-48 shrink-0 border-r border-indigo-500/10 px-4 py-8 flex flex-col gap-7">

        {/* Year selector */}
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">Year</p>
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => setYear(y => y - 1)} className="w-6 h-6 rounded-md bg-[#1E293B] hover:bg-[#334155] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="flex-1 text-center text-lg font-bold text-white">{year}</span>
            <button onClick={() => setYear(y => y + 1)} className="w-6 h-6 rounded-md bg-[#1E293B] hover:bg-[#334155] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => setYear(today.getFullYear())}
            className="px-3 py-1 bg-[#1E293B] border border-indigo-500/20 rounded-lg text-xs font-bold text-indigo-300 hover:text-white transition-colors"
          >
            {today.getFullYear()}
          </button>
        </div>

        {/* Persons */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Persons</p>
            <button className="text-gray-500 hover:text-orange-400 transition-colors">
              <UserPlus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 bg-[#1E293B] rounded-xl border border-indigo-500/20">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">D</div>
            <span className="text-xs text-gray-300 truncate">Demo User <span className="text-gray-500">(you)</span></span>
          </div>
        </div>

        {/* Legend */}
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">Legend</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-rose-400 shrink-0" />
              <span className="text-xs text-gray-400">Public Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-amber-400 shrink-0" />
              <span className="text-xs text-gray-400">Company Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#334155] border border-gray-600 shrink-0" />
              <span className="text-xs text-gray-400">Weekend</span>
            </div>
          </div>
        </div>

        {/* Entitlement */}
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">Entitlement {year}</p>
          <div className="bg-[#1E293B] border border-indigo-500/20 rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white">D</div>
              <span className="text-xs text-gray-300 truncate">Demo User <span className="text-gray-500">(you)</span></span>
              <span className="text-xs text-gray-500 ml-auto">8/30</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: "26.67%" }} />
            </div>
            <div className="grid grid-cols-3 text-center text-[10px] pt-1">
              <div><p className="text-gray-500">Days</p><p className="text-white font-bold">30</p></div>
              <div><p className="text-gray-500">Used</p><p className="text-orange-400 font-bold">8</p></div>
              <div><p className="text-gray-500">Left</p><p className="text-emerald-400 font-bold">22</p></div>
            </div>
          </div>
        </div>

      </aside>

      {/* ── Calendar Grid ── */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <motion.div
          key={year}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {MONTHS.map((_, i) => (
            <MonthGrid key={i} year={year} month={i} today={today} />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
