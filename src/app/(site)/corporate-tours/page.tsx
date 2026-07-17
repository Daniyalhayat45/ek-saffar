import { CategoryPackagesTemplate } from "@/components/shared/category-packages-template";
import { getPackages } from "@/db/queries";

export const dynamic = "force-dynamic";

export const metadata = { title: "Corporate Tours" };

export default async function CorporateToursPage() {
  const packages = await getPackages();
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
