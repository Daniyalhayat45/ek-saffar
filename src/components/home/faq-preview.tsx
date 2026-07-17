import { getFaqs } from "@/db/queries";
import { FaqAccordion } from "@/components/home/faq-accordion";

export async function FaqPreview() {
  const all = await getFaqs();
  const preview = all.slice(0, 6);
  if (preview.length === 0) return null;

  return (
    <section className="bg-basecamp-2 py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-orange">FAQs</div>
          <h2 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">Common questions</h2>
        </div>
        <FaqAccordion faqs={preview} />
      </div>
    </section>
  );
}
