import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Star, MapPin, Wallet, Sun } from "lucide-react";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { packages } from "@/data/packages";
import { PackageCard } from "@/components/shared/package-card";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: `${destination.name}, ${destination.country}`,
    description: destination.tagline,
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const relatedPackages = packages.filter((p) => p.destinationSlug === slug);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-28">
        <img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-basecamp via-basecamp/40 to-basecamp/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 lg:px-8">
          <div className="flex items-center gap-1.5 text-sm text-orange">
            <MapPin className="h-4 w-4" /> {destination.country} · {destination.region}
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold text-parchment sm:text-6xl">{destination.name}</h1>
          <p className="mt-3 max-w-xl text-lg text-parchment/85">{destination.tagline}</p>
        </div>
      </section>

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard icon={Star} label="Rating" value={`${destination.rating} (${destination.reviewCount})`} />
            <StatCard icon={Wallet} label="Budget tier" value={destination.budgetTier} />
            <StatCard icon={Sun} label="Best season" value={destination.bestSeason} />
            <StatCard icon={MapPin} label="From" value={`PKR ${destination.startingPricePKR.toLocaleString()}`} />
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-parchment sm:text-3xl">
              Packages to {destination.name}
            </h2>
            <Button asChild>
              <a href="/booking">Enquire About This Trip</a>
            </Button>
          </div>

          {relatedPackages.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-fog">
              We don&apos;t have a fixed package for {destination.name} yet — send us your dates and we&apos;ll build a
              custom itinerary.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-parchment/10 bg-basecamp-2 p-5">
      <Icon className="h-5 w-5 text-orange" />
      <div className="mt-3 text-xs text-fog">{label}</div>
      <div className="mt-1 font-display text-lg font-semibold text-parchment">{value}</div>
    </div>
  );
}
