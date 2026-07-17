import { getDestinations } from "@/db/queries";
import { DestinationsFilterClient } from "@/components/shared/destinations-filter-client";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return <DestinationsFilterClient destinations={destinations} />;
}
