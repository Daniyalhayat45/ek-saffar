const partners = [
  "PIA", "Serena Hotels", "Emirates", "Saudia", "Marriott", "Turkish Airlines", "Qatar Airways", "Pearl Continental",
];

export function Partners() {
  return (
    <section className="border-y border-parchment/10 bg-basecamp-2 py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-fog">
          Trusted partners in every itinerary
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <span key={p} className="font-display text-sm font-medium text-parchment/50">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
