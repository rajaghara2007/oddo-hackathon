"use client";

import { motion } from "framer-motion";
import { MapPin, Compass, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SEASONS = ["Spring", "Summer", "Autumn", "Winter"];
const COUNTRIES = ["Japan", "France", "Italy", "Thailand", "India", "Morocco"];

const LANDMARKS = [
  {
    id: "fushimi",
    type: "SHRINE",
    name: "Fushimi Inari-taisha",
    desc: "Wander through seemingly endless vermilion torii gates leading up the sacred Mount Inari.",
    img: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&q=80&w=1200",
    span: "row",
  },
  {
    id: "kinkaku",
    type: "TEMPLE",
    name: "Kinkaku-ji",
    desc: "The legendary Golden Pavilion casting a shimmering reflection across the mirror pond.",
    img: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=1000",
    span: "",
  },
  {
    id: "gion",
    type: "DISTRICT",
    name: "Gion",
    desc: "Kyoto's most famous geisha district, lined with traditional wooden machiya.",
    img: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1000",
    span: "",
  },
];

export default function DestinationDetailsPage() {
  const [season, setSeason] = useState("Spring");
  const [country, setCountry] = useState("Japan");
  const [when, setWhen] = useState("");
  const [seasonOpen, setSeasonOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 font-sans">

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[65vh] md:min-h-[600px] flex flex-col justify-end overflow-hidden pt-14">
        {/* Background image */}
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2400"
          alt="Kyoto"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        {/* Deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/60 via-[#0B0F19]/40 to-[#0B0F19]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/80 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 max-w-[1300px] mx-auto w-full px-6 pb-14 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-end">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400 mb-5">
              <MapPin className="w-3 h-3" /> Japan · Kansai Region
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white leading-tight mb-5 drop-shadow-xl">
              Echoes of<br />an Empire
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Serving as Japan's capital and the emperor's residence from 794 until 1868, Kyoto is a city of
              thousands of classical Buddhist temples, Shinto shrines, and traditional wooden machiya
              houses. It remains the undeniable center of traditional Japanese culture, famous for formal
              traditions such as kaiseki dining and geisha entertainers in the Gion district.
            </p>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-400/60 text-orange-400 text-xs font-bold tracking-widest uppercase hover:bg-orange-500/10 transition-colors"
            >
              <span className="w-3 h-px bg-orange-400" />
              UNESCO World Heritage Site
            </Link>
          </motion.div>

          {/* Right: filter card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0F172A]/90 backdrop-blur-xl border border-indigo-500/25 rounded-2xl p-5 shadow-2xl"
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-orange-400 mb-4">Explore Season</p>

            {/* Season pills */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {SEASONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    season === s
                      ? "bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                      : "bg-[#1E293B] text-gray-400 hover:text-white hover:bg-[#334155]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Country dropdown */}
            <div className="mb-3 relative">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Country</p>
              <button
                onClick={() => { setCountryOpen(v => !v); setSeasonOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-sm font-medium text-white hover:border-orange-500/40 transition-colors"
              >
                {country}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${countryOpen ? "rotate-180" : ""}`} />
              </button>
              {countryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1E293B] border border-indigo-500/20 rounded-xl overflow-hidden z-20 shadow-xl">
                  {COUNTRIES.map(c => (
                    <button key={c} onClick={() => { setCountry(c); setCountryOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${c === country ? "text-orange-400 bg-orange-500/10" : "text-gray-300 hover:bg-[#334155]"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* When input */}
            <div className="mb-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">When</p>
              <input
                type="text"
                placeholder="e.g. March 2025"
                value={when}
                onChange={e => setWhen(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/40 transition-colors"
              />
            </div>

            <motion.button
              onClick={() => router.push("/plan")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold shadow-[0_0_16px_rgba(249,115,22,0.35)] hover:shadow-[0_0_24px_rgba(249,115,22,0.5)] transition-all"
            >
              Explore Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── Curated Landmarks ─── */}
      <section className="max-w-[1300px] mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-4xl font-bold font-serif text-white mb-3">Curated Landmarks</h2>
          <p className="text-gray-500 text-base">Iconic spiritual sites and historic districts that define the Kyoto experience.</p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Large card - spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/5 md:row-span-2 min-h-[400px] md:min-h-[500px]"
          >
            <img src={LANDMARKS[0].img} alt={LANDMARKS[0].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/20 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7">
              <span className="text-[9px] font-bold tracking-widest uppercase text-orange-400 mb-2 block">{LANDMARKS[0].type}</span>
              <h3 className="text-2xl font-bold font-serif text-white mb-2">{LANDMARKS[0].name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{LANDMARKS[0].desc}</p>
            </div>
          </motion.div>

          {/* Two smaller cards */}
          {LANDMARKS.slice(1).map((lm, i) => (
            <motion.div
              key={lm.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 1) * 0.1 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/5 min-h-[240px]"
            >
              <img src={lm.img} alt={lm.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[9px] font-bold tracking-widest uppercase text-orange-400 mb-1.5 block">{lm.type}</span>
                <h3 className="text-xl font-bold font-serif text-white mb-1">{lm.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{lm.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Explore the Topography ─── */}
      <section className="mx-6 mb-20 max-w-[1300px] lg:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-[#0F172A] border border-indigo-500/20 p-12 md:p-16 text-center shadow-2xl"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <Compass className="w-7 h-7 text-orange-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">Explore the Topography</h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto">
              Interactive map detailing sacred routes, hidden teahouses, and exclusive guardian access points.
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

