import { getPackages } from "@/db/queries";
import { PackagesFilterClient } from "@/components/shared/packages-filter-client";

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const packages = await getPackages();
  return <PackagesFilterClient packages={packages} />;
}
