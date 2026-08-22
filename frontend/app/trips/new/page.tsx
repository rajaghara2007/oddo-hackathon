"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function NewTripPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "", budgetTotal: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        budgetTotal: form.budgetTotal ? Number(form.budgetTotal) : undefined,
      }),
    });
    setLoading(false);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }
    router.push(`/trips/${data.trip.id}`);
  }

  return (
    <>
      <Navbar signedIn />
      <main className="max-w-lg mx-auto px-8 py-16">
        <p className="label-eyebrow mb-2">New trip</p>
        <h1 className="text-3xl font-semibold mb-8">Where to?</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Trip title</label>
            <input className="input-field" required placeholder="Euro Summer 2026" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea className="input-field" rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Start date</label>
              <input type="date" className="input-field" required value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">End date</label>
              <input type="date" className="input-field" required value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Budget (optional)</label>
            <input type="number" min={0} step="0.01" className="input-field" placeholder="2000" value={form.budgetTotal}
              onChange={(e) => setForm({ ...form, budgetTotal: e.target.value })} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Creating…" : "Create trip"}
          </button>
        </form>
      </main>
    </>
  );
}
