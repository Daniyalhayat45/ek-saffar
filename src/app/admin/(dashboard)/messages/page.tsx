export const dynamic = "force-dynamic";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteRowButton } from "@/components/admin/delete-row-button";
import { MarkReadButton } from "@/components/admin/mark-read-button";

async function getMessages() {
  try {
    return { rows: await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)), connected: true };
  } catch {
    return { rows: [], connected: false };
  }
}

async function markRead(id: number) {
  "use server";
  await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
  revalidatePath("/admin/messages");
}

async function deleteMessage(id: number) {
  "use server";
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export default async function AdminMessagesPage() {
  const { rows, connected } = await getMessages();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-parchment">Contact Messages</h1>
      <p className="mt-1 text-sm text-fog">Messages submitted through the contact page.</p>

      {!connected && (
        <div className="mt-6 rounded-xl border border-orange/30 bg-orange/10 p-4 text-sm text-orange">
          Could not reach the database. Set <code>DATABASE_URL</code> in your environment variables.
        </div>
      )}

      <div className="mt-6 space-y-4">
        {rows.length === 0 && connected && (
          <div className="rounded-xl border border-parchment/10 bg-basecamp-2 p-10 text-center text-fog">
            No messages yet.
          </div>
        )}
        {rows.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-5 ${m.isRead ? "border-parchment/10 bg-basecamp-2" : "border-orange/30 bg-orange/5"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-semibold text-parchment">{m.name}</span>
                  {!m.isRead && <span className="rounded-full bg-orange px-2 py-0.5 text-[10px] font-bold text-basecamp">NEW</span>}
                </div>
                <div className="mt-0.5 text-sm text-fog">{m.email}{m.phone ? ` · ${m.phone}` : ""}</div>
              </div>
              <div className="flex items-center gap-2">
                {!m.isRead && <MarkReadButton id={m.id} action={markRead} />}
                <DeleteRowButton id={m.id} action={deleteMessage} />
              </div>
            </div>
            <div className="mt-3 text-sm font-medium text-parchment">{m.subject}</div>
            <p className="mt-1 text-sm text-fog">{m.message}</p>
            <div className="mt-3 text-xs text-fog">{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
