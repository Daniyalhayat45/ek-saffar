import Link from "next/link";
import { Star } from "lucide-react";
import { Destination } from "@/types/travel";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp-2"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-basecamp via-basecamp/10 to-transparent" />
      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-basecamp/70 px-2.5 py-1 text-xs font-semibold text-parchment backdrop-blur">
        <Star className="h-3 w-3 fill-orange text-orange" />
        {destination.rating}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="text-[11px] uppercase tracking-widest text-orange">{destination.country}</div>
        <div className="mt-1 font-display text-lg font-semibold text-parchment">{destination.name}</div>
        <div className="mt-1 text-xs text-fog line-clamp-1">{destination.tagline}</div>
        <div className="mt-2 text-sm font-semibold text-parchment">
          From PKR {destination.startingPricePKR.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
