import { CategoryPackagesTemplate } from "@/components/shared/category-packages-template";
import { packages } from "@/data/packages";

export const metadata = { title: "Honeymoon Packages" };

export default function HoneymoonPage() {
  return (
    <CategoryPackagesTemplate
      eyebrow="Honeymoon Packages"
      title="Romantic escapes, planned for two"
      description="Overwater villas, sunset dinners, and quiet islands — itineraries built around privacy and pace, not group schedules."
      packages={packages.filter((p) => p.category === "Honeymoon")}
    />
  );
}
