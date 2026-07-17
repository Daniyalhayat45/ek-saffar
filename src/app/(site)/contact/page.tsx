"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Mail, Phone, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  subject: z.string().min(1, "Select a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});
type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's plan your trip" description="Reach out directly or send a message — we typically reply within a few hours." />

      <section className="bg-basecamp py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <div className="space-y-5">
              <InfoRow icon={MapPin} label="Office" value={siteConfig.address} />
              <InfoRow icon={Phone} label="Phone" value={siteConfig.phone} href={`tel:${siteConfig.phone}`} />
              <InfoRow icon={Mail} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
              <InfoRow icon={Clock} label="Hours" value={siteConfig.hours} />
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-parchment/10">
              <iframe
                title="Ek Safar office location"
                width="100%"
                height="260"
                loading="lazy"
                style={{ border: 0, filter: "grayscale(0.4) invert(0.92) contrast(0.9)" }}
                src="https://www.google.com/maps?q=I.I.+Chundrigar+Road,+Karachi&output=embed"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-parchment/10 bg-basecamp-2 p-6 sm:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-orange" />
                <h3 className="mt-4 font-display text-xl font-semibold text-parchment">Message sent</h3>
                <p className="mt-2 text-sm text-fog">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-5 sm:grid-cols-2">
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
                <Field label="Subject" error={errors.subject?.message}>
                  <select {...register("subject")} className="input-field">
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Package Details">Package Details</option>
                    <option value="Visa Services">Visa Services</option>
                    <option value="Umrah & Hajj">Umrah &amp; Hajj</option>
                    <option value="Corporate Travel">Corporate Travel</option>
                  </select>
                </Field>
                <Field label="Message" error={errors.message?.message}>
                  <textarea {...register("message")} rows={5} className="input-field resize-none" placeholder="How can we help?" />
                </Field>
                {submitError && (
                  <p className="mt-2 rounded-lg border border-orange/30 bg-orange/10 px-4 py-3 text-sm text-orange">
                    {submitError}
                  </p>
                )}
                <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full">
                  {isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3 rounded-2xl border border-parchment/10 bg-basecamp-2 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div>
        <div className="text-xs text-fog">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-parchment">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
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
