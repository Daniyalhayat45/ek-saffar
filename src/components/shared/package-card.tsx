import Link from "next/link";
import { Star, Clock, Users } from "lucide-react";
import { TourPackage } from "@/types/travel";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const discount = pkg.originalPricePKR
    ? Math.round(100 - (pkg.pricePKR / pkg.originalPricePKR) * 100)
    : null;

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp-2 transition-colors hover:border-orange/30"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 rounded-full bg-orange px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-basecamp">
          {pkg.category}
        </div>
        {discount && (
          <div className="absolute right-3 top-3 rounded-full bg-basecamp/80 px-2.5 py-1 text-[11px] font-bold text-orange backdrop-blur">
            {discount}% off
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-xs text-fog">
          <Star className="h-3.5 w-3.5 fill-orange text-orange" />
          {pkg.rating} ({pkg.reviewCount})
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-parchment">{pkg.title}</h3>
        <div className="mt-3 flex items-center gap-4 text-xs text-fog">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {pkg.durationDays}D / {pkg.durationNights}N
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {pkg.difficulty}
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-parchment/10 pt-4">
          <div>
            {pkg.originalPricePKR && (
              <div className="text-xs text-fog line-through">
                PKR {pkg.originalPricePKR.toLocaleString()}
              </div>
            )}
            <div className="font-display text-xl font-semibold text-orange">
              PKR {pkg.pricePKR.toLocaleString()}
            </div>
          </div>
          <span className="rounded-full border border-parchment/15 px-3 py-1.5 text-xs font-semibold text-parchment transition-colors group-hover:border-orange group-hover:text-orange">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
