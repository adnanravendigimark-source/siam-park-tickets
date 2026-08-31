"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { HomepageContent } from "@/lib/homepage";
import type { Tour } from "@/lib/data";

const inputClass =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-chichen-navy focus:outline-none focus:ring-1 focus:ring-chichen-navy";
const labelClass = "mb-1 block text-sm font-medium text-stone-700";

// Edits the same underlying homepage record as the Homepage page, but only
// exposes the "recommended tour" fields — the rest of the content (hero
// copy, etc.) is carried through untouched on save.
export default function RecommendedTourForm({
  initial,
  tours,
}: {
  initial: HomepageContent;
  tours: Tour[];
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [content, setContent] = useState<HomepageContent>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(content) !== JSON.stringify(initial), [content, initial]);

  function update<K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setContent(initial);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/recommended", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (!res.ok) {
      const msg = "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live on the tours grid (and mobile sticky bar) now.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <label className="flex items-center gap-2 text-sm font-semibold text-stone-900">
        <input
          type="checkbox"
          checked={content.showFeaturedTour}
          onChange={(e) => update("showFeaturedTour", e.target.checked)}
          className="h-4 w-4 rounded border-stone-300"
        />
        Show the Recommended Tour widget
      </label>
      <p className="-mt-3 text-xs text-stone-500">
        When on: the chosen tour is pinned first in the homepage grid with a gold "Recommended"
        treatment, and shown in a sticky booking bar on mobile.
      </p>

      <div>
        <label className={labelClass}>Which tour to feature</label>
        <select
          value={content.featuredTourId}
          onChange={(e) => update("featuredTourId", e.target.value)}
          className={inputClass}
        >
          {tours.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Badge label</label>
          <input
            value={content.featuredBadgeLabel}
            onChange={(e) => update("featuredBadgeLabel", e.target.value)}
            className={inputClass}
            placeholder="Recommended"
          />
        </div>
        <div>
          <label className={labelClass}>Urgency / offer text</label>
          <input
            value={content.featuredUrgencyText}
            onChange={(e) => update("featuredUrgencyText", e.target.value)}
            className={inputClass}
            placeholder="Best Price · Limited Availability"
          />
        </div>
      </div>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
