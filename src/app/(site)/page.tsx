import { Hero } from "@/components/home/hero";
import { Partners } from "@/components/home/partners";
import { PopularDestinations } from "@/components/home/popular-destinations";
import { Categories } from "@/components/home/categories";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { GalleryStats } from "@/components/home/gallery-stats";
import { BlogPreview } from "@/components/home/blog-preview";
import { FaqPreview } from "@/components/home/faq-preview";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { getDestinations } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const destinations = await getDestinations();
  return (
    <>
      <Hero destinations={destinations} />
      <Partners />
      <PopularDestinations />
      <Categories />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <GalleryStats />
      <BlogPreview />
      <FaqPreview />
      <NewsletterCta />
    </>
  );
}
