import { MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

const openings = [
  { title: "Travel Consultant", type: "Full-time", location: "Karachi", dept: "Sales" },
  { title: "Umrah & Hajj Operations Executive", type: "Full-time", location: "Karachi", dept: "Operations" },
  { title: "Visa Documentation Specialist", type: "Full-time", location: "Karachi", dept: "Operations" },
  { title: "Corporate Travel Manager", type: "Full-time", location: "Karachi", dept: "Corporate" },
  { title: "Digital Marketing Executive", type: "Full-time", location: "Karachi / Remote", dept: "Marketing" },
];

export const metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Build trips people remember" description="We hire people who've traveled the routes they sell, or want to." />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {["Health coverage", "Annual travel allowance", "Performance bonuses"].map((perk) => (
              <div key={perk} className="rounded-2xl border border-parchment/10 bg-basecamp-2 p-5 text-center text-sm font-medium text-parchment">
                {perk}
              </div>
            ))}
          </div>

          <h2 className="mt-14 font-display text-2xl font-semibold text-parchment">Open Positions</h2>
          <div className="mt-6 space-y-3">
            {openings.map((job) => (
              <div key={job.title} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-parchment/10 bg-basecamp-2 p-5">
                <div>
                  <div className="font-display text-base font-semibold text-parchment">{job.title}</div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-fog">
                    <span className="rounded-full bg-orange/10 px-2.5 py-1 text-orange">{job.dept}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                  </div>
                </div>
                <Button asChild size="sm">
                  <a href="/contact">Apply Now</a>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-parchment/10 bg-basecamp-2 p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-parchment">Don&apos;t see the right role?</h3>
            <p className="mt-2 text-sm text-fog">Send your CV anyway — we keep good applications on file for future openings.</p>
            <Button asChild className="mt-5">
              <a href="/contact">Send Your CV</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
