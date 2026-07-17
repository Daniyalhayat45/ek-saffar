export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { db } from "@/db";
import { destinations } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteRowButton } from "@/components/admin/delete-row-button";
import { AdminSearchBox } from "@/components/admin/search-box";

async function getRows(q?: string) {
  try {
    const all = await db.select().from(destinations).orderBy(desc(destinations.createdAt));
    if (!q) return { rows: all, connected: true };
    const needle = q.toLowerCase();
    return {
      rows: all.filter(
        (d) => d.name.toLowerCase().includes(needle) || d.country.toLowerCase().includes(needle) || d.slug.toLowerCase().includes(needle)
      ),
      connected: true,
    };
  } catch {
    return { rows: [], connected: false };
  }
}

async function deleteDestination(id: number) {
  "use server";
  await db.delete(destinations).where(eq(destinations.id, id));
  revalidatePath("/admin/destinations");
}

export default async function AdminDestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { rows, connected } = await getRows(q);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-parchment">Destinations</h1>
          <p className="mt-1 text-sm text-fog">{rows.length} destination{rows.length === 1 ? "" : "s"}</p>
        </div>
        <Link href="/admin/destinations/new">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-basecamp transition-colors hover:bg-orange-deep">
            <Plus className="h-4 w-4" /> Add Destination
          </span>
        </Link>
      </div>

      <div className="mt-6">
        <AdminSearchBox placeholder="Search by name, country, or slug…" basePath="/admin/destinations" />
      </div>

      {!connected && (
        <div className="mt-6 rounded-xl border border-orange/30 bg-orange/10 p-4 text-sm text-orange">
          Could not reach the database. Set <code>DATABASE_URL</code> in your environment variables.
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-parchment/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-basecamp-2 text-xs uppercase tracking-wide text-fog">
            <tr>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price (PKR)</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && connected && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-fog">
                  {q ? "No destinations match that search." : "No destinations yet — add your first one."}
                </td>
              </tr>
            )}
            {rows.map((d) => (
              <tr key={d.id} className="border-t border-parchment/10">
                <td className="px-4 py-3">
                  <div className="font-medium text-parchment">{d.name}</div>
                  <div className="text-xs text-fog">{d.country} · {d.slug}</div>
                </td>
                <td className="px-4 py-3 text-fog">{d.region}</td>
                <td className="px-4 py-3 text-fog">{d.category}</td>
                <td className="px-4 py-3 text-fog">{d.startingPricePKR.toLocaleString()}</td>
                <td className="px-4 py-3 text-fog">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-orange text-orange" /> {d.rating}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/destinations/${d.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-parchment/15 text-fog transition-colors hover:border-orange hover:text-orange"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <DeleteRowButton id={d.id} action={deleteDestination} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
