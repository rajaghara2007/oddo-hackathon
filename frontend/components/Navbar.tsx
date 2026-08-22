"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell, User, Search, Moon } from "lucide-react";

export default function Navbar({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B0F19]/90 backdrop-blur-xl border-b border-indigo-500/20 py-3 shadow-lg shadow-black/50" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-8 h-8 transition-transform group-hover:scale-110 duration-300" />
          {!signedIn && <span className="font-bold text-xl text-white font-serif tracking-wide drop-shadow-sm">Global Trotter</span>}
        </Link>
        
        {/* Center: Navigation Pills (Trek Style) */}
        {signedIn ? (
          <div className="hidden md:flex items-center bg-[#1E293B]/80 backdrop-blur-md p-1 rounded-full border border-indigo-500/20">
            <PillLink href="/dashboard" active={pathname === "/dashboard"}>My Trips</PillLink>
            <PillLink href="/dashboard/vacay" active={pathname === "/dashboard/vacay"}>Vacay</PillLink>
            <PillLink href="/dashboard/atlas" active={pathname === "/dashboard/atlas"}>Atlas</PillLink>
            <PillLink href="/dashboard/journey" active={pathname === "/dashboard/journey"}>Journey</PillLink>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" active={pathname === "/"}>Discover</NavLink>
            <NavLink href="/trips/kyoto" active={pathname.includes("/trips")}>My Trips</NavLink>
            <NavLink href="/saved" active={pathname === "/saved"}>Saved</NavLink>
            <NavLink href="/community" active={pathname === "/community"}>Community</NavLink>
          </div>
        )}
        
        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {signedIn ? (
            <div className="flex items-center gap-2">
              <IconButton icon={<Search className="w-4 h-4" />} />
              <IconButton icon={<Moon className="w-4 h-4" />} />
              <IconButton icon={<Bell className="w-4 h-4" />} badge />
              <button className="ml-2 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-[#1E293B] shadow-sm flex items-center justify-center text-white overflow-hidden">
                 <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="Profile" className="w-full h-full object-cover" />
              </button>
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
      <span className={`transition-colors duration-300 ${active ? "text-orange-400 font-bold" : "text-gray-400 group-hover:text-white"}`}>
        {children}
      </span>
      {active && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"
        />
      )}
    </Link>
  );
}

function PillLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative px-5 py-1.5 text-sm font-bold rounded-full transition-colors z-10">
      <span className={`relative z-10 ${active ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
        {children}
      </span>
      {active && (
        <motion.div 
          layoutId="pill-indicator"
          className="absolute inset-0 bg-[#334155] rounded-full shadow-inner z-0"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}

function IconButton({ icon, badge }: { icon: React.ReactNode, badge?: boolean }) {
  return (
    <button className="relative w-9 h-9 rounded-full bg-[#1E293B] hover:bg-[#334155] border border-indigo-500/10 flex items-center justify-center text-gray-300 transition-colors shadow-sm">
      {icon}
      {badge && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0B0F19]" />}
    </button>
  );
}
