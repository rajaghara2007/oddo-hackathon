"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { TravelDNA } from "@/data/travelDNA";

interface Props {
  dna: TravelDNA;
  compact?: boolean;
}

const BAR_TRAITS = [
  { key: "adventure", label: "Adventure", color: "from-orange-500 to-rose-500" },
  { key: "food", label: "Food", color: "from-amber-400 to-orange-500" },
  { key: "nature", label: "Nature", color: "from-emerald-500 to-teal-500" },
] as const;

export default function TravelDNACard({ dna, compact = false }: Props) {
  const router = useRouter();

  if (!dna.archetype) return null;

  // top match destination from localStorage if present
  const topDest =
    typeof window !== "undefined"
      ? localStorage.getItem("dna_top_dest") ?? "Your best match"
      : "Your best match";
  const topPct =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("dna_top_pct") ?? 0)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1E293B]/80 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-5 shadow-xl"
    >
      {/* Header */}
      <p className="text-[10px] font-bold tracking-widest uppercase text-orange-400 mb-1">
        🌍 Your Travel DNA
      </p>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{dna.archetypeIcon}</span>
        <h3 className="text-lg font-bold text-white font-serif">{dna.archetype}</h3>
      </div>

      {/* Score bars */}
      {!compact && (
        <div className="space-y-2 mb-4">
          {BAR_TRAITS.map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-bold">{dna[key]}%</span>
              </div>
              <div className="h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dna[key]}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Top match */}
      {topPct > 0 && (
        <p className="text-xs text-indigo-300 mb-3">
          <span className="font-bold text-orange-400">{topPct}% Match</span> with {topDest}
        </p>
      )}

      {/* CTA */}
      <button
        onClick={() => router.push("/travel-dna")}
        className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
      >
        View Full DNA →
      </button>
    </motion.div>
  );
}
