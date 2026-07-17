import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

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
