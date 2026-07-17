import Link from "next/link";

const gallery = [
  "gallery-hunza-sunset",
  "gallery-maldives-villa",
  "gallery-umrah-haram",
  "gallery-istanbul-street",
  "gallery-dubai-desert",
  "gallery-cappadocia-balloon",
];

const stats = [
  ["18,000+", "Travelers served"],
  ["30+", "Destinations"],
  ["12", "Years of operation"],
  ["4.8 / 5", "Average trip rating"],
];

export function GalleryStats() {
  return (
    <section className="bg-basecamp-2 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-6 border-b border-parchment/10 pb-14 sm:grid-cols-4">
          {stats.map(([stat, label]) => (
            <div key={label} className="text-center sm:text-left">
              <div className="font-display text-3xl font-semibold text-orange sm:text-4xl">{stat}</div>
              <div className="mt-1 text-xs text-fog">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-orange">From The Trips</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">Moments from the field</h2>
          </div>
          <Link href="/gallery" className="text-sm font-semibold text-parchment hover:text-orange">
            View full gallery
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {gallery.map((seed, i) => (
            <div key={seed} className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <img
                src={`https://picsum.photos/seed/${seed}/${i === 0 ? "700/700" : "400/400"}`}
                alt="Ek Safar traveler moment"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
