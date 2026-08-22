"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, DEFAULT_LANGUAGE, LangCode } from "./translations";

type LanguageContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "globetrotter_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANGUAGE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (stored && translations[stored]) {
      setLangState(stored);
    }
    setHydrated(true);
  }, []);

  function setLang(next: LangCode) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }

  function t(key: string): string {
    return translations[lang]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
  }

  // Avoid a flash of the wrong language on first paint by rendering
  // default-language strings until localStorage has been read.
  if (!hydrated) {
    return (
      <LanguageContext.Provider value={{ lang: DEFAULT_LANGUAGE, setLang, t: (k) => translations[DEFAULT_LANGUAGE][k] ?? k }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
