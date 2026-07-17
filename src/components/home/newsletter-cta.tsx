import { Button } from "@/components/ui/button";

export function NewsletterCta() {
  return (
    <section className="relative overflow-hidden bg-basecamp py-24">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <div className="perforated relative overflow-hidden rounded-3xl border border-orange/20 bg-gradient-to-br from-orange-deep/25 via-basecamp-2 to-basecamp-2 px-8 py-16" style={{ ["--perf-left" as string]: "50%" }}>
          <h2 className="font-display text-3xl font-semibold text-parchment sm:text-4xl">
            Ready for your next trip?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-fog">
            Tell us where and when — we&apos;ll send a tailored itinerary within 24 hours, no obligation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/booking">Start Planning</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Talk to a Consultant</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
