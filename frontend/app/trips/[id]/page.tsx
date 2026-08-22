"use client";

import { Plane, Train, Hotel, Landmark, Utensils, Share2, Edit3, UserPlus, Plus, Check, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import DynamicMap from "@/components/trek/DynamicMap";

export default function TripItineraryPage() {
  const params = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await api.get(`/trips/${params.id}`);
        setTrip(data);
      } catch (err) {
        console.error("Failed to load trip", err);
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) fetchTrip();
  }, [params.id]);

  // Fallback to static values if no trip is found
  const title = trip?.title || "Parisian Getaway";
  const desc = trip?.description || "Oct 12 - Oct 16 • 5 Days";
  const image = trip?.coverImageUrl || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1000";
  const budget = trip?.budgetTotal ? `$${Number(trip.budgetTotal).toLocaleString()}` : "$5,000";
  const stops = trip?.stops || [];

  return (
    <div className="min-h-screen pb-24 pt-28 text-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-8">
        
        {/* LEFT SIDEBAR: Trip Items */}
        <aside className="space-y-6 hidden lg:block">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-bold font-serif text-white mb-1">Trip Items</h2>
            <p className="text-xs text-gray-500 mb-6">Drag items onto your timeline to schedule.</p>
            
            <div className="space-y-6">
              {/* Transport Category */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 mb-3">TRANSPORT</h3>
                <div className="space-y-2">
                  <DraggableItem icon={<Plane />} title="Flight" subtitle="CDG Arrival" color="bg-indigo-500/20 text-indigo-400" />
                  <DraggableItem icon={<Train />} title="Train" subtitle="Bernina" color="bg-indigo-500/20 text-indigo-400" />
                </div>
              </div>

              {/* Stays Category */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 mb-3">STAYS</h3>
                <DraggableItem icon={<Hotel />} title="Boutique Hotel" subtitle="Le Marais" color="bg-yellow-500/20 text-yellow-500" border="border-l-4 border-l-yellow-500" />
              </div>

              {/* Activities Category */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 mb-3">ACTIVITIES</h3>
                <div className="space-y-2">
                  <DraggableItem icon={<Landmark />} title="Museum Visit" subtitle="Louvre or Orsay" color="bg-orange-500/20 text-orange-400" />
                  <DraggableItem icon={<Utensils />} title="Dining" subtitle="Dinner Reservation" color="bg-rose-500/20 text-rose-400" />
                </div>
              </div>

              <button className="w-full py-3 bg-[#0F172A] text-gray-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-900/40 transition-colors border border-indigo-500/20">
                <Plus className="w-4 h-4" /> Add Custom Item
              </button>
            </div>
          </motion.div>
        </aside>

        {/* MAIN CONTENT: Timeline */}
        <main className="bg-[#0B0F19]/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-indigo-500/20 overflow-hidden flex flex-col min-h-[800px]">
          {/* Header Image */}
          <div className="relative h-64 bg-[#020617]">
            <img 
              src={image} 
              alt="Trip Cover" 
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 inset-x-8 text-white flex justify-between items-end"
            >
              <div>
                <span className="bg-indigo-500/20 border border-indigo-400/30 backdrop-blur text-indigo-300 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                  {trip?.isPublic ? "Public Itinerary" : "Private Trip"}
                </span>
                <h1 className="text-4xl font-bold font-serif mb-1">{title}</h1>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Timeline Container */}
          <div className="p-8">
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[0.85rem] top-8 bottom-0 w-px bg-indigo-500/20" />
              
              {loading ? (
                <div className="text-center py-20 text-gray-500">Loading timeline...</div>
              ) : stops.length > 0 ? (
                stops.map((stop: any, index: number) => (
                  <div key={stop.id} className="mb-12 relative">
                    {/* Day Header */}
                    <motion.div 
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      className="relative mb-10"
                    >
                      <div className="absolute -left-[2.1rem] w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        {index + 1}
                      </div>
                      <h2 className="text-2xl font-bold font-serif text-white">{stop.city?.name || "Stop"}</h2>
                      <p className="text-sm text-gray-400">
                        {new Date(stop.arrivalDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })} 
                        {" - "}
                        {new Date(stop.departureDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </motion.div>
                  </div>
                ))
              ) : (
                <>
                  {/* Fallback Static Timeline */}
                  <motion.div 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="relative mb-10"
                  >
                    <div className="absolute -left-[2.1rem] w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                      1
                    </div>
                    <h2 className="text-2xl font-bold font-serif text-white">Arrival & Marais</h2>
                    <p className="text-sm text-gray-400">Thursday, Oct 12</p>
                  </motion.div>

                  <div className="space-y-8 relative">
                    <TimelineEvent time="10:30 AM" icon={<Plane />} iconColor="text-indigo-400 bg-indigo-500/20">
                      <h4 className="text-lg font-bold font-serif text-white mb-1">Flight Arrival</h4>
                      <p className="text-sm text-gray-400 mb-3">Charles de Gaulle<br/>Airport (CDG)</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-[#0F172A] px-2 py-1 rounded-md border border-indigo-500/20">
                        <Check className="w-3 h-3 text-green-400" /> Terminal 2E
                      </span>
                    </TimelineEvent>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-12 text-center">
              <button className="text-sm font-bold text-orange-400 flex items-center gap-2 mx-auto hover:text-orange-300 transition-colors">
                <Plus className="w-4 h-4 border border-current rounded-full p-0.5" /> Add Another Day
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6 hidden lg:block">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {/* Travelers Card */}
            <div className="bg-[#0F172A] rounded-2xl p-6 border border-indigo-500/20 shadow-lg mb-6">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">TRAVELERS</h3>
                 <UserPlus className="w-4 h-4 text-orange-400" />
               </div>
               
               <div className="space-y-4 mb-6">
                 <div className="flex items-center gap-3">
                   <img src="https://ui-avatars.com/api/?name=Sarah+J&background=fb923c&color=fff" alt="Sarah J" className="w-8 h-8 rounded-full" />
                   <div>
                     <p className="text-sm font-bold text-white">Sarah J.</p>
                     <p className="text-[10px] text-gray-400">Organizer</p>
                   </div>
                 </div>
               </div>
               
               <button className="w-full bg-[#1E1B4B] text-indigo-300 text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-900 transition-colors border border-indigo-500/20">
                 <UserPlus className="w-4 h-4" /> Invite
               </button>
            </div>

            {/* Map Card */}
            <div className="bg-[#0F172A] rounded-2xl p-4 border border-indigo-500/20 shadow-lg">
               <div className="flex justify-between items-center mb-4 px-2">
                 <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">TRIP MAP</h3>
                 <MapPin className="w-4 h-4 text-orange-400" />
               </div>
               
               <div className="w-full h-48 rounded-xl overflow-hidden border border-indigo-500/20 relative">
                 <DynamicMap 
                   center={stops.length > 0 && stops[0].city ? [stops[0].city.latitude, stops[0].city.longitude] : [35.0116, 135.7681]}
                   zoom={10}
                   markers={stops.filter((s: any) => s.city).map((s: any) => ({
                     id: s.id,
                     lat: s.city.latitude,
                     lng: s.city.longitude,
                     label: s.city.name
                   }))}
                 />
               </div>
            </div>
          </motion.div>
        </aside>

      </div>
    </div>
  );
}

function DraggableItem({ icon, title, subtitle, color, border }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      className={`bg-[#0F172A] p-3 rounded-xl border border-indigo-500/20 flex items-center justify-between shadow-sm cursor-grab ${border || ''}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
          <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
        </div>
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-[10px] text-gray-400">{subtitle}</p>
        </div>
      </div>
      <span className="text-gray-600">⋮⋮</span>
    </motion.div>
  );
}

function TimelineEvent({ time, icon, iconColor, children }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 z-10 ring-4 ring-[#0B0F19]" />
      <div className="flex gap-4">
        <div className="w-16 pt-1 text-xs font-bold text-gray-500 text-right">{time}</div>
        <div className="flex-1 bg-[#0F172A] rounded-2xl p-5 relative border border-indigo-500/20 shadow-md">
          <div className={`absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center ${iconColor}`}>
            <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
