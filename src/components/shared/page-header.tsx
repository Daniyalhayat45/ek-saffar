export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="contour-field border-b border-parchment/10 bg-basecamp pb-16 pt-36">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-orange">{eyebrow}</div>
        <h1 className="mt-3 font-display text-4xl font-semibold text-parchment sm:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-4 max-w-2xl text-fog">{description}</p>}
      </div>
    </section>
  );
}
