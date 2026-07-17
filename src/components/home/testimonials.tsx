import { getTestimonials } from "@/db/queries";
import { TestimonialsSwiper } from "@/components/home/testimonials-swiper";

export async function Testimonials() {
  const items = await getTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="bg-basecamp py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-orange">Traveler Stories</div>
          <h2 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">
            What it&apos;s like to travel with us
          </h2>
        </div>
        <TestimonialsSwiper testimonials={items} />
      </div>
    </section>
  );
}
