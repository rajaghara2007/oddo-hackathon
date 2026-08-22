"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, ShieldCheck, MapPin, Calendar, Users, Home, 
  PhoneCall, MessageSquare, AlertTriangle, Share2, Info, Plus, 
  HeartPulse, Shield, Map as MapIcon, Contact, ChevronRight, X 
} from "lucide-react";
import { MOCK_GUARDIAN_DATA, SafetyStatusType } from "@/data/guardian";

export default function GuardianClient() {
  const [safetyStatus, setSafetyStatus] = useState<SafetyStatusType>(MOCK_GUARDIAN_DATA.safetyStatus);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(MOCK_GUARDIAN_DATA.lastCheckIn);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleCheckIn = () => {
    setSafetyStatus("safe");
    setLastCheckIn("Just now");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 pt-20 pb-24 overflow-x-hidden">
      
      {/* 🚨 Emergency Modal */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowEmergencyModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#1E1B4B] border-2 border-red-500/50 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.3)] z-10"
            >
              <button 
                onClick={() => setShowEmergencyModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Emergency Assistance</h2>
                <p className="text-sm text-gray-400">Select the type of assistance you need right now.</p>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-3"><HeartPulse className="w-5 h-5" /> Medical Emergency</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-3"><Shield className="w-5 h-5" /> Police / Security</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 text-white rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-3"><Home className="w-5 h-5 text-indigo-400" /> Contact Hotel</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/30 text-white rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-3"><Contact className="w-5 h-5 text-orange-400" /> Emergency Contact</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/30 text-white rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-3"><MapPin className="w-5 h-5 text-emerald-400" /> Share Location</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-2">Safety Center</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">Travel Guardian</h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setShowEmergencyModal(true)}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-3 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:bg-red-500 hover:text-white transition-all w-full md:w-auto justify-center"
          >
            <ShieldAlert className="w-5 h-5" /> Emergency Mode
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Column */}
          <div className="flex-1 space-y-6 min-w-0">
            
            {/* Active Trip Dashboard */}
            <div className="bg-[#1E293B]/60 border border-indigo-500/20 rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Trip Active</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white font-serif mb-4">{MOCK_GUARDIAN_DATA.destination}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-400" /> {new Date(MOCK_GUARDIAN_DATA.startDate).toLocaleDateString()} – {new Date(MOCK_GUARDIAN_DATA.endDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-orange-400" /> {MOCK_GUARDIAN_DATA.travellers} Travellers</span>
                    <span className="flex items-center gap-1.5"><Home className="w-4 h-4 text-sky-400" /> {MOCK_GUARDIAN_DATA.hotel}</span>
                  </div>
                </div>
                
                {/* Check-in Module */}
                <div className="bg-[#0B0F19] border border-white/10 rounded-2xl p-5 w-full md:w-64 shrink-0 text-center">
                  <div className="flex justify-center mb-3">
                    {safetyStatus === "safe" ? (
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Info className="w-6 h-6 text-amber-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-white mb-1">
                    {safetyStatus === "safe" ? "You're marked as safe" : "Check in required"}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">Last updated: {lastCheckIn || "Never"}</p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleCheckIn}
                    disabled={safetyStatus === "safe" && lastCheckIn === "Just now"}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 disabled:from-emerald-500/50 disabled:to-teal-500/50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" /> I'm Safe
                  </motion.button>
                </div>
              </div>

              {/* Smart Alerts */}
              {MOCK_GUARDIAN_DATA.alerts.length > 0 && (
                <div className="border-t border-indigo-500/20 pt-6">
                  <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /> Smart Alerts</h3>
                  <div className="space-y-3">
                    {MOCK_GUARDIAN_DATA.alerts.map(alert => (
                      <div key={alert.id} className="flex items-start gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                        <span className="text-xl">{alert.icon}</span>
                        <p className="text-sm text-gray-300">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Safety & Nearby Services */}
            <div>
              <h2 className="text-2xl font-bold text-white font-serif mb-6 flex items-center gap-2"><MapIcon className="w-6 h-6 text-indigo-400" /> Nearby Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {MOCK_GUARDIAN_DATA.nearbyServices.map(service => (
                  <div key={service.id} className="bg-[#1E293B]/40 border border-indigo-500/10 p-4 rounded-2xl flex justify-between items-center group hover:border-indigo-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        {service.type === "hospital" ? <HeartPulse className="w-5 h-5 text-rose-400" /> : 
                         service.type === "police" ? <Shield className="w-5 h-5 text-blue-400" /> : 
                         <MapPin className="w-5 h-5 text-gray-400" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{service.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{service.address}</p>
                        {service.phone && <p className="text-xs text-indigo-300 mt-1">{service.phone}</p>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-gray-500 block mb-1">{service.distance}</span>
                      <button className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors">
                        <MapIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map Placeholder for Guardian */}
              <div className="h-48 rounded-2xl overflow-hidden relative border border-indigo-500/20">
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="absolute inset-0 bg-[#0B0F19]/60" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <p className="text-sm font-bold text-indigo-300 bg-[#1E293B]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-500/30">
                    Live Map Integration Pending
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            
            {/* Share Trip Status */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-[#0B0F19] border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Share2 className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">Share Trip Status</h3>
              <p className="text-xs text-gray-400 mb-6 relative z-10">Keep your loved ones updated with your live location and itinerary.</p>
              
              <div className="bg-[#0B0F19]/80 rounded-xl p-4 mb-4 border border-white/5 relative z-10">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Preview</p>
                <p className="text-sm font-bold text-white">GlobeTrotter Trip</p>
                <p className="text-xs text-gray-400">📍 {MOCK_GUARDIAN_DATA.destination}</p>
                <p className="text-xs text-gray-400">🟢 Active & Safe</p>
              </div>

              <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-colors relative z-10 flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share Link
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-[#1E293B]/40 border border-indigo-500/20 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-400" /> Contacts
                </h3>
                <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {MOCK_GUARDIAN_DATA.emergencyContacts.map(contact => (
                  <div key={contact.id} className="bg-[#0B0F19]/50 border border-white/5 rounded-xl p-3">
                    <p className="text-sm font-bold text-white">{contact.name}</p>
                    <p className="text-xs text-gray-500 mb-3">{contact.relationship}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 rounded-md transition-colors flex items-center justify-center gap-1.5">
                        <PhoneCall className="w-3 h-3" /> Call
                      </button>
                      <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 rounded-md transition-colors flex items-center justify-center gap-1.5">
                        <MessageSquare className="w-3 h-3" /> Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Guardian Integration */}
            <div className="bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm font-bold text-white">AI Assistant</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">Ask about local emergency numbers, embassy locations, or lost passport procedures.</p>
              <div className="space-y-2">
                <div className="bg-[#0B0F19]/60 text-xs text-gray-300 p-2.5 rounded-lg border border-white/5 cursor-pointer hover:border-orange-500/30 transition-colors">
                  "Where is the nearest hospital?"
                </div>
                <div className="bg-[#0B0F19]/60 text-xs text-gray-300 p-2.5 rounded-lg border border-white/5 cursor-pointer hover:border-orange-500/30 transition-colors">
                  "What to do if I lose my passport?"
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}
