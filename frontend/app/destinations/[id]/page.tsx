"use client";

import { Calendar, Plus, MapPin, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DestinationDetailsPage() {
  return (
    <div className="min-h-screen text-gray-200 pb-24 font-sans pt-16">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000" 
          alt="Kyoto Autumn" 
          className="w-full h-full object-cover opacity-80 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
        
        <div className="absolute bottom-16 inset-x-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-end gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-4 block flex items-center gap-2">
                <span className="w-8 h-px bg-orange-400"></span> DESTINATION GUIDE
              </span>
              <h1 className="text-6xl md:text-7xl font-bold font-serif text-white mb-6 drop-shadow-lg">Kyoto, Japan</h1>
              <p className="text-xl text-indigo-100 font-medium leading-relaxed max-w-xl">
                The cultural heart of Japan, where ancient traditions endure in temples, gardens, and teahouses.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all border border-indigo-400/30"
            >
              <Plus className="w-5 h-5" /> Add to Itinerary
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
        
        {/* Main Content */}
        <main>
          {/* Echoes of an Empire */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold font-serif text-white mb-6">Echoes of an Empire</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Serving as Japan's capital and the emperor's residence from 794 until 1868, Kyoto is a city of thousands of classical Buddhist temples, Shinto shrines, and traditional wooden machiya houses. It remains the undeniable center of traditional Japanese culture, famous for formal traditions such as kaiseki dining and geisha entertainers in the Gion district.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-orange-400 tracking-widest uppercase bg-orange-950/30 w-max px-4 py-2 rounded-lg border border-orange-500/20">
              <span className="w-4 h-px bg-orange-500" />
              UNESCO WORLD HERITAGE SITE
            </div>
          </motion.section>

          {/* Curated Landmarks */}
          <section className="mb-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold font-serif text-white mb-4">Curated Landmarks</h2>
              <p className="text-indigo-200/50 mb-10 text-lg">Iconic spiritual sites and historic districts that define the Kyoto experience.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fushimi Inari */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] md:row-span-2 md:aspect-[3/4] cursor-pointer shadow-2xl border border-indigo-900/50"
              >
                <img src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&q=80&w=1000" alt="Fushimi Inari" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/20 to-transparent" />
                <div className="absolute bottom-8 inset-x-8 text-white">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-orange-400 mb-3 block">SHRINE</span>
                  <h3 className="text-3xl font-bold font-serif mb-3">Fushimi Inari Taisha</h3>
                  <p className="text-sm text-gray-300">Wander through seemingly endless vermilion torii gates that lead up the sacred Mount Inari.</p>
                </div>
              </motion.div>

              {/* Kinkaku-ji */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="group relative rounded-3xl overflow-hidden aspect-video cursor-pointer shadow-2xl border border-indigo-900/50"
              >
                <img src="https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=1000" alt="Kinkaku-ji" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/20 to-transparent" />
                <div className="absolute bottom-6 inset-x-6 text-white">
                  <h3 className="text-2xl font-bold font-serif mb-2">Kinkaku-ji</h3>
                  <p className="text-xs text-gray-300 line-clamp-1">The legendary Golden Pavilion casting an shimmering reflection.</p>
                </div>
              </motion.div>

              {/* Gion District */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="group relative rounded-3xl overflow-hidden aspect-video cursor-pointer shadow-2xl border border-indigo-900/50"
              >
                <img src="https://images.unsplash.com/photo-1542051812871-75f11100f723?auto=format&fit=crop&q=80&w=1000" alt="Gion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/20 to-transparent" />
                <div className="absolute bottom-6 inset-x-6 text-white">
                  <h3 className="text-2xl font-bold font-serif mb-2">Gion District</h3>
                  <p className="text-xs text-gray-300 line-clamp-1">Step back in time in Kyoto's most famous geisha district.</p>
                </div>
              </motion.div>
            </div>
          </section>

        </main>

        {/* Right Sidebar */}
        <aside>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {/* When to Go Widget */}
            <div className="bg-[#0F172A] rounded-3xl p-8 shadow-2xl border border-indigo-500/20 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold font-serif text-white">When to Go</h3>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/30 flex justify-between items-center shadow-inner">
                  <span className="text-sm font-bold text-orange-100">Spring (Mar-May)</span>
                  <span className="text-[10px] font-bold text-orange-300 bg-orange-950/50 px-3 py-1.5 rounded-full border border-orange-500/20">Recommended</span>
                </div>
                
                <div className="bg-[#1E1B4B]/30 p-4 rounded-2xl border border-indigo-500/20 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-300">Autumn (Sep-Nov)</span>
                  <span className="text-[10px] font-bold text-gray-400 bg-indigo-950/50 px-3 py-1.5 rounded-full border border-indigo-500/20">Fall Foliage</span>
                </div>
                
                <div className="bg-[#1E1B4B]/30 p-4 rounded-2xl border border-indigo-500/20 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-300">Winter (Dec-Feb)</span>
                  <span className="text-[10px] font-bold text-gray-400 bg-indigo-950/50 px-3 py-1.5 rounded-full border border-indigo-500/20">Quiet Temples</span>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

      </div>
    </div>
  );
}
