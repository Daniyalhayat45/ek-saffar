"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";

const schema = z.object({
  destination: z.string().min(1, "Choose a destination"),
  travelDate: z.string().min(1, "Pick a travel date"),
  adults: z.coerce.number().min(1, "At least 1 adult"),
  children: z.coerce.number().min(0),
  rooms: z.coerce.number().min(1, "At least 1 room"),
  budget: z.string().min(1, "Select a budget range"),
  passportReady: z.string().min(1, "Please select an option"),
  requirements: z.string().optional(),
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
});

type FormValues = z.input<typeof schema>;

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { adults: 2, children: 0, rooms: 1 },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-basecamp pt-24">
        <div className="mx-auto max-w-md px-5 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-orange" />
          <h1 className="mt-6 font-display text-3xl font-semibold text-parchment">Inquiry received</h1>
          <p className="mt-3 text-fog">
            Thanks for reaching out. A travel consultant will contact you within 24 hours with a tailored itinerary
            and pricing.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Tell us about your trip"
        description="This is an inquiry, not a payment — we'll follow up with a quote before anything is confirmed."
      />

      <section className="bg-basecamp py-16">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl px-5 lg:px-8">
          <div className="rounded-3xl border border-parchment/10 bg-basecamp-2 p-6 sm:p-8">
            <Field label="Destination" error={errors.destination?.message}>
              <select {...register("destination")} className="input-field">
                <option value="">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.name}>{d.name}, {d.country}</option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Travel Date" error={errors.travelDate?.message}>
                <input type="date" {...register("travelDate")} className="input-field" />
              </Field>
              <Field label="Budget (PKR per person)" error={errors.budget?.message}>
                <select {...register("budget")} className="input-field">
                  <option value="">Select range</option>
                  <option value="Under 50,000">Under 50,000</option>
                  <option value="50,000 – 150,000">50,000 – 150,000</option>
                  <option value="150,000 – 300,000">150,000 – 300,000</option>
                  <option value="300,000+">300,000+</option>
                </select>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Adults" error={errors.adults?.message}>
                <input type="number" min={1} {...register("adults")} className="input-field" />
              </Field>
              <Field label="Children" error={errors.children?.message}>
                <input type="number" min={0} {...register("children")} className="input-field" />
              </Field>
              <Field label="Rooms" error={errors.rooms?.message}>
                <input type="number" min={1} {...register("rooms")} className="input-field" />
              </Field>
            </div>

            <Field label="Do you have a valid passport?" error={errors.passportReady?.message}>
              <select {...register("passportReady")} className="input-field">
                <option value="">Select an option</option>
                <option value="Yes, all travelers">Yes, all travelers</option>
                <option value="Some travelers">Some travelers</option>
                <option value="Need to apply">Need to apply</option>
              </select>
            </Field>

            <Field label="Special requirements (optional)">
              <textarea {...register("requirements")} rows={3} className="input-field resize-none" placeholder="Dietary needs, accessibility, celebrations…" />
            </Field>

            <div className="mt-2 border-t border-parchment/10 pt-6">
              <h3 className="font-display text-base font-semibold text-parchment">Contact information</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.name?.message}>
                  <input {...register("name")} className="input-field" placeholder="Your name" />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input {...register("phone")} className="input-field" placeholder="+92 3XX XXXXXXX" />
                </Field>
              </div>
              <Field label="Email" error={errors.email?.message}>
                <input {...register("email")} className="input-field" placeholder="you@email.com" />
              </Field>
            </div>

            {submitError && (
              <p className="mt-4 rounded-lg border border-orange/30 bg-orange/10 px-4 py-3 text-sm text-orange">
                {submitError}
              </p>
            )}
            <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full">
              {isSubmitting ? "Submitting…" : "Submit Inquiry"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-xs font-medium text-fog">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-orange">{error}</p>}
    </div>
  );
}
