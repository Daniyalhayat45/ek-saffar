export const dynamic = "force-dynamic";

import { getDestinations } from "@/db/queries";
import { BookingForm } from "@/components/shared/booking-form";

export default async function BookingPage() {
  const destinations = await getDestinations();
  return <BookingForm destinations={destinations.map((d) => ({ slug: d.slug, name: d.name, country: d.country }))} />;
}
