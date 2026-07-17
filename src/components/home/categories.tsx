import Link from "next/link";
import { Users, Heart, Briefcase, User, Mountain, Building2 } from "lucide-react";

const categories = [
  { label: "Family Holidays", icon: Users, href: "/packages?category=Family", count: "12 packages" },
  { label: "Honeymoon", icon: Heart, href: "/honeymoon", count: "9 packages" },
  { label: "Corporate Tours", icon: Briefcase, href: "/corporate-tours", count: "6 packages" },
  { label: "Solo Travel", icon: User, href: "/packages?category=Solo", count: "7 packages" },
  { label: "Group Tours", icon: Mountain, href: "/group-tours", count: "10 packages" },
  { label: "Sacred Journeys", icon: Building2, href: "/umrah", count: "Umrah & Hajj" },
];

export function Categories() {
  return (
    <section className="bg-basecamp-2 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-orange">Travel Categories</div>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-parchment sm:text-4xl">
          Every trip, planned around who you&apos;re traveling with
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ label, icon: Icon, href, count }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-parchment/10 bg-basecamp px-4 py-8 text-center transition-colors hover:border-orange/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-basecamp">
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-sm font-semibold text-parchment">{label}</div>
              <div className="text-[11px] text-fog">{count}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
