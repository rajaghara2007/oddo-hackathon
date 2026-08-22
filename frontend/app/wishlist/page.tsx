"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Search } from "lucide-react";

const WISHLIST_DESTINATIONS = [
  {
    id: "w1",
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    budget: "₹1.2L",
    days: "7 days",
    vibe: "Romantic",
    vibeColor: "from-rose-500 to-pink-600",
    progress: 65,
    saved: true,
  },
  {
    id: "w2",
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    budget: "₹1.5L",
    days: "10 days",
    vibe: "Culture",
    vibeColor: "from-orange-500 to-amber-500",
    progress: 40,
    saved: true,
  },
  {
    id: "w3",
    city: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&q=80&w=800",
    budget: "₹2.1L",
    days: "8 days",
    vibe: "Urban",
    vibeColor: "from-sky-500 to-blue-600",
    progress: 20,
    saved: false,
  },
  {
    id: "w4",
    city: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    budget: "₹65K",
    days: "5 days",
    vibe: "Beach",
    vibeColor: "from-emerald-500 to-teal-500",
    progress: 80,
    saved: true,
  },
  {
    id: "w5",
    city: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800",
    budget: "₹1.8L",
    days: "6 days",
    vibe: "Scenic",
    vibeColor: "from-indigo-500 to-violet-600",
    progress: 55,
    saved: true,
  },
  {
    id: "w6",
    city: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    budget: "₹1.3L",
    days: "9 days",
    vibe: "Zen",
    vibeColor: "from-pink-500 to-rose-600",
    progress: 30,
    saved: false,
  },
  {
    id: "w7",
    city: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    budget: "₹90K",
    days: "4 days",
    vibe: "Luxury",
    vibeColor: "from-amber-500 to-orange-500",
    progress: 10,
    saved: false,
  },
  {
    id: "w8",
    city: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800",
    budget: "₹2.5L",
    days: "5 days",
    vibe: "Island",
    vibeColor: "from-teal-500 to-cyan-600",
    progress: 70,
    saved: true,
  },
];

export default function WishlistPage() {
  const [saved, setSaved] = useState<Record<string, boolean>>(
    Object.fromEntries(WISHLIST_DESTINATIONS.map(d => [d.id, d.saved]))
  );
  const [filter, setFilter] = useState<"all" | "saved">("all");

  const toggle = (id: string) => setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  const displayed = filter === "saved"
    ? WISHLIST_DESTINATIONS.filter(d => saved[d.id])
    : WISHLIST_DESTINATIONS;

  const savedCount = Object.values(saved).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 pt-20 pb-24 overflow-x-hidden">
      {/* Hero Header */}
      <div className="relative max-w-[1400px] mx-auto px-6 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a0533] via-[#2d1055] to-[#0B0F19] border border-violet-500/30 p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(ellipse at top right, rgba(167,139,250,0.12), transparent 60%)" }} />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-2">Dream Destinations</p>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.5)]">
                  My Wishlist ✨
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                <span className="text-violet-300 font-bold">{savedCount}</span> destinations saved · {WISHLIST_DESTINATIONS.length} discovered
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === "all" ? "bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}
              >All</button>
              <button
                onClick={() => setFilter("saved")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${filter === "saved" ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}
              >
                <Heart className="w-3.5 h-3.5" /> Saved
              </button>
              <a href="/plan">
                <motion.span
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_0_15px_rgba(167,139,250,0.35)] cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Plan a Trip
                </motion.span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayed.map((dest, i) => (
            <motion.div
              key={dest.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              whileHover={{ y: -8, boxShadow: "0 0 35px rgba(167,139,250,0.2)" }}
              className="group relative bg-[#1E293B]/70 backdrop-blur-sm border border-indigo-500/10 hover:border-violet-500/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover opacity-75 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/20 to-transparent" />

                {/* Vibe badge */}
                <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${dest.vibeColor} text-white shadow-lg`}>
                  {dest.vibe}
                </span>

                {/* Heart */}
                <button
                  onClick={() => toggle(dest.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-rose-400/60 transition-all"
                >
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${saved[dest.id] ? "fill-rose-500 stroke-rose-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" : "fill-transparent stroke-gray-300 hover:stroke-rose-400"}`}
                    viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white font-serif group-hover:text-violet-300 transition-colors">{dest.city}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500/60 border border-violet-400/40 inline-block" />
                  {dest.country}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-400 mb-5">
                  <span>🗓️ {dest.days}</span>
                  <span className="font-bold text-violet-300 text-sm">{dest.budget}</span>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                    <span>Planning Progress</span>
                    <span className="text-violet-400 font-bold">{dest.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dest.progress}%` }}
                      transition={{ duration: 1, delay: 0.15 * i }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      style={{ boxShadow: "0 0 8px rgba(167,139,250,0.6)" }}
                    />
                  </div>
                </div>

                <a href="/plan">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-2.5 text-xs font-bold text-violet-300 border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/30 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Plan This Trip
                  </motion.button>
                </a>
              </div>
            </motion.div>
          ))}

          {/* Add more CTA */}
          <a href="/plan">
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              whileHover={{ y: -8, borderColor: "rgba(167,139,250,0.5)" }}
              className="h-full min-h-[380px] border-2 border-dashed border-violet-500/20 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer group transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-400 group-hover:text-violet-400 transition-colors">Discover new destinations</p>
                <p className="text-xs text-gray-600 mt-1">AI-powered suggestions</p>
              </div>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
