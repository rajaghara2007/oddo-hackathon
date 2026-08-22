"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Globe2, Plane, Sun, Navigation, Sparkles } from "lucide-react";
import { mockTrips } from "@/data/mockDashboard";
import TravelDNACard from "@/components/trek/TravelDNACard";
import type { TravelDNA } from "@/data/travelDNA";

const STATS = [
  { label: "Countries Visited", value: "12", icon: <Globe2 className="w-5 h-5" />, color: "from-indigo-500 to-purple-600" },
  { label: "Trips Total", value: "24", icon: <Plane className="w-5 h-5" />, color: "from-orange-500 to-rose-500" },
  { label: "Days Traveled", value: "186", icon: <Sun className="w-5 h-5" />, color: "from-emerald-500 to-teal-500" },
  { label: "Distance Flown", value: "84k km", icon: <Navigation className="w-5 h-5" />, color: "from-sky-500 to-blue-600" },
];

const STATUS_COLORS: Record<string, string> = {
  planned: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  completed: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  "in-progress": "bg-orange-500/20 text-orange-300 border border-orange-500/30",
};

const COVER_IMAGES: Record<string, string> = {
  trip1: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
  trip2: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
  trip3: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
};

export default function DashboardClient() {
  const [dna, setDna] = useState<TravelDNA | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("travel_dna");
      if (saved) setDna(JSON.parse(saved));
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 pt-20 pb-24 overflow-x-hidden">

      {/* Hero / Up Next Banner */}
      <section className="relative max-w-[1400px] mx-auto px-6 py-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[340px] md:h-[400px] bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#0B0F19] border border-indigo-500/30 flex items-end">
          <img
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1600"
            alt="Tokyo"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
          <div className="relative z-10 p-8 md:p-12 w-full">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-2">
              Up Next
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
              Tokyo Adventure
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-orange-400" /> Japan</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-400" /> May 1 – May 10, 2024</span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold">Planned</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-5">
              <a href="/plan">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer">
                  ✨ Plan My Trip
                </motion.span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Grid + DNA Card */}
      <section className="max-w-[1400px] mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 flex flex-col gap-3 shadow-lg cursor-pointer">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl font-bold text-white font-serif">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Travel DNA Card */}
          {dna && dna.archetype ? (
            <div className="lg:w-72 shrink-0">
              <TravelDNACard dna={dna} />
            </div>
          ) : (
            <motion.a href="/travel-dna" whileHover={{ scale: 1.02 }}
              className="lg:w-72 shrink-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-indigo-500/20 hover:border-orange-500/40 rounded-2xl p-6 text-center cursor-pointer transition-all group">
              <span className="text-4xl">🧬</span>
              <p className="text-sm font-bold text-gray-400 group-hover:text-orange-400 transition-colors">Discover Your Travel DNA</p>
              <p className="text-xs text-gray-600">Take the 2-min quiz to get personalized recommendations</p>
            </motion.a>
          )}
        </div>
      </section>

      {/* My Trips Section */}
      <section className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Your Journeys</p>
            <h2 className="text-3xl font-bold text-white font-serif">My Trips</h2>
          </div>
          {/* Plan Trip button replaces New Trip */}
          <a href="/plan">
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all cursor-pointer">
              <Sparkles className="w-4 h-4" /> Plan Trip
            </motion.span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrips.map((trip, i) => (
            <motion.div key={trip.id}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              whileHover={{ y: -6 }}
              className="group bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 rounded-3xl overflow-hidden shadow-xl cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={COVER_IMAGES[trip.id] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_COLORS[trip.status] || STATUS_COLORS["planned"]}`}>
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white font-serif mb-2 group-hover:text-orange-400 transition-colors">{trip.title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – {new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">
                    <MapPin className="w-3 h-3" /> {trip.stopCount} stops
                  </span>
                  <motion.button whileHover={{ x: 3 }} className="text-xs text-gray-400 hover:text-orange-400 transition-colors font-bold">
                    View →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Plan Trip Card — replaces Add New Trip card */}
          <a href="/plan">
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              whileHover={{ y: -6, borderColor: "rgba(249,115,22,0.5)" }}
              className="border-2 border-dashed border-indigo-500/20 rounded-3xl h-[280px] flex flex-col items-center justify-center gap-4 cursor-pointer group transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-400 group-hover:text-orange-400 transition-colors">Plan a new adventure</p>
                <p className="text-xs text-gray-600 mt-1">AI-powered trip planning</p>
              </div>
            </motion.div>
          </a>
        </div>
      </section>
    </div>
  );
}
