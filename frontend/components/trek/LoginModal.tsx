"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Mail, Lock, Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      setForm({ email: "", password: "" });
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-[#1E293B] border border-indigo-500/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/50 transition-all shadow-xl"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="bg-[#0F172A]/95 backdrop-blur-2xl border border-indigo-500/25 rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-8">
                  <Compass className="w-6 h-6 text-orange-400" />
                  <span className="font-bold text-sm tracking-[0.18em] text-white uppercase">
                    Tripora
                  </span>
                </div>

                <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-2 text-center">
                  Welcome back
                </p>
                <h2 className="text-2xl font-bold text-white font-serif mb-7 text-center">
                  Sign In
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        placeholder="••••••••"
                        className="w-full pl-11 pr-12 py-3 bg-[#1E293B] border border-indigo-500/20 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      "Signing in…"
                    ) : (
                      <>
                        Sign In <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  No account?{" "}
                  <Link
                    href="/register"
                    onClick={onClose}
                    className="text-orange-400 font-bold hover:text-orange-300 transition-colors"
                  >
                    Create one
                  </Link>
                </p>

                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-600 text-center font-mono">
                    Demo:{" "}
                    <span className="text-gray-400">demo@tripora.com</span> /{" "}
                    <span className="text-gray-400">password123</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
