"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/types/travel";

export function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <Accordion.Root type="single" collapsible className="mt-10 space-y-3">
      {faqs.map((faq) => (
        <Accordion.Item
          key={faq.id}
          value={`item-${faq.id}`}
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
  );
}
