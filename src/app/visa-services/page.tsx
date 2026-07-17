"use client";

import { useState } from "react";
import { Check, Clock, FileText } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

const countries = [
  { name: "UAE (Dubai)", processing: "3–5 working days", price: "18,500", docs: ["Passport (6 months validity)", "Passport-size photo", "Bank statement (last 3 months)", "Confirmed return ticket"] },
  { name: "Schengen (Europe)", processing: "10–15 working days", price: "32,000", docs: ["Passport (6 months validity)", "Travel insurance", "Hotel booking confirmation", "Bank statement (last 6 months)", "Employment letter"] },
  { name: "United Kingdom", processing: "15–20 working days", price: "45,000", docs: ["Passport (6 months validity)", "Bank statement (last 6 months)", "Employment/business proof", "Accommodation details"] },
  { name: "United States", processing: "Varies by embassy slot", price: "38,000", docs: ["Passport (6 months validity)", "DS-160 confirmation", "Interview appointment", "Financial documents"] },
  { name: "Saudi Arabia (Visit)", processing: "3–7 working days", price: "22,000", docs: ["Passport (6 months validity)", "Passport photo", "Bank statement"] },
  { name: "Malaysia", processing: "3–5 working days", price: "9,500", docs: ["Passport (6 months validity)", "Passport photo", "Confirmed return ticket"] },
];

const faqs = [
  { q: "Does the visa fee include the embassy fee?", a: "No — our fee covers documentation, appointment booking, and processing support. Embassy/consulate fees are separate and paid directly or through us at cost." },
  { q: "What happens if my visa is rejected?", a: "We review documentation before submission to minimize this risk. In case of rejection, our service fee covers one resubmission review at no extra documentation charge." },
  { q: "Can you expedite processing?", a: "Some countries offer premium/expedited lanes for an additional embassy fee. We'll flag this option if it's available for your destination." },
];

export default function VisaServicesPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Visa Services"
        title="Documentation, handled"
        description="Country-wise visa support with clear requirements, processing times, and pricing — no guesswork."
      />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {countries.map((c, i) => (
              <div key={c.name} className="rounded-2xl border border-parchment/10 bg-basecamp-2">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div>
                    <div className="font-display text-lg font-semibold text-parchment">{c.name}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-fog">
                      <Clock className="h-3.5 w-3.5 text-orange" /> {c.processing}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-semibold text-orange">PKR {c.price}</div>
                    <ChevronDown className={`ml-auto mt-1 h-4 w-4 text-fog transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
                  </div>
                </button>
                {openIdx === i && (
                  <div className="border-t border-parchment/10 p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-fog">
                      <FileText className="h-3.5 w-3.5" /> Required Documents
                    </div>
                    <ul className="mt-3 space-y-2">
                      {c.docs.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-parchment/90">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {d}
                        </li>
                      ))}
                    </ul>
                    <Button asChild size="sm" className="mt-4">
                      <a href="/booking">Start This Application</a>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-parchment">Visa FAQs</h2>
            <Accordion.Root type="single" collapsible className="mt-6 space-y-3">
              {faqs.map((f, i) => (
                <Accordion.Item key={i} value={`v-${i}`} className="overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp-2">
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-parchment">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-orange transition-transform group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-5 pb-5 text-sm text-fog">{f.a}</Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>

          <div className="mt-16 rounded-3xl border border-parchment/10 bg-basecamp-2 p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-parchment">Not sure which visa you need?</h3>
            <p className="mt-2 text-sm text-fog">Send us your destination and travel dates — we&apos;ll confirm requirements within a few hours.</p>
            <Button asChild className="mt-5">
              <a href="/contact">Ask a Question</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
