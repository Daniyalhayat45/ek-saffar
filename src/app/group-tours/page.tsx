import { CategoryPackagesTemplate } from "@/components/shared/category-packages-template";
import { packages } from "@/data/packages";

export const metadata = { title: "Group Tours" };

export default function GroupToursPage() {
  return (
    <CategoryPackagesTemplate
      eyebrow="Group Tours"
      title="Travel with a crew"
      description="Fixed departures for friend groups and travel communities — shared transport, shared rooms optional, shared memories guaranteed."
      packages={packages.filter((p) => p.category === "Group")}
    />
  );
}
