import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/trek/Navbar";
import Footer from "@/components/trek/Footer";

export const metadata: Metadata = {
  title: "Global Trotter",
  description: "Curate your extraordinary journey.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0B0F19] font-sans antialiased text-gray-200 selection:bg-orange-500/30 selection:text-orange-200">
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1E1B4B] via-[#0B0F19] to-[#020617]" />
        <Navbar signedIn />
        {children}
        <Footer />
      </body>
    </html>
  );
}
