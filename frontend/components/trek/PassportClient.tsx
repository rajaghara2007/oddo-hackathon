"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Globe2, Sparkles, Map, Mountain, Camera, Lock, Unlock,
  Share2, ArrowRight, Book, Flame, Plane, Navigation, Trophy, ChevronRight
} from "lucide-react";
import { 
  MOCK_PASSPORT_STATS, MOCK_BADGES, MOCK_PAST_TRIPS, getCurrentLevel 
} from "@/data/passport";
import type { TravelDNA } from "@/data/travelDNA";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import DynamicMap from '@/components/trek/DynamicMap';

export default function PassportClient() {
  const [dna, setDna] = useState<TravelDNA | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const totalTrips = trips.length || MOCK_PASSPORT_STATS.totalTrips;
  const citiesVisited = trips.reduce((acc: string[], t) => {
    const cities = t.stops?.map((s: any) => s.city?.name).filter(Boolean) || [];
    return [...new Set([...acc, ...cities])];
  }, []).length || MOCK_PASSPORT_STATS.cities;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("travel_dna");
      if (saved) setDna(JSON.parse(saved));
    } catch {}

    const fetchTrips = async () => {
      try {
        const { data } = await api.get("/trips");
        setTrips(data);
      } catch {}
    };
    fetchTrips();
  }, []);

  const { current: level, next: nextLevel, progressPct } = getCurrentLevel(totalTrips);

  // Compute map markers from all trip stops
  const mapMarkers = trips.flatMap((trip: any) =>
    (trip.stops ?? [])
      .filter((s: any) => s.city?.latitude && s.city?.longitude)
      .map((s: any) => ({
        id: s.id,
        lat: s.city.latitude,
        lng: s.city.longitude,
        label: s.city.name,
      }))
  );
  const mapCenter: [number, number] = mapMarkers.length > 0
    ? [mapMarkers[0].lat, mapMarkers[0].lng]
    : [35.0116, 135.7681];

  if (authLoading || !user) {
    return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 pt-20 pb-24 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header / Intro */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-2">Digital Identity</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">Travel Passport</h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#1E293B] border border-indigo-500/30 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:border-orange-500/50 transition-all"
          >
            <Share2 className="w-4 h-4" /> Share Passport
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Column */}
          <div className="flex-1 space-y-8 min-w-0">
            
            {/* Passport Identity Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#0B0F19] border border-indigo-500/40 p-1 shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative bg-[#0B0F19]/80 backdrop-blur-xl rounded-[1.4rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                
                {/* Avatar / Level */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-4 border-orange-500/50 p-1 mb-4 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" 
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-4xl mb-2">{level.emoji}</span>
                  <p className="text-sm font-bold text-orange-400 uppercase tracking-widest">{level.title}</p>
                </div>

                {/* Info & Stats */}
                <div className="flex-1 w-full">
                  <div className="mb-6 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">{user?.name || "Demo Explorer"}</h2>
                    {dna?.archetype ? (
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                          {dna.archetypeIcon} {dna.archetype}
                        </span>
                        <a href="/travel-dna" className="text-xs text-orange-400 hover:text-orange-300 transition-colors font-bold flex items-center gap-1">
                          View DNA <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    ) : (
                      <a href="/travel-dna" className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center justify-center md:justify-start gap-1">
                        Discover your Travel DNA <ChevronRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                    {[
                      { icon: "🌍", val: citiesVisited, label: "Cities" },
                      { icon: "🗺️", val: trips.length || MOCK_PASSPORT_STATS.totalTrips, label: "Trips" },
                      { icon: "🌎", val: MOCK_PASSPORT_STATS.countries, label: "Countries" },
                      { icon: "🥾", val: MOCK_PASSPORT_STATS.adventures, label: "Adventures" },
                      { icon: "🍜", val: MOCK_PASSPORT_STATS.foodExperiences, label: "Food Exp." },
                      { icon: "📸", val: MOCK_PASSPORT_STATS.memories, label: "Memories" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <span className="text-lg block mb-1">{stat.icon}</span>
                        <span className="text-lg font-bold text-white block">{stat.val}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Level Progress */}
                  {nextLevel && (
                    <div className="bg-[#1E293B]/50 p-4 rounded-xl border border-indigo-500/20">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-gray-400">{MOCK_PASSPORT_STATS.totalTrips} Trips</span>
                        <span className="text-indigo-400">{nextLevel.minTrips} Trips to {nextLevel.emoji} {nextLevel.title}</span>
                      </div>
                      <div className="h-2 bg-[#0B0F19] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Travel Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <DynamicMap center={mapCenter} zoom={2} markers={mapMarkers} className="h-80 w-full rounded-3xl" />
            </motion.div>

            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-white font-serif mb-6 flex items-center gap-2"><Trophy className="w-6 h-6 text-orange-400" /> Achievement Badges</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_BADGES.map((badge, i) => (
                  <motion.div 
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                    className={`p-5 rounded-2xl border transition-all ${badge.unlocked ? "bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "bg-[#1E293B]/40 border-indigo-500/10 grayscale opacity-70"}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner ${badge.unlocked ? "bg-[#0B0F19] border border-orange-500/50" : "bg-[#0B0F19] border border-gray-600"}`}>
                        {badge.emoji}
                      </div>
                      {badge.unlocked ? <Unlock className="w-4 h-4 text-orange-400" /> : <Lock className="w-4 h-4 text-gray-500" />}
                    </div>
                    <h3 className={`font-bold text-base mb-1 ${badge.unlocked ? "text-white" : "text-gray-400"}`}>{badge.name}</h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{badge.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${badge.unlocked ? "bg-orange-500" : "bg-indigo-500"}`} style={{ width: `${(badge.progress / badge.total) * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{badge.progress}/{badge.total}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-8">
            
            {/* Next Goals (Personalized by DNA) */}
            <div className="bg-[#1E293B]/60 border border-indigo-500/20 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white font-serif mb-2">Next Goals</h3>
              <p className="text-xs text-gray-400 mb-6">Personalized based on your Travel DNA</p>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">🥾 Mountain Conqueror</span>
                    <span className="text-xs font-bold text-orange-400">4/5</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">One more mountain trip to unlock.</p>
                  <a href="/plan">
                    <button className="w-full py-2 text-xs font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors">
                      Plan a Mountain Trip
                    </button>
                  </a>
                </div>
                
                <div className="pt-5 border-t border-indigo-500/10">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">🍜 Food Hunter</span>
                    <span className="text-xs font-bold text-amber-400">17/20</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Try 3 more local culinary experiences.</p>
                  <a href="/plan">
                    <button className="w-full py-2 text-xs font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors">
                      Plan a Food Tour
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Travel Timeline */}
            <div>
              <h3 className="text-lg font-bold text-white font-serif mb-5 flex items-center gap-2"><Book className="w-5 h-5 text-indigo-400" /> Travel History</h3>
              <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-indigo-500/20">
                {MOCK_PAST_TRIPS.map((trip, i) => (
                  <motion.div 
                    key={trip.id}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                    className="relative pl-8"
                  >
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0B0F19] border-2 border-orange-500 flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                    </div>
                    
                    <div className="bg-[#1E293B]/40 border border-indigo-500/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors cursor-pointer group">
                      <div className="h-24 overflow-hidden relative">
                        <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent" />
                        <span className="absolute bottom-2 left-3 text-xs font-bold text-white">{trip.destination} — {trip.year}</span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-2">
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{trip.days} days</span>
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{trip.type}</span>
                        </div>
                        <p className="text-xs text-gray-300 font-medium line-clamp-1">{trip.highlights.join(" • ")}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
