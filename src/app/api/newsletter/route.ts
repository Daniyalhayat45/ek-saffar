import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    await db.insert(newsletterSubscribers).values(parsed.data).onConflictDoNothing();
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Newsletter subscribe failed:", err);
    return NextResponse.json(
      { error: "Could not subscribe. Check that DATABASE_URL is configured." },
      { status: 500 }
    );
  }
}
