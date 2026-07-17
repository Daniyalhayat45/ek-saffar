import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/constants/site";

export const metadata = { title: "Refund Policy" };

const tiers = [
  { window: "45+ days before departure", refund: "80% of package cost (minus non-refundable deposits)" },
  { window: "30–44 days before departure", refund: "50% of package cost" },
  { window: "15–29 days before departure", refund: "25% of package cost" },
  { window: "Under 15 days before departure", refund: "Non-refundable" },
];

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Refund Policy" description="Last updated July 2026" />
      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-sm leading-relaxed text-fog">
            Refunds depend on how far ahead of departure a cancellation is made, since airline and hotel deposits
            become non-refundable at different points. The table below reflects our standard package cancellation
            terms; Umrah, Hajj, and group-fare tickets may carry supplier-specific terms shared at booking.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-parchment/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-basecamp-2 text-xs uppercase tracking-wide text-fog">
                <tr>
                  <th className="px-5 py-3">Cancellation Window</th>
                  <th className="px-5 py-3">Refund</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.window} className="border-t border-parchment/10">
                    <td className="px-5 py-4 text-parchment">{t.window}</td>
                    <td className="px-5 py-4 text-fog">{t.refund}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-fog">
            Visa fees, ticketing fees already paid to airlines, and any non-refundable hotel deposits are excluded
            from refund calculations. Refund requests should be submitted in writing to {siteConfig.email} and are
            processed within 10–15 working days of approval.
          </p>
        </div>
      </section>
    </>
  );
}
