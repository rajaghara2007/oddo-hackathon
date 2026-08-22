"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Receipt, DollarSign, ArrowUpRight, ArrowDownRight, PieChart, Plus, X } from "lucide-react";
import api from "@/lib/api";

const CATEGORY_COLORS: Record<string, string> = {
  TRANSPORT: "text-blue-400 bg-blue-500/10",
  ACCOMMODATION: "text-purple-400 bg-purple-500/10",
  FOOD: "text-orange-400 bg-orange-500/10",
  ACTIVITIES: "text-emerald-400 bg-emerald-500/10",
  SIGHTSEEING: "text-yellow-400 bg-yellow-500/10",
  OTHER: "text-gray-400 bg-gray-500/10",
};

// Fallback demo data if backend is unavailable
const FALLBACK_EXPENSES = [
  { id: "1", notes: "Flights to Kyoto", amount: 1250, category: "TRANSPORT", date: "2025-10-15T00:00:00Z", currency: "USD" },
  { id: "2", notes: "Machiya Stay (7 nights)", amount: 840, category: "ACCOMMODATION", date: "2025-10-16T00:00:00Z", currency: "USD" },
  { id: "3", notes: "Omakase Dinner", amount: 320, category: "FOOD", date: "2025-10-18T00:00:00Z", currency: "USD" },
  { id: "4", notes: "Temple Entry Passes", amount: 45, category: "ACTIVITIES", date: "2025-10-19T00:00:00Z", currency: "USD" },
  { id: "5", notes: "Shinkansen Tickets", amount: 210, category: "TRANSPORT", date: "2025-10-21T00:00:00Z", currency: "USD" },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>(FALLBACK_EXPENSES);
  const [trips, setTrips] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const [budget, setBudget] = useState<number>(3000);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ notes: "", amount: "", category: "OTHER" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tripsData } = await api.get("/trips");
        setTrips(tripsData);
        if (tripsData.length > 0) {
          const firstTrip = tripsData[0];
          setSelectedTrip(firstTrip.id);
          setBudget(Number(firstTrip.budgetTotal) || 3000);
          const { data: expensesData } = await api.get(`/trips/${firstTrip.id}/expenses`);
          if (expensesData.length > 0) setExpenses(expensesData);
        }
      } catch (err) {
        console.error("Failed to load expenses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTripChange = async (tripId: string) => {
    setSelectedTrip(tripId);
    const trip = trips.find((t) => t.id === tripId);
    setBudget(Number(trip?.budgetTotal) || 3000);
    try {
      const { data } = await api.get(`/trips/${tripId}/expenses`);
      setExpenses(data.length > 0 ? data : FALLBACK_EXPENSES);
    } catch {
      setExpenses(FALLBACK_EXPENSES);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip) return;
    try {
      const { data } = await api.post(`/trips/${selectedTrip}/expenses`, {
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        date: new Date().toISOString(),
      });
      setExpenses((prev) => [data, ...prev]);
      setNewExpense({ notes: "", amount: "", category: "OTHER" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const budgetPct = Math.min(Math.round((total / budget) * 100), 100);
  const topCategory = Object.entries(
    expenses.reduce((acc: any, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    }, {})
  ).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || "–";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 font-sans pt-24 pb-12 px-6">
      <div className="max-w-[1000px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-orange-400 mb-3">
              <Receipt className="w-4 h-4" /> Trip Expenses
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Expense Tracker</h1>
          </div>

          {/* Trip Selector */}
          {trips.length > 0 && (
            <select
              value={selectedTrip}
              onChange={(e) => handleTripChange(e.target.value)}
              className="px-4 py-2.5 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500/40"
            >
              {trips.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          )}
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
            <p className="text-xs text-gray-500 mt-1">of ${budget.toLocaleString()} budget</p>
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
            <p className="text-3xl font-bold text-white">{budgetPct}% <span className="text-sm font-normal text-gray-400">used</span></p>
            <div className="mt-3 h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${budgetPct}%` }} transition={{ duration: 1, delay: 0.3 }}
                className={`h-full rounded-full ${budgetPct > 85 ? "bg-rose-500" : budgetPct > 60 ? "bg-orange-500" : "bg-emerald-500"}`}
              />
            </div>
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
            <p className="text-3xl font-bold text-white capitalize">{topCategory.toLowerCase()}</p>
          </motion.div>
        </div>

        {/* Expenses List */}
        <div className="bg-[#0F172A] border border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#1E293B]/40">
            <h3 className="text-lg font-bold text-white">Transactions ({expenses.length})</h3>
            <button
              onClick={() => setShowAddForm((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-orange-400 hover:text-orange-300 transition-colors"
            >
              {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {showAddForm ? "Cancel" : "Add New"}
            </button>
          </div>

          {/* Add Expense Form */}
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleAddExpense}
              className="px-6 py-5 border-b border-white/5 bg-[#1E293B]/20 grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <input
                required
                placeholder="Description"
                value={newExpense.notes}
                onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                className="px-4 py-2.5 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/40"
              />
              <input
                required
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount ($)"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="px-4 py-2.5 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/40"
              />
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="px-4 py-2.5 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/40"
              >
                {["TRANSPORT", "ACCOMMODATION", "FOOD", "ACTIVITIES", "SIGHTSEEING", "OTHER"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                type="submit"
                className="py-2.5 px-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-xl"
              >
                Add Expense
              </button>
            </motion.form>
          )}

          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">Loading expenses…</div>
            ) : expenses.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">No expenses recorded yet.</div>
            ) : (
              expenses.map((expense, i) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                  className="px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-200">{expense.notes || "Unnamed expense"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.OTHER}`}>
                          {expense.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="text-[10px] text-gray-500">
                          {new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-white">${Number(expense.amount).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{expense.currency || "USD"}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
