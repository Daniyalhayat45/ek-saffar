import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getBlogPosts } from "@/db/queries";

export async function BlogPreview() {
  const all = await getBlogPosts();
  const posts = all.slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section className="bg-basecamp py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-orange">Latest From The Blog</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">
              Guides &amp; stories before you go
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1.5 text-sm font-semibold text-parchment hover:text-orange">
            All articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp-2"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-orange">{post.category}</div>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-parchment">{post.title}</h3>
                <p className="mt-2 text-sm text-fog line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 text-xs text-fog">{post.readMinutes} min read · {post.author}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
