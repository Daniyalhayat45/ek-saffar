"use client";

import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonials } from "@/data/content";
import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  return (
    <section className="bg-basecamp py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-orange">Traveler Stories</div>
          <h2 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">
            What it&apos;s like to travel with us
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".testimonial-pagination" }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="mt-14 !pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="flex h-full flex-col rounded-2xl border border-parchment/10 bg-basecamp-2 p-6">
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
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonial-pagination mt-2 flex justify-center gap-1.5" />
      </div>
    </section>
  );
}
