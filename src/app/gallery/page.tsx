"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";

const categories = ["All", "Mountains", "Beaches", "Umrah", "Cities", "Corporate"] as const;

const images = Array.from({ length: 24 }).map((_, i) => ({
  seed: `gallery-${i}`,
  category: categories[1 + (i % (categories.length - 1))],
}));

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "All" ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments from the field" description="A running album from trips we've planned — mountains, coastlines, and everything between." />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === c ? "border-orange bg-orange text-basecamp" : "border-parchment/15 text-fog hover:border-orange/40 hover:text-parchment"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((img, i) => (
              <button
                key={img.seed}
                onClick={() => setLightboxIndex(i)}
                className="aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={`https://picsum.photos/seed/${img.seed}/500/500`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-basecamp/95 p-6">
          <button onClick={() => setLightboxIndex(null)} className="absolute right-6 top-6 text-parchment" aria-label="Close">
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={() => setLightboxIndex((i) => (i! > 0 ? i! - 1 : filtered.length - 1))}
            className="absolute left-4 text-parchment sm:left-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={`https://picsum.photos/seed/${filtered[lightboxIndex].seed}/1200/1200`}
            alt=""
            className="max-h-[80vh] max-w-full rounded-2xl object-contain"
          />
          <button
            onClick={() => setLightboxIndex((i) => (i! < filtered.length - 1 ? i! + 1 : 0))}
            className="absolute right-4 text-parchment sm:right-8"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
}
