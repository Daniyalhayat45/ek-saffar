import { pgTable, serial, text, integer, timestamp, boolean, jsonb, doublePrecision } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  destination: text("destination").notNull(),
  travelDate: text("travel_date").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull().default(0),
  rooms: integer("rooms").notNull(),
  budget: text("budget").notNull(),
  passportReady: text("passport_ready").notNull(),
  requirements: text("requirements"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull().default("new"), // new | contacted | confirmed | archived
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region").notNull(), // Asia | Middle East | Europe | Africa | Americas | Oceania
  category: text("category").notNull(), // Beach | Mountain | City | Cultural | Adventure | Religious
  budgetTier: text("budget_tier").notNull(), // Budget | Mid-range | Luxury
  bestSeason: text("best_season").notNull(), // Winter | Summer | Spring | Autumn | Year-round
  image: text("image").notNull(),
  tagline: text("tagline").notNull(),
  startingPricePKR: integer("starting_price_pkr").notNull(),
  rating: doublePrecision("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  destinationSlug: text("destination_slug").notNull(),
  category: text("category").notNull(), // Family | Honeymoon | Group | Corporate | Solo | Adventure
  durationDays: integer("duration_days").notNull(),
  durationNights: integer("duration_nights").notNull(),
  pricePKR: integer("price_pkr").notNull(),
  originalPricePKR: integer("original_price_pkr"),
  difficulty: text("difficulty").notNull(), // Easy | Moderate | Challenging
  image: text("image").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  rating: doublePrecision("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  included: jsonb("included").$type<string[]>().notNull().default([]),
  excluded: jsonb("excluded").$type<string[]>().notNull().default([]),
  itinerary: jsonb("itinerary").$type<{ day: number; title: string; description: string }[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  date: text("date").notNull(),
  readMinutes: integer("read_minutes").notNull().default(4),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  avatar: text("avatar").notNull(),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull(),
  trip: text("trip").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("General"), // General | Booking | Visa | Umrah & Hajj | Payments
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
