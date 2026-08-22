import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ThemeProvider } from "@/lib/theme/ThemeContext";

export const metadata: Metadata = {
  title: "Global Trotter",
  description: "Creating world-class itineraries for the intentional traveler.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0B0F19] font-sans antialiased text-gray-200 selection:bg-orange-500/30 selection:text-orange-200">
        <LanguageProvider>
          <ThemeProvider>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1E1B4B] via-[#0B0F19] to-[#020617]"></div>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
