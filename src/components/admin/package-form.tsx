"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { TourPackage } from "@/types/travel";

const categories = ["Family", "Honeymoon", "Group", "Corporate", "Solo", "Adventure"];
const difficulties = ["Easy", "Moderate", "Challenging"];

export type PackageFormValues = {
  slug: string;
  title: string;
  destinationSlug: string;
  category: string;
  durationDays: number;
  durationNights: number;
  pricePKR: number;
  originalPricePKR: number | null;
  difficulty: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: { day: number; title: string; description: string }[];
};

function linesToArray(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function itineraryToText(itinerary: PackageFormValues["itinerary"]): string {
  return itinerary.map((it) => `${it.title} | ${it.description}`).join("\n");
}

function textToItinerary(text: string): PackageFormValues["itinerary"] {
  return linesToArray(text).map((line, i) => {
    const [title, ...rest] = line.split("|");
    return { day: i + 1, title: title.trim(), description: rest.join("|").trim() };
  });
}

export function PackageForm({
  initial,
  destinationOptions,
  action,
}: {
  initial?: TourPackage;
  destinationOptions: { slug: string; name: string }[];
  action: (values: PackageFormValues) => Promise<{ ok: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [values, setValues] = useState<PackageFormValues>({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    destinationSlug: initial?.destinationSlug ?? destinationOptions[0]?.slug ?? "",
    category: initial?.category ?? categories[0],
    durationDays: initial?.durationDays ?? 3,
    durationNights: initial?.durationNights ?? 2,
    pricePKR: initial?.pricePKR ?? 0,
    originalPricePKR: initial?.originalPricePKR ?? null,
    difficulty: initial?.difficulty ?? difficulties[0],
    image: initial?.image ?? "",
    gallery: initial?.gallery ?? [],
    rating: initial?.rating ?? 4.5,
    reviewCount: initial?.reviewCount ?? 0,
    highlights: initial?.highlights ?? [],
    included: initial?.included ?? [],
    excluded: initial?.excluded ?? [],
    itinerary: initial?.itinerary ?? [],
  });

  function update<K extends keyof PackageFormValues>(key: K, value: PackageFormValues[K]) {
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
      router.push("/admin/packages");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Title">
          <input required value={values.title} onChange={(e) => update("title", e.target.value)} className="input-field" />
        </Field>
        <Field label="Slug (URL, unique, no spaces)">
          <input
            required
            value={values.slug}
            onChange={(e) => update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            className="input-field"
            placeholder="e.g. hunza-family-explorer"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Destination">
          <select value={values.destinationSlug} onChange={(e) => update("destinationSlug", e.target.value)} className="input-field">
            {destinationOptions.length === 0 && <option value="">Add a destination first</option>}
            {destinationOptions.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="Category">
          <select value={values.category} onChange={(e) => update("category", e.target.value)} className="input-field">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Duration (days)">
          <input required type="number" min={1} value={values.durationDays} onChange={(e) => update("durationDays", Number(e.target.value))} className="input-field" />
        </Field>
        <Field label="Duration (nights)">
          <input required type="number" min={0} value={values.durationNights} onChange={(e) => update("durationNights", Number(e.target.value))} className="input-field" />
        </Field>
        <Field label="Price (PKR)">
          <input required type="number" min={0} value={values.pricePKR} onChange={(e) => update("pricePKR", Number(e.target.value))} className="input-field" />
        </Field>
        <Field label="Original Price (optional)">
          <input
            type="number"
            min={0}
            value={values.originalPricePKR ?? ""}
            onChange={(e) => update("originalPricePKR", e.target.value ? Number(e.target.value) : null)}
            className="input-field"
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Difficulty">
          <select value={values.difficulty} onChange={(e) => update("difficulty", e.target.value)} className="input-field">
            {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Rating (0–5)">
          <input required type="number" step="0.1" min={0} max={5} value={values.rating} onChange={(e) => update("rating", Number(e.target.value))} className="input-field" />
        </Field>
        <Field label="Review Count">
          <input required type="number" min={0} value={values.reviewCount} onChange={(e) => update("reviewCount", Number(e.target.value))} className="input-field" />
        </Field>
      </div>

      <Field label="Cover Image URL">
        <input required value={values.image} onChange={(e) => update("image", e.target.value)} className="input-field" placeholder="https://..." />
      </Field>

      <Field label="Gallery Image URLs (one per line)">
        <textarea
          rows={3}
          value={values.gallery.join("\n")}
          onChange={(e) => update("gallery", linesToArray(e.target.value))}
          className="input-field resize-none"
        />
      </Field>

      <Field label="Highlights (one per line)">
        <textarea rows={4} value={values.highlights.join("\n")} onChange={(e) => update("highlights", linesToArray(e.target.value))} className="input-field resize-none" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Included (one per line)">
          <textarea rows={4} value={values.included.join("\n")} onChange={(e) => update("included", linesToArray(e.target.value))} className="input-field resize-none" />
        </Field>
        <Field label="Excluded (one per line)">
          <textarea rows={4} value={values.excluded.join("\n")} onChange={(e) => update("excluded", linesToArray(e.target.value))} className="input-field resize-none" />
        </Field>
      </div>

      <Field label="Itinerary — one day per line, format: Title | Description">
        <textarea
          rows={6}
          value={itineraryToText(values.itinerary)}
          onChange={(e) => update("itinerary", textToItinerary(e.target.value))}
          className="input-field resize-none"
          placeholder="Islamabad → Naran | Scenic drive along the Karakoram Highway"
        />
      </Field>

      {error && (
        <p className="rounded-lg border border-orange/30 bg-orange/10 px-4 py-3 text-sm text-orange">{error}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : initial ? "Save Changes" : "Create Package"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/packages")}>
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
