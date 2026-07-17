import { Star, Quote } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { testimonials } from "@/data/content";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="What travelers say"
        description={`${testimonials.length}+ reviews, averaging ${avgRating} out of 5 stars.`}
      />
      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="flex flex-col rounded-2xl border border-parchment/10 bg-basecamp-2 p-6">
                <Quote className="h-6 w-6 text-orange" />
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-orange text-orange" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-parchment/10 pt-4">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-parchment">{t.name}</div>
                    <div className="text-xs text-fog">{t.location} · {t.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
