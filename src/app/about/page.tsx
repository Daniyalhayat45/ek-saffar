import { PageHeader } from "@/components/shared/page-header";
import { Compass, Heart, ShieldCheck, Sparkles } from "lucide-react";

const timeline = [
  { year: "2013", title: "Founded in Karachi", body: "Started as a two-person desk booking domestic mountain trips for friends and family." },
  { year: "2016", title: "First international departures", body: "Launched Umrah packages, followed by Southeast Asia and the Gulf." },
  { year: "2019", title: "Corporate travel desk opens", body: "Began managing offsites and incentive trips for growing Karachi-based companies." },
  { year: "2023", title: "18,000th traveler", body: "Crossed 18,000 travelers served across family, honeymoon, and group departures." },
];

const values = [
  { icon: Compass, title: "Firsthand knowledge", body: "We don't sell a route we haven't walked ourselves." },
  { icon: ShieldCheck, title: "Honest pricing", body: "What's quoted is what's charged — no resort-day surprises." },
  { icon: Heart, title: "Care in the details", body: "Dietary needs, mobility, celebrations — noted and handled." },
  { icon: Sparkles, title: "Calm under pressure", body: "Delays and changes happen; our coordinators stay reachable." },
];

const team = [
  { name: "Ahmed Raza", role: "Founder & Managing Director", seed: "team-ahmed" },
  { name: "Sana Farooqi", role: "Head of Umrah & Hajj Operations", seed: "team-sana" },
  { name: "Bilal Shah", role: "Head of Corporate Travel", seed: "team-bilal" },
  { name: "Mahnoor Khan", role: "Lead Travel Consultant", seed: "team-mahnoor" },
  { name: "Usman Tariq", role: "Visa & Documentation Lead", seed: "team-usman" },
  { name: "Hira Baig", role: "Customer Experience Manager", seed: "team-hira" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Ek Safar"
        title="Twelve years of trips built by people who take them"
        description="Ek Safar started with a simple idea: plan trips the way we'd want them planned for our own family."
      />

      <section className="bg-basecamp py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-parchment/10 bg-basecamp-2 p-8">
            <h2 className="font-display text-2xl font-semibold text-orange">Our Mission</h2>
            <p className="mt-3 text-fog">
              To make every trip we plan feel like it was designed by someone who knows the destination personally —
              precise, honest, and without the friction of doing it yourself.
            </p>
          </div>
          <div className="rounded-3xl border border-parchment/10 bg-basecamp-2 p-8">
            <h2 className="font-display text-2xl font-semibold text-orange">Our Vision</h2>
            <p className="mt-3 text-fog">
              To be the first travel partner Pakistani families, couples, and companies think of — for the trips
              that matter most.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-basecamp-2 py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold text-parchment">Our Journey</h2>
          <div className="mt-12 space-y-10 border-l border-parchment/10 pl-8">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-orange text-xs font-bold text-basecamp">
                  {t.year.slice(2)}
                </div>
                <div className="text-xs font-semibold text-orange">{t.year}</div>
                <div className="mt-1 font-display text-lg font-semibold text-parchment">{t.title}</div>
                <p className="mt-1 text-sm text-fog">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-basecamp py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold text-parchment">What We Value</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-parchment">{title}</h3>
                <p className="mt-2 text-sm text-fog">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-basecamp-2 py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold text-parchment">Meet the Team</h2>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl">
                  <img src={`https://picsum.photos/seed/${m.seed}/300/300`} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 text-sm font-semibold text-parchment">{m.name}</div>
                <div className="text-xs text-fog">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
