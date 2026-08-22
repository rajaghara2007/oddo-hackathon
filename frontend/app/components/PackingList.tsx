"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type PackingItem = { id: string; label: string; category: string; done: boolean };

const DEFAULT_ITEMS: PackingItem[] = [
  { id: "1", label: "Passport", category: "Documents", done: false },
  { id: "2", label: "Travel insurance printout", category: "Documents", done: false },
  { id: "3", label: "Phone charger", category: "Electronics", done: false },
  { id: "4", label: "Universal adapter", category: "Electronics", done: false },
  { id: "5", label: "Toothbrush", category: "Toiletries", done: false },
  { id: "6", label: "Sunscreen", category: "Toiletries", done: false },
  { id: "7", label: "Comfortable walking shoes", category: "Clothing", done: false },
];

const CATEGORIES = ["Documents", "Electronics", "Toiletries", "Clothing", "Other"];

export default function PackingList({ storageKey }: { storageKey: string }) {
  const { t } = useLanguage();
  const [items, setItems] = useState<PackingItem[]>(() => {
    if (typeof window === "undefined") return DEFAULT_ITEMS;
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  });
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);

  function persist(next: PackingItem[]) {
    setItems(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function toggle(id: string) {
    persist(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  }

  function remove(id: string) {
    persist(items.filter((i) => i.id !== id));
  }

  function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newLabel.trim()) return;
    persist([...items, { id: crypto.randomUUID(), label: newLabel.trim(), category: newCategory, done: false }]);
    setNewLabel("");
  }

  const done = items.filter((i) => i.done).length;
  const progress = items.length ? Math.round((done / items.length) * 100) : 0;

  return (
    <div>
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="label-eyebrow">{t("trip.packing")}</p>
          <span className="text-sm font-mono text-ink/60 dark:text-paper/60">{done}/{items.length}</span>
        </div>
        <div className="w-full h-2 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-route transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;
          return (
            <div key={cat}>
              <p className="text-xs font-mono uppercase tracking-wide text-ink/40 dark:text-paper/40 mb-2">{cat}</p>
              <ul className="space-y-1.5">
                {catItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 group">
                    <button
                      onClick={() => toggle(item.id)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        item.done ? "bg-route border-route text-paper" : "border-ink/30 dark:border-paper/30"
                      }`}
                      aria-label={`Mark ${item.label} as ${item.done ? "not packed" : "packed"}`}
                    >
                      {item.done && "✓"}
                    </button>
                    <span className={`text-sm flex-1 ${item.done ? "line-through text-ink/40 dark:text-paper/40" : ""}`}>
                      {item.label}
                    </span>
                    <button
                      onClick={() => remove(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-ink/30 dark:text-paper/30 hover:text-compass text-xs transition-opacity"
                      aria-label={`Remove ${item.label}`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <form onSubmit={addItem} className="mt-6 flex gap-2">
        <input
          className="input-field"
          placeholder="Add an item…"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <select
          className="input-field w-auto"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary !px-4 whitespace-nowrap">Add</button>
      </form>
    </div>
  );
}
