import { db } from "@/db";
import { destinations, packages, blogPosts, testimonials, faqs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getDestinations() {
  try {
    return await db.select().from(destinations).orderBy(desc(destinations.createdAt));
  } catch {
    return [];
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    const [row] = await db.select().from(destinations).where(eq(destinations.slug, slug)).limit(1);
    return row ?? null;
  } catch {
    return null;
  }
}

export async function getPackages() {
  try {
    return await db.select().from(packages).orderBy(desc(packages.createdAt));
  } catch {
    return [];
  }
}

export async function getPackageBySlug(slug: string) {
  try {
    const [row] = await db.select().from(packages).where(eq(packages.slug, slug)).limit(1);
    return row ?? null;
  } catch {
    return null;
  }
}

export async function getPackagesByDestinationSlug(destinationSlug: string) {
  try {
    return await db.select().from(packages).where(eq(packages.destinationSlug, destinationSlug));
  } catch {
    return [];
  }
}

export async function getBlogPosts() {
  try {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const [row] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return row ?? null;
  } catch {
    return null;
  }
}

export async function getTestimonials() {
  try {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  } catch {
    return [];
  }
}

export async function getFaqs() {
  try {
    return await db.select().from(faqs).orderBy(desc(faqs.createdAt));
  } catch {
    return [];
  }
}
