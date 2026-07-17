export const dynamic = "force-dynamic";

import Link from "next/link";
import { ClipboardList, Mail, Send, TrendingUp, Package, MapPin } from "lucide-react";
import { db } from "@/db";
import { bookings, contactMessages, newsletterSubscribers, packages, destinations } from "@/db/schema";
import { sql } from "drizzle-orm";

async function getStats() {
  try {
    const [[bookingCount], [messageCount], [subscriberCount], [packageCount], [destinationCount], recentBookings] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(bookings),
      db.select({ count: sql<number>`count(*)::int` }).from(contactMessages),
      db.select({ count: sql<number>`count(*)::int` }).from(newsletterSubscribers),
      db.select({ count: sql<number>`count(*)::int` }).from(packages),
      db.select({ count: sql<number>`count(*)::int` }).from(destinations),
      db.select().from(bookings).orderBy(sql`${bookings.createdAt} desc`).limit(5),
    ]);
    return {
      bookingCount: bookingCount?.count ?? 0,
      messageCount: messageCount?.count ?? 0,
      subscriberCount: subscriberCount?.count ?? 0,
      packageCount: packageCount?.count ?? 0,
      destinationCount: destinationCount?.count ?? 0,
      recentBookings,
      dbConnected: true,
    };
  } catch {
    return { bookingCount: 0, messageCount: 0, subscriberCount: 0, packageCount: 0, destinationCount: 0, recentBookings: [], dbConnected: false };
  }
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-parchment">Overview</h1>
      <p className="mt-1 text-sm text-fog">A snapshot of inquiries coming through the site.</p>

      {!stats.dbConnected && (
        <div className="mt-6 rounded-xl border border-orange/30 bg-orange/10 p-4 text-sm text-orange">
          Could not reach the database. Set <code>DATABASE_URL</code> in your environment variables — see{" "}
          <code>.env.example</code>.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={Package} label="Packages" value={stats.packageCount} href="/admin/packages" />
        <StatCard icon={MapPin} label="Destinations" value={stats.destinationCount} href="/admin/destinations" />
        <StatCard icon={ClipboardList} label="Booking inquiries" value={stats.bookingCount} href="/admin/bookings" />
        <StatCard icon={Mail} label="Contact messages" value={stats.messageCount} href="/admin/messages" />
        <StatCard icon={Send} label="Newsletter subscribers" value={stats.subscriberCount} href="/admin/newsletter" />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-parchment">Recent booking inquiries</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-parchment/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-basecamp-2 text-xs uppercase tracking-wide text-fog">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Travel Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-fog">
                    No booking inquiries yet.
                  </td>
                </tr>
              ) : (
                stats.recentBookings.map((b) => (
                  <tr key={b.id} className="border-t border-parchment/10">
                    <td className="px-4 py-3 text-parchment">{b.name}</td>
                    <td className="px-4 py-3 text-fog">{b.destination}</td>
                    <td className="px-4 py-3 text-fog">{b.travelDate}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-orange/10 px-2.5 py-1 text-xs font-medium text-orange">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Link href="/admin/bookings" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-parchment hover:text-orange">
          <TrendingUp className="h-4 w-4" /> View all bookings
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href} className="rounded-xl border border-parchment/10 bg-basecamp-2 p-5 transition-colors hover:border-orange/30">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 text-orange">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-display text-3xl font-semibold text-parchment">{value}</div>
      <div className="mt-1 text-sm text-fog">{label}</div>
    </Link>
  );
}
