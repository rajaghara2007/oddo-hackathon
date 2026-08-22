"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Sparkles, Trophy, ChevronRight } from "lucide-react";
import { mockTrips as fallbackTrips } from "@/data/mockDashboard";
import TravelDNACard from "@/components/trek/TravelDNACard";
import type { TravelDNA } from "@/data/travelDNA";
import { MOCK_BADGES, getCurrentLevel, MOCK_PASSPORT_STATS } from "@/data/passport";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

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
  const [trips, setTrips] = useState<any[]>(fallbackTrips);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("travel_dna");
      if (saved) setDna(JSON.parse(saved));
    } catch {}

    const fetchTrips = async () => {
      try {
        const { data } = await api.get("/trips");
        if (data && data.length > 0) {
          setTrips(data);
        }
      } catch (err) {
        console.error("Failed to fetch trips", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (authLoading || !user) {
    return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Loading...</div>;
  }

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

      {/* Achievement Progress + DNA Card */}
      <section className="max-w-[1400px] mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Achievement Widget */}
          <div className="flex-1">
            {/* Level Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-5 mb-4"
            >
              {(() => {
                const { current, next, progressPct } = getCurrentLevel(MOCK_PASSPORT_STATS.totalTrips);
                return (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{current.emoji}</span>
                        <div>
                          <p className="text-xs text-orange-400 font-bold uppercase tracking-widest">Current Level</p>
                          <p className="text-lg font-bold text-white">{current.title}</p>
                        </div>
                      </div>
                      <a href="/passport">
                        <span className="text-xs text-gray-400 hover:text-orange-400 flex items-center gap-1 transition-colors">
                          Full Profile <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </a>
                    </div>
                    {next && (
                      <>
                        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                          <span>{MOCK_PASSPORT_STATS.totalTrips} trips</span>
                          <span>{next.minTrips} trips → {next.emoji} {next.title}</span>
                        </div>
                        <div className="h-2 bg-[#0B0F19] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                          />
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </motion.div>

            {/* In-Progress Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOCK_BADGES.filter(b => !b.unlocked).slice(0, 3).map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + 0.1 * i }}
                  whileHover={{ y: -3 }}
                  className="bg-[#1E293B]/60 border border-indigo-500/15 rounded-xl p-4 cursor-pointer group hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{badge.emoji}</span>
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{badge.progress}/{badge.total}</span>
                  </div>
                  <p className="text-xs font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{badge.name}</p>
                  <div className="h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="/passport">
              <motion.div
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-400 transition-colors py-2 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5" /> View all achievements in Passport
              </motion.div>
            </a>
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
          {trips.map((trip, i) => (
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
                    <MapPin className="w-3 h-3" /> {trip.stops?.length || 0} stops
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
];

function WishlistSection() {
  const [saved, setSaved] = useState<Record<string, boolean>>(
    Object.fromEntries(WISHLIST_DESTINATIONS.map(d => [d.id, d.saved]))
  );

  const toggle = (id: string) => setSaved(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-1">Dream Destinations</p>
          <h2 className="text-3xl font-bold font-serif">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(167,139,250,0.5)]">
              My Wishlist ✨
            </span>
          </h2>
        </div>
        <a href="/plan">
          <motion.span
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="text-xs font-bold text-violet-400 border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 px-4 py-2 rounded-full transition-all cursor-pointer"
          >
            + Add Destination
          </motion.span>
        </a>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {WISHLIST_DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            whileHover={{ y: -8, boxShadow: "0 0 30px rgba(167,139,250,0.2)" }}
            className="group relative bg-[#1E293B]/70 backdrop-blur-sm border border-indigo-500/10 hover:border-violet-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover opacity-75 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/20 to-transparent" />

              {/* Vibe badge */}
              <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${dest.vibeColor} text-white shadow-lg`}>
                {dest.vibe}
              </span>

              {/* Heart */}
              <button
                onClick={() => toggle(dest.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-rose-400/60 transition-all group/heart"
              >
                <svg className={`w-4 h-4 transition-all duration-300 ${saved[dest.id] ? "fill-rose-500 stroke-rose-500 scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]" : "fill-transparent stroke-gray-300 group-hover/heart:stroke-rose-400"}`}
                  viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white font-serif group-hover:text-violet-300 transition-colors">{dest.city}</h3>
              <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-violet-500/50 border border-violet-400/40 inline-block" />
                {dest.country}
              </p>

              {/* Meta row */}
              <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">🗓️ {dest.days}</span>
                <span className="font-bold text-violet-300">{dest.budget}</span>
              </div>

              {/* Planning progress */}
              <div>
                <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                  <span>Planning Progress</span>
                  <span className="text-violet-400 font-bold">{dest.progress}%</span>
                </div>
                <div className="h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dest.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 + 0.1 * i }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    style={{ boxShadow: "0 0 8px rgba(167,139,250,0.6)" }}
                  />
                </div>
              </div>

              {/* Plan CTA */}
              <a href="/plan">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="mt-4 w-full py-2 text-xs font-bold text-violet-300 border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/25 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 group-hover/btn:text-fuchsia-400 transition-colors" />
                  Plan This Trip
                </motion.button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
