import { Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Standard Hajj",
    price: "850,000",
    features: ["Government-approved Hajj quota", "Shared accommodation in Aziziyah", "Group Muallim & guide", "All Hajj rituals coordinated", "Return flights included"],
  },
  {
    name: "Premium Hajj",
    price: "1,350,000",
    highlighted: true,
    features: ["Closer accommodation to Haramain", "Smaller group sizes (max 25)", "Dedicated Muallim per group", "Daily meals included", "Priority Mina/Arafat camps"],
  },
  {
    name: "VIP Hajj",
    price: "2,200,000",
    features: ["5-star hotels, minimal walking distance", "Private transport throughout", "Personal guide & medical support on-call", "Premium Mina camps with AC", "All meals, all transfers included"],
  },
];

export const metadata = { title: "Hajj Packages" };

export default function HajjPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sacred Journeys"
        title="Hajj Packages"
        description="Fully-managed Hajj departures, coordinated with government quota allocations and licensed Muallimeen."
      />
      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className={`flex flex-col rounded-3xl border p-7 ${tier.highlighted ? "border-orange bg-basecamp-2 shadow-[0_20px_50px_-20px_rgba(244,131,30,0.4)]" : "border-parchment/10 bg-basecamp-2"}`}>
                {tier.highlighted && <span className="mb-3 w-fit rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase text-basecamp">Most Booked</span>}
                <h3 className="font-display text-xl font-semibold text-parchment">{tier.name}</h3>
                <div className="mt-4 font-display text-3xl font-semibold text-orange">PKR {tier.price}</div>
                <div className="text-xs text-fog">per person, land package</div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-parchment/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full" variant={tier.highlighted ? "primary" : "outline"}>
                  <a href="/booking">Register Interest</a>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-orange/25 bg-orange/5 p-6 text-sm text-parchment/90">
            Hajj seats are allocated by government quota and typically confirmed 4–6 months ahead of the season.
            Registering early secures priority on our waiting list — no payment is required to register interest.
          </div>
        </div>
      </section>
    </>
  );
}
