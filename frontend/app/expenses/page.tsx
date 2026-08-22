"use client";

import { motion } from "framer-motion";
import { Receipt, DollarSign, ArrowUpRight, ArrowDownRight, PieChart } from "lucide-react";

const EXPENSES = [
  { id: 1, title: "Flights to Kyoto", amount: 1250, category: "Transport", date: "Oct 15, 2025" },
  { id: 2, title: "Machiya Stay (7 nights)", amount: 840, category: "Accommodation", date: "Oct 16, 2025" },
  { id: 3, title: "Omakase Dinner", amount: 320, category: "Dining", date: "Oct 18, 2025" },
  { id: 4, title: "Temple Entry Passes", amount: 45, category: "Activities", date: "Oct 19, 2025" },
  { id: 5, title: "Shinkansen Tickets", amount: 210, category: "Transport", date: "Oct 21, 2025" },
];

export default function ExpensesPage() {
  const total = EXPENSES.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 font-sans pt-24 pb-12 px-6">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-orange-400 mb-3">
            <Receipt className="w-4 h-4" /> Trip Expenses
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Expense Tracker</h1>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Spent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="bg-[#1E293B]/60 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Total Spent</span>
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-rose-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">${total.toLocaleString()}</p>
          </motion.div>

          {/* Budget Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[#1E293B]/60 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Budget Status</span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <PieChart className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">72% <span className="text-sm font-normal text-gray-400">used</span></p>
          </motion.div>

          {/* Top Category */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#1E293B]/60 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Top Category</span>
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-orange-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">Transport</p>
          </motion.div>
        </div>

        {/* Expenses List */}
        <div className="bg-[#0F172A] border border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#1E293B]/40">
            <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
            <button className="text-xs font-bold tracking-widest uppercase text-orange-400 hover:text-orange-300">Add New</button>
          </div>
          
          <div className="divide-y divide-white/5">
            {EXPENSES.map((expense, i) => (
              <motion.div 
                key={expense.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                className="px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-200">{expense.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{expense.category}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="text-[10px] text-gray-500">{expense.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-white">${expense.amount.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
