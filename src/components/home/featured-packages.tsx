import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPackages } from "@/db/queries";
import { FeaturedPackagesTabs } from "@/components/home/featured-packages-tabs";

export async function FeaturedPackages() {
  const all = await getPackages();
  if (all.length === 0) return null;

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

        <FeaturedPackagesTabs packages={all} />
      </div>
    </section>
  );
}
