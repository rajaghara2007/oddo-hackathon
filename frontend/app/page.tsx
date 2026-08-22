"use client";

import Link from "next/link";
import { Search, MapPin, Star, ArrowRight, Compass } from "lucide-react";
import { ScrollPlane } from "@/components/3d/ScrollPlane";
import { motion } from "framer-motion";

const DESTINATIONS = [
  {
    id: "santorini",
    title: "Santorini, Greece",
    category: "Luxury",
    rating: "4.9",
    price: "$2,400",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "tokyo",
    title: "Tokyo, Japan",
    category: "Culture",
    rating: "4.8",
    price: "$1,850",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "zermatt",
    title: "Zermatt, Switzerland",
    category: "Adventure",
    rating: "4.9",
    price: "$3,100",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1000",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

// Text Animation Variants
const titleContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const titleWord: any = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 150, damping: 20 } }
};

export default function Home() {
  const headingText = "Curate your extraordinary journey.".split(" ");

  return (
    <div className="min-h-screen font-sans pb-24 overflow-hidden pt-24 text-gray-200">
      
      {/* 3D Plane Background */}
      <ScrollPlane />

      {/* Hero Section */}
      <section className="relative h-[800px] flex items-center max-w-[1400px] mx-auto px-6">
        <div className="relative z-10 w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/40 border border-indigo-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg shadow-orange-500/10">
              <Compass className="w-4 h-4" /> The New Standard of Travel
            </div>
            
            <motion.h1 
              variants={titleContainer}
              initial="hidden"
              animate="show"
              className="text-6xl md:text-8xl font-bold font-serif mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-orange-100 via-white to-orange-200 drop-shadow-xl perspective-[1000px] flex flex-wrap gap-x-4 gap-y-2"
            >
              {headingText.map((word, i) => (
                <motion.span key={i} variants={titleWord} style={{ transformOrigin: "bottom" }} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-medium"
            >
              Experience the world like never before. AI-driven itineraries, luxury concierge access, and stunning destination previews.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-[#0F172A]/80 backdrop-blur-xl border border-indigo-500/30 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center p-2 pl-6"
              whileHover={{ boxShadow: "0 10px 40px rgba(249,115,22,0.25)" }}
            >
              <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Where to next? Try 'Kyoto' or 'Amalfi'" 
                className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-gray-500 font-medium"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3.5 rounded-full font-bold shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.6)] transition-all"
              >
                Explore
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="max-w-[1400px] mx-auto px-6 mt-32 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-2">CURATED ESCAPES</p>
              <h2 className="text-4xl font-bold font-serif text-white">Trending Destinations</h2>
            </div>
            <Link href="/collections" className="text-sm font-bold flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors">
              View all collections <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest) => (
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                key={dest.id} 
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer shadow-2xl border border-indigo-900/50 bg-[#0F172A]"
              >
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0F172A]/80 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full text-orange-400 border border-indigo-500/20 shadow-sm">
                    {dest.category}
                  </span>
                </div>
                
                <div className="absolute bottom-6 inset-x-6 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-bold font-serif mb-2 group-hover:text-orange-400 transition-colors">{dest.title}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="font-bold">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1 font-medium">From</p>
                    <p className="font-bold text-lg text-orange-100">{dest.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Featured Itinerary Card */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-indigo-900/50 bg-[#0F172A]"
          >
             <div className="lg:col-span-2 relative h-[400px] overflow-hidden group cursor-pointer bg-[#020617]">
               <img src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1000" alt="Map" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-indigo-900/30 mix-blend-overlay" />
             </div>
             <div className="p-10 flex flex-col justify-center relative overflow-hidden border-l border-indigo-900/30">
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl opacity-50" />
               <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-4 relative z-10">FEATURED ITINERARY</p>
               <h3 className="text-3xl font-bold font-serif text-white mb-4 relative z-10">7 Days in Kyoto: Temples & Traditions</h3>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed relative z-10">
                 Immerse yourself in Japan's cultural heart. From serene bamboo groves to private tea ceremonies, this itinerary offers an unparalleled look into the ancient world.
               </p>
               <Link href="/trips/kyoto" className="text-sm font-bold flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors w-max relative z-10 group">
                 View Itinerary <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Plan like a pro */}
      <section className="max-w-4xl mx-auto text-center mt-40 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <h2 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-white drop-shadow-2xl">
            Plan like a pro,<br />travel like a local.
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            Our concierge-level itineraries blend iconic landmarks with intimate, off-the-beaten-path experiences. We handle the logistics, you savor the journey.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#0B0F19] font-bold px-12 py-5 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] transition-all text-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
