"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Bell, Search, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  // Sync with localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
    }
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        // Dark mode
        document.documentElement.style.filter = "";
        localStorage.setItem("theme", "dark");
      } else {
        // Light mode – quick invert trick for the dark design
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-indigo-500/20 py-3 shadow-lg shadow-black/50"
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Globe className="w-8 h-8 text-orange-400 transition-transform group-hover:scale-110 duration-300" />
          <span className="font-bold text-xl text-white font-serif tracking-wide drop-shadow-sm">Global Trotter</span>
        </Link>

        {/* Center navigation */}
        {signedIn ? (
          <div className="hidden md:flex items-center bg-[#1E293B]/80 backdrop-blur-md p-1 rounded-full border border-indigo-500/20">
            <PillLink href="/dashboard" active={pathname === "/dashboard"}>My Trips</PillLink>
            <PillLink href="/wishlist" active={pathname === "/wishlist"}>✨ Wishlist</PillLink>
            <PillLink href="/travel-dna" active={pathname === "/travel-dna"}>🧬 DNA</PillLink>
            <PillLink href="/passport" active={pathname === "/passport"}>🛂 Passport</PillLink>
            <PillLink href="/guardian" active={pathname === "/guardian"}>🛡️ Guardian</PillLink>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" active={pathname === "/"}>Discover</NavLink>
            <NavLink href="/trips/kyoto" active={pathname.includes("/trips")}>My Trips</NavLink>
            <NavLink href="/saved" active={pathname === "/saved"}>Saved</NavLink>
            <NavLink href="/community" active={pathname === "/community"}>Community</NavLink>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {signedIn ? (
            <div className="flex items-center gap-2">
              <IconButton icon={<Search className="w-4 h-4" />} />

              {/* Plan Trip CTA */}
              <a href="/plan">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(249,115,22,0.35)] hover:shadow-[0_0_25px_rgba(249,115,22,0.55)] transition-all cursor-pointer">
                  ✈️ Plan Trip
                </motion.span>
              </a>

              {/* ── Theme Toggle ── */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={toggleTheme}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative w-9 h-9 rounded-full bg-[#1E293B] hover:bg-[#334155] border border-indigo-500/10 flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors shadow-sm overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {dark ? (
                    <motion.span
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <Moon className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <Sun className="w-4 h-4 text-orange-400" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <IconButton icon={<Bell className="w-4 h-4" />} badge />
              <a href="/passport">
                <button className="ml-2 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-[#1E293B] hover:border-orange-500 transition-colors shadow-sm flex items-center justify-center text-white overflow-hidden cursor-pointer">
                  <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="Profile" className="w-full h-full object-cover" />
                </button>
              </a>
            </div>
          ) : (
            <>
              <button className="text-sm font-bold text-gray-300 hover:text-orange-400 transition-colors">Log In</button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all border border-orange-400/50"
              >
                Sign Up
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group text-sm font-medium">
      <span className={`transition-colors duration-300 ${active ? "text-orange-400 font-bold" : "text-gray-400 group-hover:text-white"}`}>{children}</span>
    </Link>
  );
}

function PillLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative px-5 py-1.5 text-sm font-bold rounded-full transition-colors z-10">
      {active && (
        <motion.div
          layoutId="pill-indicator"
          className="absolute inset-0 bg-[#334155] rounded-full shadow-inner z-0"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className={`relative z-10 ${active ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>{children}</span>
    </Link>
  );
}

function IconButton({ icon, badge }: { icon: React.ReactNode; badge?: boolean }) {
  return (
    <button className="relative w-9 h-9 rounded-full bg-[#1E293B] hover:bg-[#334155] border border-indigo-500/10 flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors shadow-sm">
      {icon}
      {badge && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0B0F19]" />}
    </button>
  );
}
