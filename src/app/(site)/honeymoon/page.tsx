import { CategoryPackagesTemplate } from "@/components/shared/category-packages-template";
import { getPackages } from "@/db/queries";

export const dynamic = "force-dynamic";

export const metadata = { title: "Honeymoon Packages" };

export default async function HoneymoonPage() {
  const packages = await getPackages();
  return (
    <CategoryPackagesTemplate
      eyebrow="Honeymoon Packages"
      title="Romantic escapes, planned for two"
      description="Overwater villas, sunset dinners, and quiet islands — itineraries built around privacy and pace, not group schedules."
      packages={packages.filter((p) => p.category === "Honeymoon")}
    />
  );
}
