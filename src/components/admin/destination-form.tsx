"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Destination } from "@/types/travel";

const regions = ["Asia", "Middle East", "Europe", "Africa", "Americas", "Oceania"];
const categories = ["Beach", "Mountain", "City", "Cultural", "Adventure", "Religious"];
const budgetTiers = ["Budget", "Mid-range", "Luxury"];
const seasons = ["Winter", "Summer", "Spring", "Autumn", "Year-round"];

export type DestinationFormValues = {
  slug: string;
  name: string;
  country: string;
  region: string;
  category: string;
  budgetTier: string;
  bestSeason: string;
  image: string;
  tagline: string;
  startingPricePKR: number;
  rating: number;
  reviewCount: number;
};

export function DestinationForm({
  initial,
  action,
}: {
  initial?: Destination;
  action: (values: DestinationFormValues) => Promise<{ ok: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [values, setValues] = useState<DestinationFormValues>({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    country: initial?.country ?? "",
    region: initial?.region ?? regions[0],
    category: initial?.category ?? categories[0],
    budgetTier: initial?.budgetTier ?? budgetTiers[0],
    bestSeason: initial?.bestSeason ?? seasons[0],
    image: initial?.image ?? "",
    tagline: initial?.tagline ?? "",
    startingPricePKR: initial?.startingPricePKR ?? 0,
    rating: initial?.rating ?? 4.5,
    reviewCount: initial?.reviewCount ?? 0,
  });

  function update<K extends keyof DestinationFormValues>(key: K, value: DestinationFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await action(values);
      if (!result.ok) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      router.push("/admin/destinations");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name">
          <input required value={values.name} onChange={(e) => update("name", e.target.value)} className="input-field" />
        </Field>
        <Field label="Slug (URL, unique, no spaces)">
          <input
            required
            value={values.slug}
            onChange={(e) => update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            className="input-field"
            placeholder="e.g. hunza-valley"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Country">
          <input required value={values.country} onChange={(e) => update("country", e.target.value)} className="input-field" />
        </Field>
        <Field label="Tagline">
          <input required value={values.tagline} onChange={(e) => update("tagline", e.target.value)} className="input-field" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Region">
          <select value={values.region} onChange={(e) => update("region", e.target.value)} className="input-field">
            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Category">
          <select value={values.category} onChange={(e) => update("category", e.target.value)} className="input-field">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Budget Tier">
          <select value={values.budgetTier} onChange={(e) => update("budgetTier", e.target.value)} className="input-field">
            {budgetTiers.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Best Season">
          <select value={values.bestSeason} onChange={(e) => update("bestSeason", e.target.value)} className="input-field">
            {seasons.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Image URL">
        <input required value={values.image} onChange={(e) => update("image", e.target.value)} className="input-field" placeholder="https://..." />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Starting Price (PKR)">
          <input
            required
            type="number"
            min={0}
            value={values.startingPricePKR}
            onChange={(e) => update("startingPricePKR", Number(e.target.value))}
            className="input-field"
          />
        </Field>
        <Field label="Rating (0–5)">
          <input
            required
            type="number"
            step="0.1"
            min={0}
            max={5}
            value={values.rating}
            onChange={(e) => update("rating", Number(e.target.value))}
            className="input-field"
          />
        </Field>
        <Field label="Review Count">
          <input
            required
            type="number"
            min={0}
            value={values.reviewCount}
            onChange={(e) => update("reviewCount", Number(e.target.value))}
            className="input-field"
          />
        </Field>
      </div>

      {error && (
        <p className="rounded-lg border border-orange/30 bg-orange/10 px-4 py-3 text-sm text-orange">{error}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : initial ? "Save Changes" : "Create Destination"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/destinations")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-fog">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
