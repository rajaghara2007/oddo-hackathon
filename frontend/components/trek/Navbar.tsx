"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  Compass,
  Dna,
  Heart,
  ShieldCheck,
  Plane,
  Receipt,
  User,
  Settings,
  Palmtree,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Route config ────────────────────────────────────────────────────────────

const PRIMARY_NAV = [
  { label: "Explore",    href: "/destinations", icon: <Compass     className="w-3.5 h-3.5" /> },
  { label: "My Trips",  href: "/dashboard",    icon: <Plane       className="w-3.5 h-3.5" /> },
  { label: "Travel DNA", href: "/travel-dna",  icon: <Dna         className="w-3.5 h-3.5" /> },
  { label: "Wishlist",  href: "/saved",        icon: <Heart       className="w-3.5 h-3.5" /> },
  { label: "Guardian",  href: "/guardian",     icon: <ShieldCheck className="w-3.5 h-3.5" /> },
];

const MORE_NAV = [
  { label: "Expenses",       href: "/expenses", icon: <Receipt  className="w-4 h-4" /> },
  { label: "Travel Profile", href: "/passport", icon: <User     className="w-4 h-4" /> },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();
  const [dark, setDark]           = useState(true);
  const [moreOpen, setMoreOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle dark mode initializationcalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setDark(false);
      document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
    }
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.style.filter = "";
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  const isMoreActive = MORE_NAV.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-lg shadow-black/50"
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-14">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Compass className="w-6 h-6 text-orange-400 transition-transform group-hover:scale-110 duration-300" />
            <span className="font-bold text-xs tracking-[0.18em] text-white uppercase hidden sm:block">
              Tripora
            </span>
          </Link>

          {/* ── Desktop primary nav (signed-in) ── */}
          {signedIn ? (
            <div className="hidden lg:flex items-center gap-7">
              {PRIMARY_NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 group ${
                      active ? "text-orange-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-orange-400"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* More ▾ dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase transition-colors ${
                    isMoreActive || moreOpen ? "text-orange-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  More
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-3 w-48 bg-[#1E293B] border border-indigo-500/20 rounded-2xl shadow-xl shadow-black/50 py-1.5 overflow-hidden"
                    >
                      {MORE_NAV.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMoreOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                              active
                                ? "text-orange-400 bg-orange-500/10"
                                : "text-gray-300 hover:text-white hover:bg-[#334155]"
                            }`}
                          >
                            <span className={active ? "text-orange-400" : "text-gray-500"}>
                              {item.icon}
                            </span>
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          ) : (
            /* ── Desktop nav (signed-out) ── */
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="/destinations" active={pathname === "/destinations"}>Explore</NavLink>
              <NavLink href="/dashboard"    active={pathname.startsWith("/dashboard")}>My Trips</NavLink>
              <NavLink href="/saved"        active={pathname === "/saved"}>Wishlist</NavLink>
            </div>
          )}

          {/* ── Right action buttons ── */}
          <div className="flex items-center gap-2">
            {signedIn ? (
              <>
                {/* Search */}
                <IconButton 
                  icon={<Search className="w-4 h-4" />} 
                  onClick={() => router.push("/destinations")}
                />

                {/* Theme toggle */}
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

                {/* Notifications */}
                <IconButton icon={<Bell className="w-4 h-4" />} badge />

                {/* Avatar → Travel Profile (/passport) */}
                <Link href="/passport">
                  <button className="ml-1 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-[#1E293B] hover:border-orange-500 transition-colors shadow-sm flex items-center justify-center text-white overflow-hidden cursor-pointer">
                    <img
                      src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </Link>

                {/* Mobile hamburger (shown only on < lg) */}
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Toggle menu"
                  className="lg:hidden relative w-9 h-9 rounded-full bg-[#1E293B] hover:bg-[#334155] border border-indigo-500/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors ml-1"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileOpen ? (
                      <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                        <X className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span key="open"  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                        <Menu className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </>
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

      {/* ── Mobile slide-down panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-14 inset-x-0 z-40 lg:hidden bg-[#0D1220]/97 backdrop-blur-2xl border-b border-indigo-500/20 shadow-2xl shadow-black/60"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1">
              {/* Primary nav items */}
              {PRIMARY_NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <MobileNavLink key={item.href} href={item.href} active={active} icon={item.icon}>
                    {item.label}
                  </MobileNavLink>
                );
              })}

              <div className="h-px bg-indigo-500/15 my-2" />

              {/* More section */}
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 px-3 mb-1">More</p>
              {MORE_NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <MobileNavLink key={item.href} href={item.href} active={active} icon={item.icon}>
                    {item.label}
                  </MobileNavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap-outside backdrop for mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group text-sm font-medium">
      <span className={`transition-colors duration-300 ${active ? "text-orange-400 font-bold" : "text-gray-400 group-hover:text-white"}`}>
        {children}
      </span>
    </Link>
  );
}

function PillLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors z-10">
      {active && (
        <motion.div
          layoutId="pill-indicator"
          className="absolute inset-0 bg-[#334155] rounded-full shadow-inner z-0"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className={`relative z-10 ${active ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
        {children}
      </span>
    </Link>
  );
}

function MobileNavLink({
  href,
  active,
  icon,
  children,
}: {
  href: string;
  active: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
        active
          ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
          : "text-gray-300 hover:text-white hover:bg-[#1E293B]"
      }`}
    >
      {icon && <span className={active ? "text-orange-400" : "text-gray-500"}>{icon}</span>}
      {children}
    </Link>
  );
}

function IconButton({ icon, badge, onClick }: { icon: React.ReactNode; badge?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative w-9 h-9 rounded-full bg-[#1E293B] hover:bg-[#334155] border border-indigo-500/10 flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors shadow-sm"
    >
      {icon}
      {badge && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0B0F19]" />}
    </button>
  );
}
