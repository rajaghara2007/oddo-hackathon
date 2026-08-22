import Link from "next/link";
import { Globe, ExternalLink, Heart, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-indigo-500/10 bg-[#080C14] text-gray-400 py-12 mt-12">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3 max-w-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-orange-400" />
            <span className="font-bold text-lg text-white font-serif">Global Trotter</span>
          </div>
          <p className="text-sm leading-relaxed">
            Curate extraordinary journeys with AI-driven itineraries and world-class planning tools.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold text-xs tracking-widest uppercase">Product</p>
            <Link href="/dashboard" className="hover:text-orange-400 transition-colors">Dashboard</Link>
            <Link href="/trips" className="hover:text-orange-400 transition-colors">My Trips</Link>
            <Link href="/saved" className="hover:text-orange-400 transition-colors">Saved</Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold text-xs tracking-widest uppercase">Company</p>
            <Link href="/about" className="hover:text-orange-400 transition-colors">About</Link>
            <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
            <Link href="/careers" className="hover:text-orange-400 transition-colors">Careers</Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold text-xs tracking-widest uppercase">Legal</p>
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms</Link>
          </div>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3">
          <p className="text-white font-bold text-xs tracking-widest uppercase">Follow Us</p>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1E293B] border border-indigo-500/20 flex items-center justify-center hover:text-orange-400 hover:border-orange-500/40 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1E293B] border border-indigo-500/20 flex items-center justify-center hover:text-orange-400 hover:border-orange-500/40 transition-colors">
              <Heart className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1E293B] border border-indigo-500/20 flex items-center justify-center hover:text-orange-400 hover:border-orange-500/40 transition-colors">
              <Play className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-10 pt-6 border-t border-indigo-500/10 text-xs text-gray-500 flex flex-col md:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Global Trotter. All rights reserved.</p>
        <p>Built for the modern adventurer. ✈️</p>
      </div>
    </footer>
  );
}
