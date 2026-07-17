export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/db";
import { packages, destinations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { PackageForm, type PackageFormValues } from "@/components/admin/package-form";

async function updatePackage(id: number, values: PackageFormValues) {
  "use server";
  try {
    await db.update(packages).set(values).where(eq(packages.id, id));
    revalidatePath("/admin/packages");
    revalidatePath("/packages");
    revalidatePath(`/packages/${values.slug}`);
    revalidatePath("/");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not update package.";
    return { ok: false, error: message.includes("unique") ? "That slug is already in use." : message };
  }
  return { ok: true };
}

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [pkg] = await db.select().from(packages).where(eq(packages.id, Number(id))).limit(1);
  if (!pkg) notFound();

  const destinationOptions = await db
    .select({ slug: destinations.slug, name: destinations.name })
    .from(destinations);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-parchment">Edit Package</h1>
      <p className="mt-1 text-sm text-fog">{pkg.title}</p>
      <div className="mt-6">
        <PackageForm initial={pkg} destinationOptions={destinationOptions} action={(values) => updatePackage(pkg.id, values)} />
      </div>
    </div>
  );
}
