export const dynamic = "force-dynamic";

import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteRowButton } from "@/components/admin/delete-row-button";
import { ExportCsvButton } from "@/components/admin/export-csv-button";

async function getSubscribers() {
  try {
    return { rows: await db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt)), connected: true };
  } catch {
    return { rows: [], connected: false };
  }
}

async function deleteSubscriber(id: number) {
  "use server";
  await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
  revalidatePath("/admin/newsletter");
  revalidatePath("/admin");
}

export default async function AdminNewsletterPage() {
  const { rows, connected } = await getSubscribers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-parchment">Newsletter Subscribers</h1>
          <p className="mt-1 text-sm text-fog">Everyone who signed up from the footer form.</p>
        </div>
        <ExportCsvButton rows={rows.map((r) => ({ email: r.email, joined: new Date(r.createdAt).toISOString() }))} filename="newsletter-subscribers.csv" />
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
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && connected && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-fog">No subscribers yet.</td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-parchment/10">
                <td className="px-4 py-3 text-parchment">{r.email}</td>
                <td className="px-4 py-3 text-fog">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex">
                    <DeleteRowButton id={r.id} action={deleteSubscriber} />
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
