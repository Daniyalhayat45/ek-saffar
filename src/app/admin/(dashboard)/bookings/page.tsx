export const dynamic = "force-dynamic";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { StatusSelect } from "@/components/admin/status-select";
import { DeleteRowButton } from "@/components/admin/delete-row-button";

async function getBookings() {
  try {
    return { rows: await db.select().from(bookings).orderBy(desc(bookings.createdAt)), connected: true };
  } catch {
    return { rows: [], connected: false };
  }
}

async function updateStatus(id: number, status: string) {
  "use server";
  await db.update(bookings).set({ status }).where(eq(bookings.id, id));
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

async function deleteBooking(id: number) {
  "use server";
  await db.delete(bookings).where(eq(bookings.id, id));
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

export default async function AdminBookingsPage() {
  const { rows, connected } = await getBookings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-parchment">Booking Inquiries</h1>
      <p className="mt-1 text-sm text-fog">Everything submitted through the booking form on the site.</p>

      {!connected && (
        <div className="mt-6 rounded-xl border border-orange/30 bg-orange/10 p-4 text-sm text-orange">
          Could not reach the database. Set <code>DATABASE_URL</code> in your environment variables.
        </div>
      )}

      <div className="mt-6 space-y-4">
        {rows.length === 0 && connected && (
          <div className="rounded-xl border border-parchment/10 bg-basecamp-2 p-10 text-center text-fog">
            No booking inquiries yet.
          </div>
        )}
        {rows.map((b) => (
          <div key={b.id} className="rounded-xl border border-parchment/10 bg-basecamp-2 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-display text-lg font-semibold text-parchment">{b.name}</div>
                <div className="mt-0.5 text-sm text-fog">{b.email} · {b.phone}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusSelect id={b.id} status={b.status} action={updateStatus} />
                <DeleteRowButton id={b.id} action={deleteBooking} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <Field label="Destination" value={b.destination} />
              <Field label="Travel Date" value={b.travelDate} />
              <Field label="Travelers" value={`${b.adults} adults, ${b.children} children`} />
              <Field label="Rooms" value={String(b.rooms)} />
              <Field label="Budget" value={b.budget} />
              <Field label="Passport Ready" value={b.passportReady} />
              <Field label="Submitted" value={new Date(b.createdAt).toLocaleString()} />
            </div>
            {b.requirements && (
              <div className="mt-3 rounded-lg bg-basecamp px-4 py-3 text-sm text-fog">
                <span className="font-medium text-parchment">Notes: </span>
                {b.requirements}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-fog">{label}</div>
      <div className="mt-0.5 text-parchment">{value}</div>
    </div>
  );
}
