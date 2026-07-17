"use client";

import { useState } from "react";
import { PackageCard } from "@/components/shared/package-card";
import { TourPackage } from "@/types/travel";
import { cn } from "@/lib/utils";

const tabs = ["All", "Family", "Honeymoon", "Group", "Corporate", "Solo"] as const;

export function FeaturedPackagesTabs({ packages }: { packages: TourPackage[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = (tab === "All" ? packages : packages.filter((p) => p.category === tab)).slice(0, 6);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              tab === t
                ? "border-orange bg-orange text-basecamp"
                : "border-parchment/15 text-fog hover:border-orange/40 hover:text-parchment"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pkg) => (
          <PackageCard key={pkg.slug} pkg={pkg} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-fog">No packages in this category yet.</p>
        )}
      </div>
    </>
  );
}
