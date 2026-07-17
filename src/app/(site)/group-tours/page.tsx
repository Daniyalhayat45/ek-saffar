import { CategoryPackagesTemplate } from "@/components/shared/category-packages-template";
import { getPackages } from "@/db/queries";

export const dynamic = "force-dynamic";

export const metadata = { title: "Group Tours" };

export default async function GroupToursPage() {
  const packages = await getPackages();
  return (
    <CategoryPackagesTemplate
      eyebrow="Group Tours"
      title="Travel with a crew"
      description="Fixed departures for friend groups and travel communities — shared transport, shared rooms optional, shared memories guaranteed."
      packages={packages.filter((p) => p.category === "Group")}
    />
  );
}
