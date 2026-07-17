import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/constants/site";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated July 2026" />
      <section className="bg-basecamp py-16">
        <div className="prose-invert mx-auto max-w-3xl space-y-6 px-5 text-sm leading-relaxed text-fog lg:px-8">
          <p>
            {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) collects the information you provide directly to
            us — such as your name, contact details, and travel preferences — when you submit a booking inquiry,
            contact form, or newsletter signup on this site.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">How we use your information</h2>
          <p>
            We use the details you share to respond to inquiries, prepare travel quotes, process bookings and visa
            applications, and send updates about your trip. With your consent, we may also send occasional emails
            about new packages or seasonal offers.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Sharing your information</h2>
          <p>
            We share necessary details with airlines, hotels, and visa/embassy processing partners strictly to
            fulfill your booking. We do not sell your personal information to third parties.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Data retention</h2>
          <p>
            We retain booking and inquiry records for as long as needed to provide services and meet legal or
            regulatory record-keeping requirements, after which they are securely deleted.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Your choices</h2>
          <p>
            You can unsubscribe from marketing emails at any time, and can request access to or deletion of your
            personal information by contacting us at {siteConfig.email}.
          </p>
          <h2 className="font-display text-xl font-semibold text-parchment">Contact</h2>
          <p>Questions about this policy can be sent to {siteConfig.email} or {siteConfig.phone}.</p>
        </div>
      </section>
    </>
  );
}
