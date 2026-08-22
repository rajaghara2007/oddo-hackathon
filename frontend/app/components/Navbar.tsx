"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ signedIn = false }: { signedIn?: boolean }) {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-ink/10 dark:border-white/10">
      <Link href="/" className="font-display text-xl font-semibold text-ink dark:text-paper flex items-center gap-2">
        <span className="text-compass">✦</span> GlobeTrotter
      </Link>
      <div className="flex items-center gap-3 font-mono text-sm">
        {signedIn ? (
          <>
            <Link href="/dashboard" className="hover:text-compass transition-colors">{t("nav.dashboard")}</Link>
            <Link href="/trips/new" className="btn-primary !py-2 !px-4 text-sm">{t("nav.newTrip")}</Link>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-compass transition-colors">{t("nav.login")}</Link>
            <Link href="/register" className="btn-primary !py-2 !px-4 text-sm">{t("nav.getStarted")}</Link>
          </>
        )}
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
