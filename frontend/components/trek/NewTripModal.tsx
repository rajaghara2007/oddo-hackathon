"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Search, CalendarDays, Bell, Users, ChevronDown } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CURRENCIES = ["EUR (€)", "USD ($)", "GBP (£)", "JPY (¥)", "INR (₹)", "AUD (A$)", "CAD (C$)"];
const REMINDER_OPTIONS = ["None", "1 day", "3 days", "9 days", "Custom"];

export default function NewTripModal({ open, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState("7");
  const [currency, setCurrency] = useState("EUR (€)");
  const [reminder, setReminder] = useState("3 days");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [unsplashQuery, setUnsplashQuery] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    // In future: POST to API. For demo, just close.
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-lg bg-[#0F172A] border border-indigo-500/20 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-indigo-500/10 bg-[#0F172A]">
              <h2 className="text-xl font-bold text-white font-serif">Create New Trip</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#1E293B] hover:bg-[#334155] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto max-h-[75vh] px-6 py-5 space-y-5">

              {/* Cover Image */}
              <div>
                <p className="text-sm font-bold text-gray-300 mb-2">Cover Image</p>
                <label
                  htmlFor="cover-upload"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="relative flex items-center justify-center h-32 border-2 border-dashed border-indigo-500/30 rounded-2xl cursor-pointer hover:border-orange-500/50 transition-colors overflow-hidden group"
                >
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-300 transition-colors">
                      <Camera className="w-6 h-6" />
                      <span className="text-xs font-medium">Add cover image (or drag & drop)</span>
                    </div>
                  )}
                  <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
                {/* Unsplash search */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={unsplashQuery}
                    onChange={(e) => setUnsplashQuery(e.target.value)}
                    placeholder="Search destination photos"
                    className="flex-1 bg-[#1E293B] border border-indigo-500/20 rounded-xl px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-orange-500/50 transition-colors"
                  />
                  <button className="flex items-center gap-1.5 bg-[#1E293B] border border-indigo-500/20 rounded-xl px-3 py-2 text-xs font-bold text-gray-300 hover:text-orange-400 hover:border-orange-500/30 transition-colors whitespace-nowrap">
                    <Search className="w-3.5 h-3.5" /> Search Unsplash
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1">
                  Title <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer in Japan"
                  className="w-full bg-[#1E293B] border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-1.5 block">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this trip about?"
                  rows={3}
                  className="w-full bg-[#1E293B] border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-orange-500/50 transition-colors resize-none"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-indigo-400" /> Start Date
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="flex-1 bg-[#1E293B] border border-indigo-500/20 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500/50 transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-indigo-400" /> End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#1E293B] border border-indigo-500/20 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500/50 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Number of Days */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-1.5 block">Number of Days</label>
                <input
                  type="number"
                  value={days}
                  min={1}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full bg-[#1E293B] border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500/50 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">How many days to plan for when no travel dates are set.</p>
              </div>

              {/* Currency */}
              <div className="relative">
                <label className="text-sm font-bold text-gray-300 mb-1.5 block">Currency</label>
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="w-full flex items-center justify-between bg-[#1E293B] border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white hover:border-orange-500/40 transition-colors"
                >
                  {currency}
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {currencyOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute z-20 left-0 right-0 mt-1 bg-[#1E293B] border border-indigo-500/20 rounded-2xl shadow-xl overflow-hidden"
                    >
                      {CURRENCIES.map((c) => (
                        <li
                          key={c}
                          onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                          className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[#334155] transition-colors ${c === currency ? "text-orange-400 font-bold" : "text-gray-300"}`}
                        >
                          {c}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Reminder */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-indigo-400" /> Reminder
                </label>
                <div className="flex flex-wrap gap-2">
                  {REMINDER_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setReminder(opt)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        reminder === opt
                          ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                          : "bg-[#1E293B] text-gray-400 border border-indigo-500/20 hover:text-white hover:border-indigo-400/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Buddies */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-400" /> Travel buddies
                </label>
                <button className="flex items-center gap-2 bg-[#1E293B] border border-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-indigo-400/40 transition-colors">
                  <span>Add member</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Footer actions */}
            <div className="sticky bottom-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-indigo-500/10 bg-[#0F172A]">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white bg-[#1E293B] hover:bg-[#334155] border border-indigo-500/20 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreate}
                disabled={!title.trim()}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create New Trip
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
