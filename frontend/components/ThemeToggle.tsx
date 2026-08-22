"use client";

import { useTheme } from "@/lib/theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/15 dark:border-white/15 hover:border-compass transition-colors text-sm"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
