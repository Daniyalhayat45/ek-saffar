import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { bookings } from "@/db/schema";

const schema = z.object({
  destination: z.string().min(1),
  travelDate: z.string().min(1),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().min(0).default(0),
  rooms: z.coerce.number().min(1),
  budget: z.string().min(1),
  passportReady: z.string().min(1),
  requirements: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid submission", issues: parsed.error.flatten() }, { status: 400 });
    }

    const [row] = await db.insert(bookings).values(parsed.data).returning({ id: bookings.id });
    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch (err) {
    console.error("Booking submission failed:", err);
    return NextResponse.json(
      { error: "Could not save your inquiry. Check that DATABASE_URL is configured." },
      { status: 500 }
    );
  }
}
