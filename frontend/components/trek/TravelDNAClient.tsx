"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronRight, ChevronLeft, Check, RefreshCw,
  MapPin, Plane, Star
} from "lucide-react";
import {
  TravelDNA, DEFAULT_DNA, calcArchetype, matchDestinations, DESTINATIONS
} from "@/data/travelDNA";

// ─── STEP DEFINITIONS ────────────────────────────────────────────────────────
type Step = {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
};
const STEPS: Step[] = [
  { id: 1, title: "Adventure & Thrill", subtitle: "How much do you crave the rush?", emoji: "🏔️" },
  { id: 2, title: "Food & Culinary", subtitle: "How central is cuisine to your journey?", emoji: "🍜" },
  { id: 3, title: "Culture & Arts", subtitle: "Do you seek depth in history and people?", emoji: "🏛️" },
  { id: 4, title: "Nature & Outdoors", subtitle: "How drawn are you to the natural world?", emoji: "🌿" },
  { id: 5, title: "Photography & Scenics", subtitle: "Do you chase the perfect shot?", emoji: "📸" },
  { id: 6, title: "Your Travel Style", subtitle: "Tell us how you roll", emoji: "✈️" },
];

// ─── TRAIT SLIDER ─────────────────────────────────────────────────────────────
function TraitSlider({
  label, value, onChange, color = "from-orange-500 to-rose-500"
}: { label: string; value: number; onChange: (v: number) => void; color?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400 font-medium">{label}</span>
        <span className="font-bold text-white">{value}%</span>
      </div>
      <div className="relative h-3 bg-[#0B0F19] rounded-full overflow-hidden cursor-pointer group">
        <motion.div
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.15 }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
        <input
          type="range" min={0} max={100} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 opacity-0 w-full cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-600">
        <span>Not at all</span><span>Somewhat</span><span>Absolutely</span>
      </div>
    </div>
  );
}

// ─── CHOICE CARD ─────────────────────────────────────────────────────────────
function ChoiceCard({
  emoji, label, selected, onClick
}: { emoji: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold text-sm
        ${selected
          ? "border-orange-500 bg-orange-500/10 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          : "border-indigo-500/20 bg-[#1E293B]/60 text-gray-400 hover:border-indigo-400/40 hover:text-white"
        }`}
    >
      <span className="text-2xl">{emoji}</span>
      <span>{label}</span>
      {selected && <Check className="w-4 h-4 text-orange-400" />}
    </motion.button>
  );
}

// ─── RADAR CHART (SVG) ─────────────────────────────────────────────────────
function RadarChart({ dna }: { dna: TravelDNA }) {
  const traits = [
    { label: "Adventure", value: dna.adventure, color: "#f97316" },
    { label: "Food", value: dna.food, color: "#fbbf24" },
    { label: "Culture", value: dna.culture, color: "#a78bfa" },
    { label: "Nature", value: dna.nature, color: "#34d399" },
    { label: "Photography", value: dna.photography, color: "#60a5fa" },
    { label: "Social", value: dna.social, color: "#f472b6" },
  ];
  const N = traits.length;
  const cx = 150; const cy = 150; const r = 110;

  const point = (i: number, pct: number) => {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    const dist = (pct / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const outerPoint = (i: number) => {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    return { x: cx + (r + 20) * Math.cos(angle), y: cy + (r + 20) * Math.sin(angle) };
  };

  const polygon = traits.map((t, i) => {
    const p = point(i, t.value);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto">
      {/* Background rings */}
      {[20, 40, 60, 80, 100].map((pct) => (
        <polygon
          key={pct}
          points={traits.map((_, i) => { const p = point(i, pct); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke="#1E293B" strokeWidth="1"
        />
      ))}
      {/* Axes */}
      {traits.map((_, i) => {
        const p = point(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#1E293B" strokeWidth="1" />;
      })}
      {/* Data polygon */}
      <motion.polygon
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        points={polygon}
        fill="rgba(249,115,22,0.15)"
        stroke="#f97316"
        strokeWidth="2"
      />
      {/* Dots */}
      {traits.map((t, i) => {
        const p = point(i, t.value);
        return (
          <motion.circle
            key={i}
            initial={{ r: 0 }}
            animate={{ r: 5 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            cx={p.x} cy={p.y} fill={t.color}
          />
        );
      })}
      {/* Labels */}
      {traits.map((t, i) => {
        const p = outerPoint(i);
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="10" fill="#9CA3AF" fontWeight="600">
            {t.label}
          </text>
        );
      })}
    </svg>
  );
}

// ─── COUNT-UP SCORE ───────────────────────────────────────────────────────────
function ScoreBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 2;
      if (start >= value) { setDisplay(value); return; }
      setDisplay(start);
      setTimeout(step, 16);
    };
    const t = setTimeout(step, delay * 1000);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="font-bold text-white">{display}%</span>
      </div>
      <div className="h-2 bg-[#0B0F19] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

const SCORE_COLORS = [
  "#f97316","#fbbf24","#a78bfa","#34d399","#60a5fa","#f472b6","#38bdf8","#fb923c"
];
const SCORE_KEYS: Array<{ key: keyof TravelDNA; label: string }> = [
  { key: "adventure", label: "Adventure" },
  { key: "food", label: "Food" },
  { key: "culture", label: "Culture" },
  { key: "nature", label: "Nature" },
  { key: "relaxation", label: "Relaxation" },
  { key: "photography", label: "Photography" },
  { key: "social", label: "Social" },
  { key: "budget", label: "Budget Friendly" },
];

// ─── DESTINATION CARD ─────────────────────────────────────────────────────────
function DestCard({ dest, rank }: { dest: ReturnType<typeof matchDestinations>[0]; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      whileHover={{ y: -6 }}
      className="group bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {dest.matchPct}% Match
        </div>
        {rank === 0 && (
          <div className="absolute top-3 left-3 bg-amber-400 text-[#0B0F19] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" /> Best Match
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-white font-serif group-hover:text-orange-400 transition-colors">{dest.name}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{dest.country}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Est. budget</p>
            <p className="text-sm font-bold text-indigo-300">{dest.budget}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {dest.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
              ✓ {tag}
            </span>
          ))}
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="text-xs text-gray-400 mb-3 leading-relaxed overflow-hidden"
            >
              This destination matches your top travel traits. The blend of {dest.tags.join(", ")} opportunities makes it a perfect fit for your Travel DNA.
            </motion.p>
          )}
        </AnimatePresence>
        <button className="text-xs text-orange-400 font-bold hover:text-orange-300 transition-colors">
          {expanded ? "Less ↑" : "Why this matches you →"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function TravelDNAClient() {
  const router = useRouter();
  const [phase, setPhase] = useState<"quiz" | "results">("quiz");
  const [step, setStep] = useState(0);
  const [dna, setDna] = useState<TravelDNA>({ ...DEFAULT_DNA });

  // Load saved DNA
  useEffect(() => {
    const saved = localStorage.getItem("travel_dna");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDna(parsed);
        if (parsed.archetype) setPhase("results");
      } catch {}
    }
  }, []);

  const update = useCallback(<K extends keyof TravelDNA>(key: K, val: TravelDNA[K]) => {
    setDna(prev => ({ ...prev, [key]: val }));
  }, []);

  const finishQuiz = () => {
    const archetypeData = calcArchetype(dna);
    const final: TravelDNA = { ...dna, ...archetypeData };
    setDna(final);
    // Save
    localStorage.setItem("travel_dna", JSON.stringify(final));
    // Save top match for card
    const matches = matchDestinations(final);
    localStorage.setItem("dna_top_dest", matches[0].name);
    localStorage.setItem("dna_top_pct", String(matches[0].matchPct));
    setPhase("results");
  };

  const reset = () => {
    localStorage.removeItem("travel_dna");
    localStorage.removeItem("dna_top_dest");
    localStorage.removeItem("dna_top_pct");
    setDna({ ...DEFAULT_DNA });
    setStep(0);
    setPhase("quiz");
  };

  const progress = ((step + 1) / STEPS.length) * 100;
  const matches = phase === "results" ? matchDestinations(dna) : [];

  // ── QUIZ PHASE ──────────────────────────────────────────────────────────────
  if (phase === "quiz") {
    const current = STEPS[step];
    return (
      <div className="min-h-screen bg-[#0B0F19] pt-20 pb-16 flex flex-col items-center px-4">
        {/* Fixed progress bar */}
        <div className="fixed top-16 inset-x-0 z-40 h-1 bg-[#1E293B]">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-orange-500 to-rose-500"
          />
        </div>

        <div className="w-full max-w-2xl mt-8">
          {/* Step indicator */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-3">
              Step {step + 1} of {STEPS.length}
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === step ? 32 : 8, backgroundColor: i < step ? "#f97316" : i === step ? "#f97316" : "#1E293B" }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
            <span className="text-5xl mb-4 block">{current.emoji}</span>
            <h2 className="text-3xl font-bold text-white font-serif mb-2">{current.title}</h2>
            <p className="text-gray-400">{current.subtitle}</p>
          </motion.div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E293B]/60 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-8 shadow-2xl space-y-6"
            >
              {step === 0 && (
                <>
                  <TraitSlider label="🏔️ Thrill & Adventure" value={dna.adventure} onChange={v => update("adventure", v)} />
                  <TraitSlider label="⚡ Travel Pace" value={dna.pace} onChange={v => update("pace", v)} color="from-indigo-500 to-purple-500" />
                </>
              )}
              {step === 1 && (
                <TraitSlider label="🍜 Food & Cuisine Importance" value={dna.food} onChange={v => update("food", v)} color="from-amber-400 to-orange-500" />
              )}
              {step === 2 && (
                <>
                  <TraitSlider label="🏛️ Culture & History" value={dna.culture} onChange={v => update("culture", v)} color="from-purple-500 to-indigo-500" />
                  <TraitSlider label="🎉 Nightlife & Social" value={dna.social} onChange={v => update("social", v)} color="from-pink-500 to-rose-500" />
                </>
              )}
              {step === 3 && (
                <>
                  <TraitSlider label="🌿 Nature & Outdoors" value={dna.nature} onChange={v => update("nature", v)} color="from-emerald-500 to-teal-500" />
                  <TraitSlider label="😌 Relaxation" value={dna.relaxation} onChange={v => update("relaxation", v)} color="from-sky-500 to-blue-500" />
                </>
              )}
              {step === 4 && (
                <TraitSlider label="📸 Photography & Scenics" value={dna.photography} onChange={v => update("photography", v)} color="from-sky-400 to-blue-500" />
              )}
              {step === 5 && (
                <>
                  {/* Budget personality */}
                  <TraitSlider label="💰 Budget Flexibility" value={dna.budget} onChange={v => update("budget", v)} color="from-amber-500 to-yellow-400" />
                  {/* Group type */}
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-3">👥 How do you travel?</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([["solo", "🧳", "Solo"], ["couple", "💑", "Couple"], ["family", "👨‍👩‍👧", "Family"], ["friends", "🎒", "Friends"]] as const).map(([val, emoji, label]) => (
                        <ChoiceCard key={val} emoji={emoji} label={label} selected={dna.groupType === val} onClick={() => update("groupType", val)} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E293B] text-gray-400 hover:text-white border border-indigo-500/20 disabled:opacity-30 transition-colors font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(s => s + 1)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={finishQuiz}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              >
                ✨ Generate My Travel DNA
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS PHASE ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B0F19] pt-20 pb-16 text-gray-200">
      <div className="max-w-5xl mx-auto px-6">

        {/* Hero archetype */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-4">Your Travel DNA</p>
          <div className="text-7xl mb-4">{dna.archetypeIcon}</div>
          <h1 className="text-5xl font-bold text-white font-serif mb-4">{dna.archetype}</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed mb-6">{dna.summary}</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
              {dna.archetypeIcon} {dna.archetype}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
              {dna.groupType === "solo" ? "🧳 Solo" : dna.groupType === "couple" ? "💑 Couple" : dna.groupType === "family" ? "👨‍👩‍👧 Family" : "🎒 Friends"}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              {dna.pace > 66 ? "⚡ Fast Paced" : dna.pace > 33 ? "🚶 Balanced" : "🐢 Slow Travel"}
            </span>
          </div>
        </motion.section>

        {/* Radar + Scores grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E293B]/60 border border-indigo-500/20 rounded-3xl p-6 flex flex-col items-center"
          >
            <h3 className="text-lg font-bold text-white mb-4 font-serif">DNA Radar</h3>
            <RadarChart dna={dna} />
          </motion.div>

          {/* Score bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E293B]/60 border border-indigo-500/20 rounded-3xl p-6 space-y-4"
          >
            <h3 className="text-lg font-bold text-white mb-2 font-serif">Your Scores</h3>
            {SCORE_KEYS.map(({ key, label }, i) => (
              <ScoreBar
                key={key}
                label={label}
                value={typeof dna[key] === "number" ? (dna[key] as number) : 0}
                color={SCORE_COLORS[i]}
                delay={0.3 + i * 0.1}
              />
            ))}
          </motion.div>
        </section>

        {/* Destinations */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-1">Personalized For You</p>
              <h2 className="text-3xl font-bold text-white font-serif">Your Destinations</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.slice(0, 6).map((dest, i) => (
              <DestCard key={dest.id} dest={dest} rank={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center py-12 bg-gradient-to-br from-[#1E293B]/80 to-[#0F172A]/80 border border-indigo-500/20 rounded-3xl px-8 mb-12"
        >
          <p className="text-4xl mb-4">✨</p>
          <h2 className="text-3xl font-bold text-white font-serif mb-3">Plan a Trip With My Travel DNA</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            GlobeTrotter will use your {dna.archetype} profile to craft a perfectly tailored itinerary.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">{dna.archetypeIcon} {dna.archetype}</span>
            <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">🍜 Food Lover</span>
            <span className="px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">📸 Photographer</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-base shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all flex items-center justify-center gap-2"
            >
              <Plane className="w-5 h-5" /> Plan My Perfect Trip
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={reset}
              className="px-8 py-4 rounded-2xl bg-[#1E293B] text-gray-300 hover:text-white font-bold text-base border border-indigo-500/20 hover:border-indigo-400/40 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Retake Quiz
            </motion.button>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
