"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { faqs } from "@/data/content";
import { cn } from "@/lib/utils";

const categories = ["All", "General", "Booking", "Visa", "Umrah & Hajj", "Payments"] as const;

export default function FaqsPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = faqs.filter((f) => {
    if (category !== "All" && f.category !== category) return false;
    if (query && !f.question.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader eyebrow="FAQs" title="Common questions" description="Search or filter by topic — if it's not here, our team is one message away." />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="input-field"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  category === c ? "border-orange bg-orange text-basecamp" : "border-parchment/15 text-fog hover:border-orange/40 hover:text-parchment"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <Accordion.Root type="single" collapsible className="mt-8 space-y-3">
            {filtered.map((faq, i) => (
              <Accordion.Item key={i} value={`item-${i}`} className="overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp-2">
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-parchment">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-orange transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="px-5 pb-5 text-sm leading-relaxed text-fog">{faq.answer}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          {filtered.length === 0 && <p className="mt-10 text-center text-fog">No questions match — try a different search.</p>}
        </div>
      </section>
    </>
  );
}
