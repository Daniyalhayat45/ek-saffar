"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { DestinationCard } from "@/components/shared/destination-card";
import { Destination } from "@/types/travel";

const regions = ["All", "Asia", "Middle East", "Europe", "Africa", "Americas", "Oceania"] as const;
const budgets = ["All", "Budget", "Mid-range", "Luxury"] as const;
const categories = ["All", "Beach", "Mountain", "City", "Cultural", "Adventure", "Religious"] as const;

function DestinationsContent({ destinations }: { destinations: Destination[] }) {
  const searchParams = useSearchParams();
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [budget, setBudget] = useState<(typeof budgets)[number]>("All");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (region !== "All" && d.region !== region) return false;
      if (budget !== "All" && d.budgetTier !== budget) return false;
      if (category !== "All" && d.category !== category) return false;
      if (query && !`${d.name} ${d.country}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [region, budget, category, query]);

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Every place we send travelers"
        description="Filter by region, budget, or the kind of trip you're after — every destination links to the packages built around it."
      />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-parchment/10 bg-basecamp-2 p-5 sm:flex-row sm:flex-wrap sm:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations…"
              className="w-full rounded-full border border-parchment/15 bg-basecamp px-4 py-2.5 text-sm text-parchment placeholder:text-fog focus:border-orange focus:outline-none sm:w-56"
            />
            <FilterGroup label="Region" options={regions} value={region} onChange={setRegion} />
            <FilterGroup label="Budget" options={budgets} value={budget} onChange={setBudget} />
            <FilterGroup label="Type" options={categories} value={category} onChange={setCategory} />
          </div>

          <p className="mt-6 text-sm text-fog">{filtered.length} destinations found</p>

          {destinations.length === 0 ? (
            <div className="mt-16 text-center text-fog">No destinations have been added yet — check back soon.</div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((d) => (
                  <DestinationCard key={d.slug} destination={d} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="mt-16 text-center text-fog">No destinations match those filters — try widening your search.</div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-fog">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-full border border-parchment/15 bg-basecamp px-3 py-2 text-xs text-parchment focus:border-orange focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function DestinationsFilterClient({ destinations }: { destinations: Destination[] }) {
  return (
    <Suspense>
      <DestinationsContent destinations={destinations} />
    </Suspense>
  );
}
