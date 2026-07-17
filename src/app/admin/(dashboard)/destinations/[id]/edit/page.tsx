export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/db";
import { destinations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DestinationForm, type DestinationFormValues } from "@/components/admin/destination-form";

async function updateDestination(id: number, values: DestinationFormValues) {
  "use server";
  try {
    await db.update(destinations).set(values).where(eq(destinations.id, id));
    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath(`/destinations/${values.slug}`);
    revalidatePath("/");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not update destination.";
    return { ok: false, error: message.includes("unique") ? "That slug is already in use." : message };
  }
  return { ok: true };
}

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [destination] = await db.select().from(destinations).where(eq(destinations.id, Number(id))).limit(1);

  if (!destination) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-parchment">Edit Destination</h1>
      <p className="mt-1 text-sm text-fog">{destination.name}</p>
      <div className="mt-6">
        <DestinationForm initial={destination} action={(values) => updateDestination(destination.id, values)} />
      </div>
    </div>
  );
}
