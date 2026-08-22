"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type JournalEntry = { id: string; date: string; mood: string; text: string };

const MOODS = ["😄", "😌", "🥾", "🍜", "🥱", "🌧️"];

export default function Journal({ storageKey }: { storageKey: string }) {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = useState({ date: new Date().toISOString().slice(0, 10), mood: MOODS[0], text: "" });

  function persist(next: JournalEntry[]) {
    setEntries(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.text.trim()) return;
    const next = [{ id: crypto.randomUUID(), ...draft }, ...entries].sort((a, b) => (a.date < b.date ? 1 : -1));
    persist(next);
    setDraft({ ...draft, text: "" });
  }

  function remove(id: string) {
    persist(entries.filter((e) => e.id !== id));
  }

  return (
    <div>
      <form onSubmit={addEntry} className="card mb-6 space-y-3">
        <p className="label-eyebrow">{t("trip.journal")}</p>
        <div className="flex gap-3">
          <input
            type="date"
            className="input-field w-auto"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
          <select
            className="input-field w-auto"
            value={draft.mood}
            onChange={(e) => setDraft({ ...draft, mood: e.target.value })}
          >
            {MOODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <textarea
          className="input-field"
          rows={3}
          placeholder="What happened today?"
          value={draft.text}
          onChange={(e) => setDraft({ ...draft, text: e.target.value })}
        />
        <button type="submit" className="btn-primary !py-2">Save entry</button>
      </form>

      {entries.length === 0 ? (
        <p className="text-sm text-ink/50 dark:text-paper/50 text-center py-8">No entries yet — write about today.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="card group relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{entry.mood}</span>
                <span className="text-xs font-mono text-ink/50 dark:text-paper/50">
                  {new Date(entry.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                </span>
                <button
                  onClick={() => remove(entry.id)}
                  className="ml-auto opacity-0 group-hover:opacity-100 text-ink/30 dark:text-paper/30 hover:text-compass text-xs transition-opacity"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-ink/80 dark:text-paper/80 whitespace-pre-wrap">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
