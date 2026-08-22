import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-[#0F172A] pt-16 pb-8 border-t border-gray-200 mt-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4 group">
            <Logo className="w-6 h-6 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all invert" />
            <span className="font-bold text-[#0F172A] font-serif tracking-wide">Global Trotter</span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Creating world-class itineraries for the intentional traveler.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-orange-500">COMPANY</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:text-orange-500 transition-colors font-medium">About</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors font-medium">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-orange-500">SUPPORT</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:text-orange-500 transition-colors font-medium">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors font-medium">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-orange-500">LEGAL</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:text-orange-500 transition-colors font-medium">Privacy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors font-medium">Terms</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 mt-16 text-center text-xs text-gray-400 font-medium relative z-10">
        <p>© 2026 Global Trotter Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
