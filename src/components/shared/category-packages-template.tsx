import { PageHeader } from "@/components/shared/page-header";
import { PackageCard } from "@/components/shared/package-card";
import { Button } from "@/components/ui/button";
import { TourPackage } from "@/types/travel";

export function CategoryPackagesTemplate({
  eyebrow,
  title,
  description,
  packages,
  ctaLabel = "Enquire Now",
}: {
  eyebrow: string;
  title: string;
  description: string;
  packages: TourPackage[];
  ctaLabel?: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-parchment/10 bg-basecamp-2 p-12 text-center">
              <p className="text-fog">No fixed packages listed yet — tell us your dates and group size and we&apos;ll build one.</p>
              <Button asChild className="mt-6">
                <a href="/booking">{ctaLabel}</a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
