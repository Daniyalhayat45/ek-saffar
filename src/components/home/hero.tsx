"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Destination } from "@/types/travel";
import Link from "next/link";

export function Hero({
  destinations = [],
}: {
  destinations?: Destination[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query ? `/destinations?q=${encodeURIComponent(query)}` : "/destinations");
  }

  return (
    <section className="contour-field relative flex min-h-[92vh] items-center overflow-hidden bg-basecamp pt-28 pb-20">
      <div className="pointer-events-none absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-orange/20 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-orange-deep/15 blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange"
          >
            Custom itineraries since day one
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-[42px] font-semibold leading-[1.05] text-parchment sm:text-6xl lg:text-[68px]"
          >
            A journey of{" "}
            <span className="relative italic text-orange">
              thousand
            </span>{" "}
            destinations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-fog"
          >
            Ek Safar plans family holidays, honeymoons, Hajj &amp; Umrah, and corporate
            offsites — with the detail of people who&apos;ve made every one of these trips
            themselves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/packages">Explore Packages</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/booking">Plan My Trip</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-parchment/10 pt-8"
          >
            {[
              ["12+", "Years planning trips"],
              ["30+", "Destinations"],
              ["4.8★", "Average rating"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="font-display text-2xl font-semibold text-parchment">{stat}</div>
                <div className="mt-1 text-xs text-fog">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative hidden lg:block"
        >
          <div className="perforated relative aspect-[4/5] overflow-hidden rounded-3xl border border-parchment/10" style={{ ["--perf-left" as string]: "78%" }}>
            <img
              src="https://picsum.photos/seed/ek-safar-hero-main/900/1120"
              alt="Mountain valley destination"
              className="h-full w-full object-cover"
            />
            <div className="punch top-1/2 -translate-y-1/2" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-basecamp/90 to-transparent p-6 pt-16">
              <div className="text-xs uppercase tracking-widest text-orange">Featured</div>
              <div className="mt-1 font-display text-lg font-semibold text-parchment">Hunza Valley, Pakistan</div>
            </div>
          </div>
          <div className="absolute -left-8 top-10 w-44 animate-float rounded-2xl border border-parchment/10 bg-basecamp-2/90 p-4 shadow-xl backdrop-blur">
            <div className="text-xs text-fog">Starting from</div>
            <div className="font-display text-xl font-semibold text-orange">PKR 58,000</div>
            <div className="text-xs text-fog">per person</div>
          </div>
        </motion.div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        onSubmit={handleSearch}
        className="relative mx-auto mt-16 flex w-full max-w-4xl flex-col gap-3 rounded-3xl border border-parchment/10 bg-basecamp-2/80 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full px-5 lg:px-8"
      >
        <div className="flex flex-1 items-center gap-2 px-3 py-2">
          <MapPin className="h-4 w-4 shrink-0 text-orange" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            list="destination-suggestions"
            placeholder="Where to? Try Hunza, Maldives, Istanbul…"
            className="w-full bg-transparent text-sm text-parchment placeholder:text-fog focus:outline-none"
          />
          <datalist id="destination-suggestions">
            {destinations.map((d) => (
              <option key={d.slug} value={d.name} />
            ))}
          </datalist>
        </div>
        <div className="hidden h-6 w-px bg-parchment/10 sm:block" />
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-fog">
          <Calendar className="h-4 w-4 shrink-0 text-orange" />
          Any month
        </div>
        <div className="hidden h-6 w-px bg-parchment/10 sm:block" />
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-fog">
          <Users className="h-4 w-4 shrink-0 text-orange" />
          2 Travelers
        </div>
        <Button type="submit" size="default" className="shrink-0">
          <Search className="h-4 w-4" /> Search Trips
        </Button>
      </motion.form>
    </section>
  );
}
