import { MetadataRoute } from "next";
import { getDestinations, getPackages } from "@/db/queries";
import { blogPosts } from "@/data/content";
import { siteConfig } from "@/constants/site";

export const dynamic = "force-dynamic";

const staticRoutes = [
  "", "about", "contact", "destinations", "packages", "honeymoon", "group-tours",
  "corporate-tours", "umrah", "hajj", "visa-services", "blog", "gallery",
  "testimonials", "faqs", "booking", "careers", "privacy-policy", "terms", "refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [destinations, packages] = await Promise.all([getDestinations(), getPackages()]);

  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}/${route}`,
    lastModified: new Date(),
  }));
  const destinationEntries = destinations.map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: new Date(),
  }));
  const packageEntries = packages.map((p) => ({
    url: `${base}/packages/${p.slug}`,
    lastModified: new Date(),
  }));
  const blogEntries = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...staticEntries, ...destinationEntries, ...packageEntries, ...blogEntries];
}
