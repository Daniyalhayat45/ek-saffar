import { ShieldCheck, Wallet, Headphones, Compass } from "lucide-react";

const points = [
  {
    icon: Compass,
    title: "Planned by people who've been there",
    body: "Every itinerary is built by someone who has personally traveled the route — not copied from a brochure.",
  },
  {
    icon: Wallet,
    title: "No hidden costs",
    body: "The price you see includes what's included, in writing. No surprise resort fees, no last-minute upsells.",
  },
  {
    icon: Headphones,
    title: "24/7 on-trip support",
    body: "A dedicated coordinator and WhatsApp line stay reachable for the entire length of your trip.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted documentation",
    body: "Visa, Hajj & Umrah paperwork handled by a team that knows the requirements cold, every season.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-basecamp-2 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="perforated aspect-[4/5] overflow-hidden rounded-3xl border border-parchment/10" style={{ ["--perf-left" as string]: "70%" }}>
              <img
                src="https://picsum.photos/seed/ek-safar-why-us/900/1120"
                alt="Ek Safar guide with travelers"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden w-48 rounded-2xl border border-parchment/10 bg-basecamp p-5 shadow-xl sm:block">
              <div className="font-display text-3xl font-semibold text-orange">98%</div>
              <div className="mt-1 text-xs text-fog">of travelers rebook within 2 years</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-orange">Why Choose Ek Safar</div>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold text-parchment sm:text-4xl">
              The details that separate a good trip from a great one
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {points.map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-parchment">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
