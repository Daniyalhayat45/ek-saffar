"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { packages } from "@/data/packages";
import { PackageCard } from "@/components/shared/package-card";
import { cn } from "@/lib/utils";

const tabs = ["All", "Family", "Honeymoon", "Group", "Corporate", "Solo"] as const;

export function FeaturedPackages() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = (tab === "All" ? packages : packages.filter((p) => p.category === tab)).slice(0, 6);

  return (
    <section className="bg-basecamp py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-orange">Featured Packages</div>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-parchment sm:text-4xl">
              Itineraries our travelers book most
            </h2>
          </div>
          <Link href="/packages" className="flex items-center gap-1.5 text-sm font-semibold text-parchment hover:text-orange">
            View all packages <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

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
        </div>
      </div>
    </section>
  );
}
