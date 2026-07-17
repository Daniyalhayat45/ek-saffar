export const dynamic = "force-dynamic";

import { db } from "@/db";
import { destinations } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { DestinationForm, type DestinationFormValues } from "@/components/admin/destination-form";

async function createDestination(values: DestinationFormValues) {
  "use server";
  try {
    await db.insert(destinations).values(values);
    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath("/");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create destination.";
    return { ok: false, error: message.includes("unique") ? "That slug is already in use." : message };
  }
  return { ok: true };
}

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-parchment">Add Destination</h1>
      <p className="mt-1 text-sm text-fog">This will appear immediately on the public site.</p>
      <div className="mt-6">
        <DestinationForm action={createDestination} />
      </div>
    </div>
  );
}
