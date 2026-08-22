"use client";

import { Plane, Train, Hotel, Landmark, Utensils, Share2, Edit3, UserPlus, Plus, Check, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TripItineraryPage() {
  return (
    <div className="min-h-screen pb-24 pt-28 text-[#0F172A]">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-8">
        
        {/* LEFT SIDEBAR: Trip Items */}
        <aside className="space-y-6 hidden lg:block">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-bold font-serif text-[#0F172A] mb-1">Trip Items</h2>
            <p className="text-xs text-gray-500 mb-6">Drag items onto your timeline to schedule.</p>
            
            <div className="space-y-6">
              {/* Transport Category */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">TRANSPORT</h3>
                <div className="space-y-2">
                  <DraggableItem icon={<Plane />} title="Flight" subtitle="CDG Arrival" color="bg-blue-100 text-blue-600" />
                  <DraggableItem icon={<Train />} title="Train" subtitle="Bernina" color="bg-blue-100 text-blue-600" />
                </div>
              </div>

              {/* Stays Category */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">STAYS</h3>
                <DraggableItem icon={<Hotel />} title="Boutique Hotel" subtitle="Le Marais" color="bg-yellow-100 text-yellow-600" border="border-l-4 border-l-yellow-400" />
              </div>

              {/* Activities Category */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">ACTIVITIES</h3>
                <div className="space-y-2">
                  <DraggableItem icon={<Landmark />} title="Museum Visit" subtitle="Louvre or Orsay" color="bg-orange-100 text-orange-600" />
                  <DraggableItem icon={<Utensils />} title="Dining" subtitle="Dinner Reservation" color="bg-red-100 text-red-600" />
                </div>
              </div>

              <button className="w-full py-3 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors border border-gray-200">
                <Plus className="w-4 h-4" /> Add Custom Item
              </button>
            </div>
          </motion.div>
        </aside>

        {/* MAIN CONTENT: Timeline */}
        <main className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col min-h-[800px]">
          {/* Header Image */}
          <div className="relative h-64 bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1000" 
              alt="Paris" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 inset-x-8 text-white flex justify-between items-end"
            >
              <div>
                <span className="bg-white/20 border border-white/30 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                  Autumn in Paris
                </span>
                <h1 className="text-4xl font-bold font-serif mb-1">Parisian Getaway</h1>
                <p className="text-sm text-white/80">Oct 12 - Oct 16 • 5 Days</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Timeline Container */}
          <div className="p-8">
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[0.85rem] top-8 bottom-0 w-px bg-gray-200" />
              
              {/* Day Header */}
              <motion.div 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="relative mb-10"
              >
                <div className="absolute -left-[2.1rem] w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm z-10 shadow-sm">
                  1
                </div>
                <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Arrival & Marais</h2>
                <p className="text-sm text-gray-500">Thursday, Oct 12</p>
              </motion.div>

              {/* Events */}
              <div className="space-y-8 relative">
                
                {/* Flight Arrival */}
                <TimelineEvent time="10:30 AM" icon={<Plane />} iconColor="text-blue-500 bg-blue-100">
                  <h4 className="text-lg font-bold font-serif text-[#0F172A] mb-1">Flight Arrival</h4>
                  <p className="text-sm text-gray-600 mb-3">Charles de Gaulle<br/>Airport (CDG)</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                    <Check className="w-3 h-3 text-green-500" /> Terminal 2E
                  </span>
                </TimelineEvent>

                {/* Hotel Check-in */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0F172A] z-10 ring-4 ring-white" />
                  <div className="flex gap-4">
                    <div className="w-16 pt-1 text-xs font-bold text-gray-400 text-right">02:00 PM</div>
                    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                      <div className="h-32 bg-gray-100 relative">
                         <img src="https://images.unsplash.com/photo-1551882547-ff40c0d12c56?auto=format&fit=crop&q=80&w=1000" alt="Hotel" className="w-full h-full object-cover" />
                         <span className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                           <Star className="w-3 h-3 fill-current" /> Lodging
                         </span>
                      </div>
                      <div className="p-5 relative">
                        <div className="absolute right-4 top-5 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                          <Hotel className="w-4 h-4" />
                        </div>
                        <h4 className="text-xl font-bold font-serif text-[#0F172A] mb-1">Le Pavillon de<br/>la Reine</h4>
                        <p className="text-xs text-gray-500 mb-4 flex items-start gap-1">
                          <MapPin className="w-3 h-3 mt-0.5 text-orange-500" /> Place des Vosges, 3rd Arrondissement
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">🌿 Spa & Wellness</span>
                          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">🪴 Courtyard Garden</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-[#0F172A] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">View Booking</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Explore */}
                <TimelineEvent time="04:30 PM" icon={<Landmark />} iconColor="text-orange-500 bg-orange-100">
                  <h4 className="text-lg font-bold font-serif text-[#0F172A] mb-2">Explore Le<br/>Marais</h4>
                  <p className="text-sm text-gray-600">Walking tour of historic streets, boutiques, and cafes.</p>
                </TimelineEvent>

              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button className="text-sm font-bold text-orange-500 flex items-center gap-2 mx-auto hover:text-orange-600 transition-colors">
                <Plus className="w-4 h-4 border border-current rounded-full p-0.5" /> Add Another Day
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6 hidden lg:block">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {/* Travelers Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">TRAVELERS</h3>
                 <UserPlus className="w-4 h-4 text-orange-500" />
               </div>
               
               <div className="space-y-4 mb-6">
                 <div className="flex items-center gap-3">
                   <img src="https://ui-avatars.com/api/?name=Sarah+J&background=f97316&color=fff" alt="Sarah J" className="w-8 h-8 rounded-full" />
                   <div>
                     <p className="text-sm font-bold text-[#0F172A]">Sarah J.</p>
                     <p className="text-[10px] text-gray-500">Organizer</p>
                   </div>
                 </div>
               </div>
               
               <button className="w-full bg-gray-50 text-gray-700 text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border border-gray-200">
                 <UserPlus className="w-4 h-4" /> Invite
               </button>
            </div>

            {/* Budget Tracker Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">BUDGET TRACKER</h3>
                 <span className="text-gray-400">⋯</span>
               </div>
               
               <div className="flex justify-between items-end mb-3">
                 <div>
                   <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">TOTAL EST.</p>
                   <p className="text-3xl font-bold text-[#0F172A]">$4,250</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">LIMIT</p>
                   <p className="text-sm font-bold text-gray-800">$5,000</p>
                 </div>
               </div>
               
               {/* Progress bar */}
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex mb-6">
                 <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-[#0F172A]" />
                 <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} transition={{ delay: 0.8, duration: 1 }} className="h-full bg-orange-400" />
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
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm cursor-grab ${border || ''}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
          <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
        </div>
        <div>
          <p className="text-sm font-bold text-[#0F172A]">{title}</p>
          <p className="text-[10px] text-gray-500">{subtitle}</p>
        </div>
      </div>
      <span className="text-gray-300">⋮⋮</span>
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
      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0F172A] z-10 ring-4 ring-white" />
      <div className="flex gap-4">
        <div className="w-16 pt-1 text-xs font-bold text-gray-400 text-right">{time}</div>
        <div className="flex-1 bg-gray-50 rounded-2xl p-5 relative border border-gray-100 shadow-sm">
          <div className={`absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center ${iconColor}`}>
            <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
