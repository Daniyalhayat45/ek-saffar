import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Star, Clock, TrendingUp, Check, X } from "lucide-react";
import { packages, getPackageBySlug } from "@/data/packages";
import { getDestinationBySlug } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/components/shared/package-card";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};
  return { title: pkg.title, description: pkg.highlights.join(", ") };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const destination = getDestinationBySlug(pkg.destinationSlug);
  const related = packages.filter((p) => p.slug !== pkg.slug && p.category === pkg.category).slice(0, 3);
  const discount = pkg.originalPricePKR ? Math.round(100 - (pkg.pricePKR / pkg.originalPricePKR) * 100) : null;

  return (
    <>
      <section className="bg-basecamp pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-2 sm:grid-cols-4 sm:gap-3">
            <div className="col-span-4 aspect-[16/8] overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2 sm:aspect-auto">
              <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
            </div>
            {pkg.gallery.slice(0, 4).map((img, i) => (
              <div key={i} className="hidden aspect-square overflow-hidden rounded-2xl sm:block">
                <img src={img} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-basecamp py-14">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.6fr_1fr] lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-fog">
              <span className="rounded-full bg-orange/10 px-3 py-1 font-semibold text-orange">{pkg.category}</span>
              {destination && <span>{destination.name}, {destination.country}</span>}
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-orange text-orange" /> {pkg.rating} ({pkg.reviewCount} reviews)
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold text-parchment sm:text-4xl">{pkg.title}</h1>

            <div className="mt-6 flex flex-wrap gap-6 border-y border-parchment/10 py-5 text-sm text-fog">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-orange" /> {pkg.durationDays} Days / {pkg.durationNights} Nights</span>
              <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-orange" /> {pkg.difficulty}</span>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-parchment">Highlights</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-parchment/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-parchment">Included</h3>
                <ul className="mt-3 space-y-2">
                  {pkg.included.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-fog">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-parchment">Excluded</h3>
                <ul className="mt-3 space-y-2">
                  {pkg.excluded.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-fog">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-fog" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-lg font-semibold text-parchment">Day-by-day itinerary</h3>
              <div className="mt-5 space-y-5 border-l border-parchment/10 pl-6">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="relative">
                    <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full bg-orange text-[11px] font-bold text-basecamp">
                      {day.day}
                    </div>
                    <div className="font-semibold text-parchment">{day.title}</div>
                    <p className="mt-1 text-sm text-fog">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-parchment/10 bg-basecamp-2 p-6 lg:sticky lg:top-28">
            {pkg.originalPricePKR && (
              <div className="text-sm text-fog line-through">PKR {pkg.originalPricePKR.toLocaleString()}</div>
            )}
            <div className="flex items-center gap-2">
              <div className="font-display text-3xl font-semibold text-orange">PKR {pkg.pricePKR.toLocaleString()}</div>
              {discount && <span className="rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">{discount}% off</span>}
            </div>
            <div className="text-xs text-fog">per person, land only</div>
            <Button asChild size="lg" className="mt-6 w-full">
              <a href="/booking">Book Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="mt-3 w-full">
              <a href="/contact">Ask a Question</a>
            </Button>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-basecamp-2 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-parchment">You might also like</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
