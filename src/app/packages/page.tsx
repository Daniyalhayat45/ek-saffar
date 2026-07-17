"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PackageCard } from "@/components/shared/package-card";
import { packages } from "@/data/packages";
import { cn } from "@/lib/utils";

const categories = ["All", "Family", "Honeymoon", "Group", "Corporate", "Solo", "Adventure"] as const;
const sorts = ["Popular", "Price: Low to High", "Price: High to Low", "Duration"] as const;

function PackagesContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<(typeof categories)[number]>(
    (searchParams.get("category") as (typeof categories)[number]) ?? "All"
  );
  const [sort, setSort] = useState<(typeof sorts)[number]>("Popular");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = category === "All" ? [...packages] : packages.filter((p) => p.category === category);
    if (sort === "Price: Low to High") list = list.sort((a, b) => a.pricePKR - b.pricePKR);
    if (sort === "Price: High to Low") list = list.sort((a, b) => b.pricePKR - a.pricePKR);
    if (sort === "Duration") list = list.sort((a, b) => a.durationDays - b.durationDays);
    if (sort === "Popular") list = list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [category, sort]);

  return (
    <>
      <PageHeader
        eyebrow="Tour Packages"
        title="Fixed itineraries, ready to book"
        description="Every package lists exactly what's included — accommodation, transport, meals, and guiding — with nothing added at checkout."
      />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    category === c
                      ? "border-orange bg-orange text-basecamp"
                      : "border-parchment/15 text-fog hover:border-orange/40 hover:text-parchment"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
                className="rounded-full border border-parchment/15 bg-basecamp-2 px-3 py-2 text-xs text-parchment focus:border-orange focus:outline-none"
              >
                {sorts.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="flex items-center rounded-full border border-parchment/15 p-1">
                <button
                  onClick={() => setView("grid")}
                  className={cn("rounded-full p-1.5", view === "grid" ? "bg-orange text-basecamp" : "text-fog")}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn("rounded-full p-1.5", view === "list" ? "bg-orange text-basecamp" : "text-fog")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-fog">{filtered.length} packages found</p>

          <div
            className={cn(
              "mt-6 grid gap-6",
              view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
            )}
          >
            {filtered.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function PackagesPage() {
  return (
    <Suspense>
      <PackagesContent />
    </Suspense>
  );
}
