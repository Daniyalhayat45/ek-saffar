import { CategoryPackagesTemplate } from "@/components/shared/category-packages-template";
import { packages } from "@/data/packages";

export const metadata = { title: "Corporate Tours" };

export default function CorporateToursPage() {
  return (
    <CategoryPackagesTemplate
      eyebrow="Corporate Tours"
      title="Offsites and incentive travel"
      description="Conference logistics, team-building activities, and executive itineraries — managed end to end for groups of 10 to 200."
      packages={packages.filter((p) => p.category === "Corporate")}
      ctaLabel="Request a Corporate Quote"
    />
  );
}
