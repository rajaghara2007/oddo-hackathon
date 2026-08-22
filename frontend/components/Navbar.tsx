"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
        scrolled ? "bg-[#0B0F19]/80 backdrop-blur-xl border-b border-indigo-500/20 py-3 shadow-lg shadow-indigo-900/10" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-8 h-8 transition-transform group-hover:scale-110 duration-300" />
          <span className="font-bold text-xl text-white font-serif tracking-wide drop-shadow-sm">Global Trotter</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/" active={pathname === "/"}>Discover</NavLink>
          <NavLink href="/trips/kyoto" active={pathname.includes("/trips")}>My Trips</NavLink>
          <NavLink href="/saved" active={pathname === "/saved"}>Saved</NavLink>
          <NavLink href="/community" active={pathname === "/community"}>Community</NavLink>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-sm font-bold text-gray-300 hover:text-orange-400 transition-colors">Log In</button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all border border-orange-400/50"
          >
            Sign Up
          </motion.button>
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
