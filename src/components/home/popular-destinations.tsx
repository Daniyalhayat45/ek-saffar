import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/shared/destination-card";

export function PopularDestinations() {
  const featured = destinations.slice(0, 8);
  return (
    <section className="bg-basecamp py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-orange">Popular Destinations</div>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-parchment sm:text-4xl">
              Where travelers are heading this season
            </h2>
          </div>
          <Link href="/destinations" className="flex items-center gap-1.5 text-sm font-semibold text-parchment hover:text-orange">
            View all destinations <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
