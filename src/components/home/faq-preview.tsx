"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/content";

export function FaqPreview() {
  const preview = faqs.slice(0, 6);
  return (
    <section className="bg-basecamp-2 py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-orange">FAQs</div>
          <h2 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">Common questions</h2>
        </div>

        <Accordion.Root type="single" collapsible className="mt-10 space-y-3">
          {preview.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp"
            >
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-parchment">
                {faq.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-orange transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="px-5 pb-5 text-sm leading-relaxed text-fog">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
