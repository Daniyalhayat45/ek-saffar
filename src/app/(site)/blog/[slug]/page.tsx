import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <article className="bg-basecamp pt-28">
      <div className="mx-auto max-w-3xl px-5 pb-20 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-orange">{post.category}</div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">{post.title}</h1>
        <div className="mt-3 text-sm text-fog">{post.author} · {post.date} · {post.readMinutes} min read</div>

        <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </div>

        <div className="prose-invert mt-10 space-y-5 text-[15px] leading-relaxed text-parchment/90">
          <p>{post.excerpt}</p>
          <p>
            Our team put this guide together from firsthand trip notes, updated each season as requirements and
            conditions change. If anything here looks out of date by the time you&apos;re planning, our consultants
            will confirm current details before you book.
          </p>
          <p>
            Have a specific question about this destination or process? Reach out directly — we&apos;re happy to
            walk through it over a call or WhatsApp.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-parchment/10 pt-8">
          <Link href="/contact" className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-basecamp">
            Ask a Question
          </Link>
          <Link href="/blog" className="rounded-full border border-parchment/15 px-5 py-2.5 text-sm font-semibold text-parchment">
            Back to Blog
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-semibold text-parchment">Related articles</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="rounded-2xl border border-parchment/10 bg-basecamp-2 p-5">
                  <div className="font-display text-base font-semibold text-parchment">{r.title}</div>
                  <div className="mt-2 text-sm text-fog line-clamp-2">{r.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
