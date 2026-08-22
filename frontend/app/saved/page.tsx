"use client";

import { Heart, ArrowRight, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

const SAVED_ITEMS = [
  {
    id: 1,
    type: "ITINERARY",
    title: "Amalfi Coast Retreat",
    description: "A majestic 7-day journey through cliffside villages, azure waters, and...",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    type: "PLACE",
    title: "Marrakech Medina",
    description: "Lose yourself in the vibrant souks, rich spices, and hidden riad sanctuaries.",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    type: "DESTINATION",
    title: "Patagonia Wilderness",
    description: "The ultimate edge-of-the-world adventure offering dramatic landscape...",
    image: "https://images.unsplash.com/photo-1518182170546-0766de6b6aad?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    type: "DESTINATION",
    title: "Kyoto Autumn Walk",
    description: "Experience the quiet luxury of ancient temples bathed in vibrant autumn...",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function CuratedCollectionPage() {
  return (
    <div className="min-h-screen text-gray-200 pb-24 pt-32">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-bold font-serif text-white mb-4 drop-shadow-md">Curated Collection</h1>
            <p className="text-gray-400 max-w-xl text-lg font-medium">
              Your personal archive of dreamed-of destinations and meticulously planned itineraries.
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-300 bg-[#1E1B4B]/30 border border-indigo-500/30 px-4 py-2.5 rounded-full hover:bg-indigo-900/40 transition-colors shadow-sm">
            <Settings2 className="w-4 h-4" /> Options
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shadow-md shadow-indigo-900/30">
            All Saved
          </button>
          <button className="bg-[#0F172A] text-gray-400 border border-indigo-500/20 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap hover:bg-indigo-900/30 hover:text-white transition-colors">
            Destinations
          </button>
          <button className="bg-[#0F172A] text-gray-400 border border-indigo-500/20 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap hover:bg-indigo-900/30 hover:text-white transition-colors">
            Itineraries
          </button>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {SAVED_ITEMS.map((item) => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)" }}
              key={item.id} 
              className="bg-[#0F172A] rounded-3xl overflow-hidden border border-indigo-500/20 shadow-lg group cursor-pointer flex flex-col relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative h-56 overflow-hidden bg-[#020617]">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent opacity-80" />
                <div className="absolute top-4 left-4 bg-[#1E1B4B]/80 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {item.type}
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0B0F19]/60 backdrop-blur-md flex items-center justify-center text-gray-400 border border-indigo-500/20 shadow-sm hover:text-rose-500 hover:bg-[#0B0F19]/80 transition-colors">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <h3 className="text-2xl font-bold font-serif text-white mb-3 group-hover:text-orange-400 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-8 flex-1 leading-relaxed">{item.description}</p>
                <div className="text-sm font-bold text-orange-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
