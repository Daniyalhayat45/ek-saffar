import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(5),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid submission", issues: parsed.error.flatten() }, { status: 400 });
    }

    const [row] = await db.insert(contactMessages).values(parsed.data).returning({ id: contactMessages.id });
    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Check that DATABASE_URL is configured." },
      { status: 500 }
    );
  }
}
