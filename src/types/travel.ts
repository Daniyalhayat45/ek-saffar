import { destinations, packages, blogPosts, testimonials, faqs } from "@/db/schema";

// Types are derived directly from the database schema — the single source of
// truth for content shape now that packages/destinations/blog/etc. are
// database-backed instead of static files.
export type Destination = typeof destinations.$inferSelect;
export type TourPackage = typeof packages.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type FAQ = typeof faqs.$inferSelect;
