import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#050810] text-gray-300 pt-16 pb-8 border-t border-indigo-900/50 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4 group">
            <Logo className="w-6 h-6 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            <span className="font-bold text-white font-serif tracking-wide">Global Trotter</span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Creating world-class itineraries for the intentional traveler.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-orange-400">COMPANY</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-400 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-orange-400">SUPPORT</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-orange-400">LEGAL</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 mt-16 text-center text-xs text-gray-600 font-medium relative z-10">
        <p>© 2026 Global Trotter Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
