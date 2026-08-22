"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  MapPin, Calendar, Users, Wallet, ChevronRight, ChevronLeft,
  Shuffle, Sparkles, Clock, Banknote, Camera, Mountain,
  Utensils, TreePine, Coffee, Moon, Send, RotateCcw,
  Star, Download, Share2, BookmarkPlus, CheckCircle, RefreshCw,
  Info, Map
} from "lucide-react";
import {
  TripInput, DEFAULT_INPUT, generateTrip, GeneratedTrip,
  OPTIMIZE_OPTIONS, ADAPT_SCENARIOS, POPULAR_DESTINATIONS, Activity
} from "@/data/tripArchitect";
import type { TravelDNA } from "@/data/travelDNA";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  transport: <MapPin className="w-4 h-4" />,
  hotel: <BookmarkPlus className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  activity: <Mountain className="w-4 h-4" />,
  landmark: <Camera className="w-4 h-4" />,
  nature: <TreePine className="w-4 h-4" />,
  photo: <Camera className="w-4 h-4" />,
  nightlife: <Moon className="w-4 h-4" />,
};
const CATEGORY_COLORS: Record<string, string> = {
  transport: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  hotel: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  food: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  activity: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  landmark: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  nature: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  photo: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  nightlife: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

// ─── TRAIT SLIDER ─────────────────────────────────────────────────────────────
function TraitSlider({ label, emoji, value, onChange, color = "from-orange-500 to-rose-500" }:
  { label: string; emoji: string; value: number; onChange: (v: number) => void; color?: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{emoji} {label}</span>
        <span className="font-bold text-white w-10 text-right">{value}%</span>
      </div>
      <div className="relative h-2 bg-[#0B0F19] rounded-full overflow-hidden">
        <motion.div animate={{ width: `${value}%` }} transition={{ duration: 0.1 }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`} />
        <input type="range" min={0} max={100} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 opacity-0 w-full cursor-pointer" />
      </div>
    </div>
  );
}

// ─── GENERATION ANIMATION ─────────────────────────────────────────────────────
const GEN_STEPS = [
  "Understanding your Travel DNA…",
  "Finding authentic experiences…",
  "Optimizing your route…",
  "Balancing your budget…",
  "Scheduling day by day…",
  "Building your journey…",
];

function GeneratingOverlay({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(i => {
        const next = i + 1;
        if (next >= GEN_STEPS.length) { clearInterval(iv); setTimeout(onDone, 500); }
        return Math.min(next, GEN_STEPS.length - 1);
      });
      setPct(p => Math.min(100, p + 100 / GEN_STEPS.length));
    }, 700);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19]/95 backdrop-blur-xl flex flex-col items-center justify-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md px-8">
        <div className="text-6xl mb-8 animate-pulse">✨</div>
        <h2 className="text-3xl font-bold text-white font-serif mb-2">Building Your Journey</h2>
        <p className="text-gray-400 mb-10">GlobeTrotter AI is crafting your perfect trip…</p>
        <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden mb-6">
          <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" />
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} className="text-indigo-300 font-medium">
            {GEN_STEPS[idx]}
          </motion.p>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-6">
          {GEN_STEPS.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= idx ? "bg-orange-500" : "bg-[#1E293B]"}`} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── ACTIVITY CARD ────────────────────────────────────────────────────────────
function ActivityCard({ act, currency }: { act: Activity; currency: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div whileHover={{ y: -3 }}
      className="group bg-[#1E293B]/60 border border-indigo-500/10 rounded-2xl overflow-hidden flex gap-0">
      {/* Image */}
      <div className="w-24 h-24 md:w-28 md:h-auto shrink-0 overflow-hidden">
        <img src={act.image} alt={act.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80" />
      </div>
      {/* Content */}
      <div className="flex-1 p-3 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${CATEGORY_COLORS[act.category]}`}>
              {CATEGORY_ICONS[act.category]} {act.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {act.time}</span>
            <span className="text-xs text-gray-500">{act.duration}</span>
          </div>
          <span className="text-xs font-bold text-white shrink-0">
            {act.cost === 0 ? <span className="text-emerald-400">Free</span> : `${currency}${act.cost.toLocaleString()}`}
          </span>
        </div>
        <h4 className="text-sm font-bold text-white mb-1 truncate">{act.title}</h4>
        {act.travelTime && <p className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {act.travelTime}</p>}
        <button onClick={() => setExpanded(!expanded)}
          className="text-[10px] text-orange-400 font-bold hover:text-orange-300 transition-colors flex items-center gap-1">
          <Info className="w-3 h-3" /> {expanded ? "Less" : "Why this?"}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="text-[11px] text-gray-400 mt-1 leading-relaxed overflow-hidden">
              {act.reason}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── BUDGET PANEL ──────────────────────────────────────────────────────────────
function BudgetPanel({ trip }: { trip: GeneratedTrip }) {
  const { budget, currency } = trip;
  const categories = [
    { label: "Accommodation", value: budget.accommodation, color: "bg-indigo-500", pct: (budget.accommodation / budget.total) * 100 },
    { label: "Transport", value: budget.transport, color: "bg-sky-500", pct: (budget.transport / budget.total) * 100 },
    { label: "Food", value: budget.food, color: "bg-amber-500", pct: (budget.food / budget.total) * 100 },
    { label: "Activities", value: budget.activities, color: "bg-orange-500", pct: (budget.activities / budget.total) * 100 },
    { label: "Emergency", value: budget.emergency, color: "bg-rose-500", pct: (budget.emergency / budget.total) * 100 },
  ];
  const health = budget.remaining >= 0 ? "good" : "over";
  return (
    <div className="bg-[#1E293B]/60 border border-indigo-500/20 rounded-3xl p-6">
      <h3 className="text-lg font-bold text-white font-serif mb-1">Smart Budget</h3>
      <p className="text-xs text-gray-500 mb-5">AI-optimized spending breakdown</p>
      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-0.5">
        {categories.map(c => (
          <motion.div key={c.label} initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }} className={`${c.color} h-full`} />
        ))}
      </div>
      {/* Line items */}
      <div className="space-y-3 mb-5">
        {categories.map(c => (
          <div key={c.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${c.color}`} />
              <span className="text-gray-400">{c.label}</span>
            </div>
            <span className="font-bold text-white">{currency}{c.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-indigo-500/10 pt-4 space-y-2">
        <div className="flex justify-between text-sm font-bold">
          <span className="text-gray-300">Total Budget</span>
          <span className="text-white">{currency}{budget.total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-gray-300">Estimated</span>
          <span className="text-white">{currency}{(budget.total - budget.remaining).toLocaleString()}</span>
        </div>
        <div className={`flex justify-between text-sm font-bold pt-2 border-t border-indigo-500/10 ${health === "good" ? "text-emerald-400" : "text-rose-400"}`}>
          <span>{health === "good" ? "✅ Remaining" : "⚠️ Over Budget"}</span>
          <span>{currency}{Math.abs(budget.remaining).toLocaleString()}</span>
        </div>
      </div>
      <div className={`mt-4 p-3 rounded-xl text-xs font-medium ${health === "good" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300" : "bg-rose-500/10 border border-rose-500/20 text-rose-300"}`}>
        {health === "good"
          ? `🎉 You're ${currency}${budget.remaining.toLocaleString()} under budget. Consider a splurge dinner!`
          : `⚠️ You're ${currency}${Math.abs(budget.remaining).toLocaleString()} over budget. Try the 💰 optimize option.`}
      </div>
    </div>
  );
}

// ─── OPTIMIZE PANEL ───────────────────────────────────────────────────────────
function OptimizePanel({ onOptimize }: { onOptimize: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptimize = (id: string) => {
    setSelected(id);
    onOptimize(id);
  };

  const handleAiSend = () => {
    if (!aiInput.trim()) return;
    setLoading(true);
    setAiResponse("");
    setTimeout(() => {
      const responses: Record<string, string> = {
        romantic: "✨ Added a candlelit dinner at a cliffside restaurant on Day 3 and a sunset boat cruise on Day 4.",
        trek: "✨ Removed the Chandrakhani trek from Day 4. Replaced with a relaxing spa session and cultural village tour.",
        budget: "✨ Switched accommodation to a boutique guesthouse (saving ₹800/night) and optimized transport routes.",
        default: "✨ Updated your itinerary based on your request. Your journey has been redesigned.",
      };
      const lower = aiInput.toLowerCase();
      const key = lower.includes("romantic") ? "romantic" : lower.includes("trek") ? "trek" : lower.includes("budget") || lower.includes("cheap") ? "budget" : "default";
      setAiResponse(responses[key]);
      setAiInput("");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#1E293B]/60 border border-indigo-500/20 rounded-3xl p-6 space-y-5">
      <div>
        <h3 className="text-lg font-bold text-white font-serif mb-1">✨ Optimize My Trip</h3>
        <p className="text-xs text-gray-500">Let GlobeTrotter AI redesign your journey</p>
      </div>
      {/* Quick optimize buttons */}
      <div className="grid grid-cols-2 gap-2">
        {OPTIMIZE_OPTIONS.map(opt => (
          <motion.button key={opt.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => handleOptimize(opt.id)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all border text-left
              ${selected === opt.id ? "border-orange-500 bg-orange-500/10 text-orange-300" : "border-indigo-500/20 bg-[#0B0F19]/50 text-gray-400 hover:border-indigo-400/40 hover:text-white"}`}>
            <span className="text-base">{opt.emoji}</span> {opt.label}
          </motion.button>
        ))}
      </div>
      {/* Natural language */}
      <div>
        <p className="text-xs font-bold text-gray-400 mb-2">Or tell GlobeTrotter AI…</p>
        <div className="relative">
          <input value={aiInput} onChange={e => setAiInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAiSend()}
            placeholder={"\"Add a romantic dinner\" or \"Remove Day 3 trek\"…"}
            className="w-full bg-[#0B0F19] border border-indigo-500/20 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-gray-600 outline-none focus:border-orange-500/50 transition-colors" />
          <button onClick={handleAiSend}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-300 transition-colors">
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Remove the trek from Day 3", "Add a romantic dinner", "Reduce budget to ₹32,000"].map(s => (
            <button key={s} onClick={() => setAiInput(s)}
              className="text-[10px] px-2.5 py-1 rounded-full bg-[#0B0F19] border border-indigo-500/15 text-gray-500 hover:text-gray-300 hover:border-indigo-400/30 transition-colors">
              {s}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {aiResponse && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 font-medium">
            {aiResponse}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ADAPT PANEL ──────────────────────────────────────────────────────────────
function AdaptPanel() {
  const [applied, setApplied] = useState<string | null>(null);
  return (
    <div className="bg-[#1E293B]/60 border border-indigo-500/20 rounded-3xl p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white font-serif mb-1">🔄 Adapt My Trip</h3>
        <p className="text-xs text-gray-500">Plans change — GlobeTrotter adapts with you</p>
      </div>
      <div className="space-y-2">
        {ADAPT_SCENARIOS.map(s => (
          <motion.button key={s.id} whileHover={{ x: 4 }}
            onClick={() => setApplied(s.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border text-left
              ${applied === s.id ? "border-orange-500/50 bg-orange-500/10 text-orange-300" : "border-indigo-500/15 bg-[#0B0F19]/50 text-gray-400 hover:text-white hover:border-indigo-400/30"}`}>
            <span className="text-lg">{s.emoji}</span>
            <span>{s.label}</span>
            {applied === s.id && <CheckCircle className="w-4 h-4 ml-auto text-orange-400" />}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {applied && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
            ✨ <strong>Your itinerary has been redesigned.</strong> Affected activities have been replaced with better alternatives.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ITINERARY VIEW ───────────────────────────────────────────────────────────
function ItineraryView({ trip, dna, onReset }: { trip: GeneratedTrip; dna: TravelDNA | null; onReset: () => void }) {
  const [activeDay, setActiveDay] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    try {
      const trips = JSON.parse(localStorage.getItem("saved_trips") ?? "[]");
      trips.push({ id: trip.id, destination: trip.destination, days: trip.days, savedAt: new Date().toISOString() });
      localStorage.setItem("saved_trips", JSON.stringify(trips));
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] pb-16">
      {/* Hero */}
      <div className="relative h-72 md:h-96">
        <img src={trip.coverImage} alt={trip.destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-5xl mx-auto">
          {/* DNA tag */}
          {dna?.archetype && (
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-bold">
                Using your Travel DNA
              </span>
              <span className="text-xs text-gray-400">{dna.archetypeIcon} {dna.archetype} · 🍜 Food Lover · 📸 Photographer</span>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-2">
            {trip.archetypeIcon} {trip.destination} — {trip.days} Day Journey
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> from {trip.origin || "Your City"}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {trip.travelers} traveller{trip.travelers > 1 ? "s" : ""}</span>
            <span className="flex items-center gap-1"><Banknote className="w-4 h-4" /> {trip.currency}{trip.budgetTotal.toLocaleString()} budget</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-amber-400">Trip Score: {trip.tripScore}/100</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8">
        {/* Highlights */}
        {trip.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {trip.highlights.map(h => (
              <span key={h} className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">{h}</span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-10">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${saved ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"}`}>
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><BookmarkPlus className="w-4 h-4" /> Save Trip</>}
          </motion.button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-[#1E293B] border border-indigo-500/20 text-gray-300 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-[#1E293B] border border-indigo-500/20 text-gray-300 hover:text-white transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-[#1E293B] border border-indigo-500/20 text-gray-400 hover:text-white transition-colors">
            <RotateCcw className="w-4 h-4" /> Plan Another
          </button>
        </div>

        {/* Main layout: itinerary + sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Itinerary */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white font-serif mb-6">Your Itinerary</h2>

            {/* Day tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
              {trip.days_plan.map((d, i) => (
                <button key={i} onClick={() => setActiveDay(i)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${activeDay === i ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "bg-[#1E293B] border-indigo-500/20 text-gray-400 hover:text-white"}`}>
                  <span>{d.emoji}</span> Day {d.day}
                </button>
              ))}
            </div>

            {/* Day plan */}
            <AnimatePresence mode="wait">
              {trip.days_plan[activeDay] && (
                <motion.div key={activeDay} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-indigo-500/10">
                    <span className="text-3xl">{trip.days_plan[activeDay].emoji}</span>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-orange-400">Day {trip.days_plan[activeDay].day}</p>
                      <h3 className="text-xl font-bold text-white font-serif">{trip.days_plan[activeDay].theme}</h3>
                    </div>
                  </div>
                  {trip.days_plan[activeDay].activities.length > 0
                    ? trip.days_plan[activeDay].activities.map(act => (
                      <ActivityCard key={act.id} act={act} currency={trip.currency} />
                    ))
                    : <p className="text-gray-500 text-sm py-8 text-center">Free day — no structured activities. Explore at your own pace.</p>
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            <BudgetPanel trip={trip} />
            <OptimizePanel onOptimize={(id) => console.log("Optimize:", id)} />
            <AdaptPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PLANNER STEPS ────────────────────────────────────────────────────────────
const STEP_COUNT = 4;

function Step1({ input, update }: { input: TripInput; update: (k: keyof TripInput, v: any) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-orange-400" /> Destination</label>
        <input value={input.destination} onChange={e => update("destination", e.target.value)}
          placeholder="Where do you want to go?"
          className="w-full bg-[#0B0F19] border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-orange-500/50 transition-colors" />
        <div className="flex flex-wrap gap-2 mt-2">
          {POPULAR_DESTINATIONS.slice(0, 6).map(d => (
            <button key={d} onClick={() => update("destination", d)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors font-bold ${input.destination === d ? "border-orange-500 bg-orange-500/10 text-orange-300" : "border-indigo-500/20 text-gray-500 hover:text-gray-300"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-indigo-400" /> Starting From</label>
        <input value={input.origin} onChange={e => update("origin", e.target.value)}
          placeholder="Your city / airport"
          className="w-full bg-[#0B0F19] border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-orange-500/50 transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-400" /> Start Date</label>
          <input type="date" value={input.startDate} onChange={e => update("startDate", e.target.value)}
            className="w-full bg-[#0B0F19] border border-indigo-500/20 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500/50 transition-colors [color-scheme:dark]" />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-400" /> End Date</label>
          <input type="date" value={input.endDate} onChange={e => update("endDate", e.target.value)}
            className="w-full bg-[#0B0F19] border border-indigo-500/20 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500/50 transition-colors [color-scheme:dark]" />
        </div>
      </div>
      <div>
        <label className="text-sm font-bold text-gray-300 mb-1.5 block">Duration: {input.days} days</label>
        <input type="range" min={1} max={21} value={input.days} onChange={e => update("days", Number(e.target.value))}
          className="w-full accent-orange-500 cursor-pointer" />
        <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>1 day</span><span>3 days</span><span>1 week</span><span>3 weeks</span></div>
      </div>
    </div>
  );
}

function Step2({ input, update }: { input: TripInput; update: (k: keyof TripInput, v: any) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-1.5"><Users className="w-4 h-4 text-indigo-400" /> Who's Travelling?</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {([["solo", "🧳", "Solo"], ["couple", "💑", "Couple"], ["family", "👨‍👩‍👧", "Family"], ["friends", "🎒", "Friends"]] as const).map(([val, emoji, label]) => (
            <button key={val} onClick={() => update("groupType", val)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 text-sm font-bold transition-all ${input.groupType === val ? "border-orange-500 bg-orange-500/10 text-white" : "border-indigo-500/20 bg-[#1E293B]/60 text-gray-400 hover:text-white"}`}>
              <span className="text-2xl">{emoji}</span>{label}
            </button>
          ))}
        </div>
      </div>
      {input.groupType !== "solo" && (
        <div>
          <label className="text-sm font-bold text-gray-300 mb-1.5 block">Number of Travellers: {input.travelers}</label>
          <input type="range" min={2} max={12} value={input.travelers} onChange={e => update("travelers", Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer" />
        </div>
      )}
      <div>
        <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1.5"><Wallet className="w-4 h-4 text-amber-400" /> Total Budget: {input.currency}{input.budgetTotal.toLocaleString()}</label>
        <input type="range" min={5000} max={500000} step={1000} value={input.budgetTotal} onChange={e => update("budgetTotal", Number(e.target.value))}
          className="w-full accent-orange-500 cursor-pointer" />
        <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>₹5K</span><span>₹50K</span><span>₹2L</span><span>₹5L</span></div>
      </div>
      <div>
        <label className="text-sm font-bold text-gray-300 mb-2 block">Currency</label>
        <div className="flex gap-2 flex-wrap">
          {["₹", "$", "€", "£", "¥"].map(c => (
            <button key={c} onClick={() => update("currency", c)}
              className={`w-10 h-10 rounded-xl border-2 font-bold text-sm transition-all ${input.currency === c ? "border-orange-500 bg-orange-500/10 text-orange-300" : "border-indigo-500/20 text-gray-400 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({ input, update, dna }: { input: TripInput; update: (k: keyof TripInput, v: any) => void; dna: TravelDNA | null }) {
  return (
    <div className="space-y-5">
      {dna?.archetype && (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
          <p className="text-xs font-bold text-indigo-300 mb-2">✨ Using your Travel DNA</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20 font-bold">{dna.archetypeIcon} {dna.archetype}</span>
            <span className="px-2 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20 font-bold">🍜 Food Lover</span>
            <span className="px-2 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/20 font-bold">📸 Photographer</span>
          </div>
        </div>
      )}
      <TraitSlider label="Adventure" emoji="🏔️" value={input.adventure} onChange={v => update("adventure", v)} color="from-orange-500 to-rose-500" />
      <TraitSlider label="Food & Cuisine" emoji="🍜" value={input.food} onChange={v => update("food", v)} color="from-amber-400 to-orange-500" />
      <TraitSlider label="Culture & History" emoji="🏛️" value={input.culture} onChange={v => update("culture", v)} color="from-purple-500 to-indigo-500" />
      <TraitSlider label="Nature & Outdoors" emoji="🌿" value={input.nature} onChange={v => update("nature", v)} color="from-emerald-500 to-teal-500" />
      <TraitSlider label="Relaxation" emoji="😌" value={input.relaxation} onChange={v => update("relaxation", v)} color="from-sky-500 to-blue-500" />
      <TraitSlider label="Photography" emoji="📸" value={input.photography} onChange={v => update("photography", v)} color="from-sky-400 to-indigo-500" />
      <TraitSlider label="Nightlife & Social" emoji="🎉" value={input.nightlife} onChange={v => update("nightlife", v)} color="from-pink-500 to-rose-500" />
      <div>
        <label className="text-sm font-bold text-gray-300 mb-1.5 block">⚡ Travel Pace: {input.pace < 33 ? "Slow & Relaxed" : input.pace < 66 ? "Balanced" : "Fast & Packed"}</label>
        <input type="range" min={0} max={100} value={input.pace} onChange={e => update("pace", Number(e.target.value))}
          className="w-full accent-orange-500 cursor-pointer" />
        <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>🐢 Slow</span><span>🚶 Balanced</span><span>⚡ Fast</span></div>
      </div>
    </div>
  );
}

function Step4({ input, update }: { input: TripInput; update: (k: keyof TripInput, v: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <p className="text-6xl mb-4">🎲</p>
        <h3 className="text-2xl font-bold text-white font-serif mb-2">Surprise Me</h3>
        <p className="text-gray-400 text-sm mb-6">Let GlobeTrotter AI pick the perfect destination and style for you based on your Travel DNA.</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => update("surpriseMe", !input.surpriseMe)}
          className={`px-8 py-4 rounded-2xl font-bold text-base transition-all border-2 ${input.surpriseMe ? "border-orange-500 bg-orange-500/15 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]" : "border-indigo-500/30 text-gray-400 hover:border-indigo-400/50 hover:text-white"}`}>
          <Shuffle className="w-5 h-5 inline mr-2" />
          {input.surpriseMe ? "✓ Surprise Mode ON!" : "Enable Surprise Mode"}
        </motion.button>
      </div>
      <div className="border-t border-indigo-500/10 pt-6">
        <h4 className="text-sm font-bold text-gray-300 mb-4">Your trip summary:</h4>
        <div className="space-y-2 text-sm">
          {[
            ["📍", "Destination", input.surpriseMe ? "🎲 Surprise!" : input.destination || "Not set"],
            ["🗓️", "Duration", `${input.days} days`],
            ["👥", "Travellers", `${input.travelers} ${input.groupType}`],
            ["💰", "Budget", `${input.currency}${input.budgetTotal.toLocaleString()}`],
          ].map(([emoji, label, value]) => (
            <div key={label as string} className="flex items-center justify-between py-2 border-b border-indigo-500/10">
              <span className="text-gray-400">{emoji} {label}</span>
              <span className="font-bold text-white">{value as string}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PLANNER ─────────────────────────────────────────────────────────────
export default function PlannerClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<TripInput>({ ...DEFAULT_INPUT });
  const [dna, setDna] = useState<TravelDNA | null>(null);
  const [generating, setGenerating] = useState(false);
  const [trip, setTrip] = useState<GeneratedTrip | null>(null);

  // Load DNA
  useEffect(() => {
    try {
      const saved = localStorage.getItem("travel_dna");
      if (saved) {
        const d: TravelDNA = JSON.parse(saved);
        setDna(d);
        setInput(prev => ({
          ...prev,
          adventure: d.adventure, food: d.food, culture: d.culture,
          nature: d.nature, relaxation: d.relaxation, photography: d.photography,
          nightlife: d.social, pace: d.pace, groupType: d.groupType,
          travelers: d.groupType === "solo" ? 1 : d.groupType === "couple" ? 2 : d.groupType === "family" ? 4 : 3,
        }));
      }
    } catch {}
  }, []);

  const update = useCallback(<K extends keyof TripInput>(key: K, val: TripInput[K]) => {
    setInput(prev => ({ ...prev, [key]: val }));
  }, []);

  const handleGenerate = () => {
    setGenerating(true);
  };

  const onGenerationDone = useCallback(() => {
    const generated = generateTrip(input, dna);
    setTrip(generated);
    setGenerating(false);
  }, [input, dna]);

  const handleReset = () => {
    setTrip(null);
    setStep(0);
  };

  const STEP_LABELS = ["Destination", "Travellers & Budget", "Preferences", "Review"];
  const progress = ((step + 1) / STEP_COUNT) * 100;

  // Show itinerary
  if (trip) return <ItineraryView trip={trip} dna={dna} onReset={handleReset} />;

  // Show generator
  if (generating) return <GeneratingOverlay onDone={onGenerationDone} />;

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-20 pb-16 flex flex-col items-center px-4">
      {/* Progress bar */}
      <div className="fixed top-16 inset-x-0 z-40 h-1 bg-[#1E293B]">
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-orange-500 to-rose-500" />
      </div>

      <div className="w-full max-w-xl mt-8">
        {/* Header */}
        <motion.div key={step} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-2">AI Trip Architect — Step {step + 1} of {STEP_COUNT}</p>
          <div className="flex justify-center gap-2 mb-6">
            {STEP_LABELS.map((l, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div animate={{ width: i === step ? 28 : 8, backgroundColor: i < step ? "#f97316" : i === step ? "#f97316" : "#1E293B" }}
                  className="h-2 rounded-full" />
                <span className="text-[9px] text-gray-600 hidden sm:block">{l}</span>
              </div>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{STEP_LABELS[step]}</h2>
          {dna?.archetype && step === 0 && (
            <p className="text-xs text-indigo-300 mt-2">✨ Preferences loaded from your Travel DNA — {dna.archetypeIcon} {dna.archetype}</p>
          )}
        </motion.div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}
            className="bg-[#1E293B]/60 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
            {step === 0 && <Step1 input={input} update={update} />}
            {step === 1 && <Step2 input={input} update={update} />}
            {step === 2 && <Step3 input={input} update={update} dna={dna} />}
            {step === 3 && <Step4 input={input} update={update} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E293B] text-gray-400 hover:text-white border border-indigo-500/20 disabled:opacity-30 transition-colors font-bold text-sm">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          {step < STEP_COUNT - 1 ? (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => setStep(s => s + 1)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              Continue <ChevronRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={handleGenerate}
              disabled={!input.destination.trim() && !input.surpriseMe}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)] disabled:opacity-40 disabled:cursor-not-allowed">
              <Sparkles className="w-4 h-4" /> Build My Journey
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
