"use client";

import { motion } from "framer-motion";
import { Plane, QrCode } from "lucide-react";

export function TicketConfirmationCard({ flight = "EK085", date = "Dec 12, 2026", from = "ZRH", to = "DXB", name = "GLOBE TROTTER" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col"
    >
      <div className="p-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-semibold uppercase tracking-widest opacity-80">Boarding Pass</span>
          <Plane className="w-5 h-5 text-white/80" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">{from}</p>
            <p className="text-xs mt-1 opacity-80">Zurich</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full border-b-2 border-dashed border-white/50 mb-1" />
            <Plane className="w-4 h-4" />
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{to}</p>
            <p className="text-xs mt-1 opacity-80">Dubai</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-y-4 text-zinc-800 dark:text-zinc-200">
          <div>
            <p className="text-xs uppercase text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">Flight</p>
            <p className="font-medium text-lg">{flight}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">Date</p>
            <p className="font-medium text-lg">{date}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">Passenger</p>
            <p className="font-medium text-lg">{name}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">Seat</p>
            <p className="font-medium text-lg">12A</p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-6 flex justify-center">
          <QrCode className="w-32 h-32 text-zinc-800 dark:text-zinc-200" />
        </div>
      </div>
    </motion.div>
  );
}
