import { Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    name: "Economy",
    nights: "10 Nights",
    price: "140,000",
    features: ["3-star hotels, 800m from Haram", "Shared quad rooms", "Group visa processing", "Return economy flights", "Ziyarat tour included"],
  },
  {
    name: "Premium",
    nights: "14 Nights",
    price: "220,000",
    highlighted: true,
    features: ["4-star hotels, walking distance", "Double/triple rooms", "Dedicated Muallim", "Return flights with 1 stop max", "Ziyarat + city tour", "Daily breakfast"],
  },
  {
    name: "Luxury",
    nights: "14 Nights",
    price: "385,000",
    features: ["5-star hotels facing Haram", "Private double rooms", "Personal Muallim & guide", "Direct return flights", "All meals included", "Airport VIP assistance"],
  },
];

const familyTiers = [
  { name: "Family Package", price: "195,000", body: "Priced per adult; children under 12 travel at 60% of the adult rate. Connecting rooms arranged where available." },
];

export const metadata = { title: "Umrah Packages" };

export default function UmrahPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sacred Journeys"
        title="Umrah Packages"
        description="Economy to luxury departures, year-round — hotels, visa, transport and a Muallim, all arranged before you leave."
      />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-3xl border p-7 ${tier.highlighted ? "border-orange bg-basecamp-2 shadow-[0_20px_50px_-20px_rgba(244,131,30,0.4)]" : "border-parchment/10 bg-basecamp-2"}`}
              >
                {tier.highlighted && (
                  <span className="mb-3 w-fit rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase text-basecamp">Most Booked</span>
                )}
                <h3 className="font-display text-xl font-semibold text-parchment">{tier.name}</h3>
                <div className="text-sm text-fog">{tier.nights}</div>
                <div className="mt-4 font-display text-3xl font-semibold text-orange">PKR {tier.price}</div>
                <div className="text-xs text-fog">per person</div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-parchment/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full" variant={tier.highlighted ? "primary" : "outline"}>
                  <Link href="/booking">Book This Package</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-parchment/10 bg-basecamp-2 p-8">
            <h3 className="font-display text-xl font-semibold text-parchment">Family Umrah Packages</h3>
            <p className="mt-2 text-sm text-fog">{familyTiers[0].body}</p>
            <div className="mt-4 font-display text-2xl font-semibold text-orange">From PKR {familyTiers[0].price}</div>
            <Button asChild className="mt-6">
              <Link href="/booking">Plan a Family Umrah</Link>
            </Button>
          </div>

          <div className="mt-14">
            <h3 className="font-display text-xl font-semibold text-parchment">Umrah Guidelines</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "A valid Umrah visa and passport with 6+ months validity are required for all travelers.",
                "Ihram guidance and a printed rites checklist are provided before departure.",
                "Vaccination requirements are shared 6 weeks ahead of travel and confirmed per current Saudi MOH rules.",
                "A 24/7 WhatsApp support line stays open for the full duration of your trip.",
              ].map((g) => (
                <div key={g} className="flex items-start gap-2.5 rounded-2xl border border-parchment/10 bg-basecamp-2 p-4 text-sm text-fog">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {g}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
