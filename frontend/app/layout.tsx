import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Global Trotter",
  description: "Creating world-class itineraries for the intentional traveler.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#0F172A] selection:bg-orange-500/30 selection:text-orange-900">
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#F8FAFC] to-[#F1F5F9]"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
