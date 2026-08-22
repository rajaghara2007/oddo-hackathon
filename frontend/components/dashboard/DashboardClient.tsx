"use client";

import { motion } from "framer-motion";
import { Plus, MapPin, Calendar, Clock, Globe, Plane, Navigation, MoreHorizontal, Settings, Copy, Trash2, Edit2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardClient({ trips }: { trips: any[] }) {
  // Using dummy data if empty for layout demonstration
  const displayTrips = trips.length > 0 ? trips : [
    { id: "1", title: "Amalfi Coast Escape", startDate: "2026-09-12T00:00:00Z", endDate: "2026-09-19T00:00:00Z", status: "UPCOMING", stopCount: 12, cover: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1000", gradient: "from-pink-500 to-rose-500" },
    { id: "2", title: "Kyoto Autumn Retreat", startDate: "2026-10-05T00:00:00Z", endDate: "2026-10-12T00:00:00Z", status: "PLANNING", stopCount: 8, cover: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000", gradient: "from-orange-500 to-amber-500" },
    { id: "3", title: "Swiss Alps Adventure", startDate: "2027-01-15T00:00:00Z", endDate: "2027-01-22T00:00:00Z", status: "DRAFT", stopCount: 4, cover: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1000", gradient: "from-blue-500 to-cyan-500" },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-24 pb-20 text-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* UP NEXT HERO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2rem] overflow-hidden bg-[#1E293B] shadow-2xl border border-indigo-500/20 mb-12 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 mix-blend-overlay" />
          <div className="absolute right-0 top-0 w-1/2 h-full">
            <img src={displayTrips[0].cover || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700" alt="Cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B] via-[#1E293B]/80 to-transparent" />
          </div>
          
          <div className="relative p-10 md:p-14 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <span className="bg-pink-500/20 text-pink-400 font-bold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-pink-500/30 mb-4 inline-block">Up Next</span>
              <h1 className="text-5xl md:text-6xl font-bold font-serif text-white mb-2">{displayTrips[0].title}</h1>
              <p className="text-gray-400 font-medium">In 21 days • Sept 12 - Sept 19, 2026</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                 <img src="https://ui-avatars.com/api/?name=Raj&background=6366f1&color=fff" className="w-12 h-12 rounded-full border-2 border-[#1E293B]" />
                 <img src="https://ui-avatars.com/api/?name=Sarah&background=ec4899&color=fff" className="w-12 h-12 rounded-full border-2 border-[#1E293B]" />
              </div>
              <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg">View Trip</button>
            </div>
          </div>
        </motion.div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Globe />} value="14" label="Countries Visited" color="text-emerald-400" bg="bg-emerald-500/10" />
          <StatCard icon={<Navigation />} value="8" label="Total Trips" color="text-blue-400" bg="bg-blue-500/10" />
          <StatCard icon={<Calendar />} value="42" label="Days Traveled" color="text-purple-400" bg="bg-purple-500/10" />
          <StatCard icon={<Plane />} value="12k" label="Miles Flown" color="text-pink-400" bg="bg-pink-500/10" />
        </div>

        {/* MY TRIPS SECTION */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-serif text-white">My Trips</h2>
          <div className="flex gap-2">
            <button className="text-sm font-bold text-gray-400 hover:text-white px-4 py-2 transition-colors">Past Trips</button>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Trip
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTrips.map((trip: any, idx: number) => (
            <motion.div 
              key={trip.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-[#1E293B] rounded-3xl overflow-hidden border border-indigo-500/20 shadow-xl flex flex-col relative"
            >
              {/* Gradient Banner Top */}
              <div className={`h-32 bg-gradient-to-r ${trip.gradient || 'from-indigo-500 to-purple-500'} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                <div className="relative z-10 flex justify-between items-start">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm border border-white/10">
                    {trip.status}
                  </span>
                  
                  {/* Hover Menu */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content Bottom */}
              <div className="p-6 flex-1 flex flex-col relative">
                {/* Floating Image Avatar */}
                <div className="absolute -top-10 right-6 w-16 h-16 rounded-full border-4 border-[#1E293B] overflow-hidden shadow-lg bg-gray-800">
                  {trip.cover ? (
                    <img src={trip.cover} alt={trip.title} className="w-full h-full object-cover" />
                  ) : (
                    <MapPin className="w-6 h-6 m-auto mt-4 text-gray-400" />
                  )}
                </div>

                <h3 className="text-xl font-bold font-serif text-white mb-1 pr-16 leading-tight">{trip.title}</h3>
                <p className="text-xs text-gray-400 mb-6 font-medium">
                  {new Date(trip.startDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-700/50">
                  <div className="flex gap-4 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer"><MapPin className="w-4 h-4" /> {trip.stopCount} Stops</span>
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" className="w-6 h-6 rounded-full border border-[#1E293B]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color, bg }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-[#1E293B] p-6 rounded-3xl border border-indigo-500/10 shadow-lg flex items-center gap-5"
    >
      <div className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center shadow-inner`}>
        <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white font-serif">{value}</p>
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500">{label}</p>
      </div>
    </motion.div>
  );
}
