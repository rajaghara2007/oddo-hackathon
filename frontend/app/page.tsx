"use client";

import Link from "next/link";
import { Search, MapPin, Star, ArrowRight, Compass } from "lucide-react";
import { Globe } from "@/components/3d/Globe";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen font-sans pb-24 overflow-hidden pt-24 text-[#0F172A]">
      {/* Hero Section */}
      <section ref={targetRef} className="relative h-[800px] flex items-center max-w-[1400px] mx-auto px-6">
        
        {/* Globe Background */}
        <motion.div style={{ opacity, scale, y }} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden lg:block mix-blend-multiply">
          <Globe />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200 text-orange-600 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-sm">
              <Compass className="w-4 h-4" /> The New Standard of Travel
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold font-serif mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 drop-shadow-sm">
              Curate your <br/> extraordinary <br/> journey.
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed font-medium">
              Experience the world like never before. AI-driven itineraries, luxury concierge access, and stunning 3D destination previews.
            </p>
            
            <motion.div 
              className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center p-2 pl-6"
              whileHover={{ boxShadow: "0 10px 40px rgba(249,115,22,0.15)" }}
            >
              <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Where to next? Try 'Kyoto' or 'Amalfi'" 
                className="flex-1 bg-transparent border-none outline-none px-4 text-gray-800 placeholder:text-gray-400 font-medium"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-8 py-3.5 rounded-full font-bold shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:bg-orange-600 transition-all"
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
              <h2 className="text-4xl font-bold font-serif text-[#0F172A]">Trending Destinations</h2>
            </div>
            <Link href="/collections" className="text-sm font-bold flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
              View all collections <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest) => (
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                key={dest.id} 
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer shadow-xl border border-gray-100 bg-white"
              >
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full text-[#0F172A] shadow-sm">
                    {dest.category}
                  </span>
                </div>
                
                <div className="absolute bottom-6 inset-x-6 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-bold font-serif mb-2 group-hover:text-orange-300 transition-colors">{dest.title}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="font-bold">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/80 mb-1 font-medium">From</p>
                    <p className="font-bold text-lg">{dest.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Featured Itinerary Card */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
          >
             <div className="lg:col-span-2 relative h-[400px] overflow-hidden group cursor-pointer bg-gray-100">
               <img src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1000" alt="Map" className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" />
             </div>
             <div className="bg-white p-10 flex flex-col justify-center relative overflow-hidden border-l border-gray-100">
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50" />
               <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-4 relative z-10">FEATURED ITINERARY</p>
               <h3 className="text-3xl font-bold font-serif text-[#0F172A] mb-4 relative z-10">7 Days in Kyoto: Temples & Traditions</h3>
               <p className="text-gray-600 text-sm mb-8 leading-relaxed relative z-10">
                 Immerse yourself in Japan's cultural heart. From serene bamboo groves to private tea ceremonies, this itinerary offers an unparalleled look into the ancient world.
               </p>
               <Link href="/trips/kyoto" className="text-sm font-bold flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors w-max relative z-10 group">
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
          <div className="absolute inset-0 bg-orange-50 blur-[120px] rounded-full pointer-events-none -z-10" />
          <h2 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-[#0F172A]">
            Plan like a pro,<br />travel like a local.
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            Our concierge-level itineraries blend iconic landmarks with intimate, off-the-beaten-path experiences. We handle the logistics, you savor the journey.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0F172A] text-white font-bold px-12 py-5 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.4)] transition-all text-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
