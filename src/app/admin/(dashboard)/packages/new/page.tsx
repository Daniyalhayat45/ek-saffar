export const dynamic = "force-dynamic";

import { db } from "@/db";
import { packages, destinations } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { PackageForm, type PackageFormValues } from "@/components/admin/package-form";

async function createPackage(values: PackageFormValues) {
  "use server";
  try {
    await db.insert(packages).values(values);
    revalidatePath("/admin/packages");
    revalidatePath("/packages");
    revalidatePath("/");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create package.";
    return { ok: false, error: message.includes("unique") ? "That slug is already in use." : message };
  }
  return { ok: true };
}

export default async function NewPackagePage() {
  const destinationOptions = await db
    .select({ slug: destinations.slug, name: destinations.name })
    .from(destinations);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-parchment">Add Package</h1>
      <p className="mt-1 text-sm text-fog">This will appear immediately on the public site.</p>
      {destinationOptions.length === 0 && (
        <p className="mt-4 rounded-lg border border-orange/30 bg-orange/10 px-4 py-3 text-sm text-orange">
          Add at least one destination first — packages need to link to one.
        </p>
      )}
      <div className="mt-6">
        <PackageForm destinationOptions={destinationOptions} action={createPackage} />
      </div>
    </div>
  );
}
