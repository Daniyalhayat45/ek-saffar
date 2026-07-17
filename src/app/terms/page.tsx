import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/constants/site";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="Last updated July 2026" />
      <section className="bg-basecamp py-16">
        <div className="prose-invert mx-auto max-w-3xl space-y-6 px-5 text-sm leading-relaxed text-fog lg:px-8">
          <h2 className="font-display text-xl font-semibold text-parchment">Bookings</h2>
          <p>
            All packages listed on this site are quoted subject to availability at the time of confirmation. A
            booking is only confirmed once {siteConfig.name} issues written confirmation and any required deposit
            has been received.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Pricing</h2>
          <p>
            Prices are shown per person unless stated otherwise and may change without notice due to currency
            fluctuation, airfare changes, or seasonal demand until a booking is confirmed in writing.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Travel documents</h2>
          <p>
            Travelers are responsible for holding a valid passport and any required visas. {siteConfig.name} assists
            with documentation but is not liable for denial of entry or visa refusal by any government authority.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Changes & cancellations</h2>
          <p>
            Cancellation terms vary by package and supplier (airlines, hotels) and are shared at the time of
            booking. See our Refund Policy for details.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Liability</h2>
          <p>
            {siteConfig.name} acts as an agent for airlines, hotels, and other service providers and is not liable
            for their acts, omissions, delays, or failures beyond our reasonable control.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Governing law</h2>
          <p>These terms are governed by the laws of Pakistan.</p>
        </div>
      </section>
    </>
  );
}
