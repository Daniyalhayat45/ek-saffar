"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/content";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = blogPosts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader eyebrow="Blog" title="Guides & stories" description="Practical write-ups before you book — from visa checklists to destination timing." />

      <section className="bg-basecamp py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    category === c ? "border-orange bg-orange text-basecamp" : "border-parchment/15 text-fog hover:border-orange/40 hover:text-parchment"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="input-field w-full sm:w-56"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp-2">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-orange">{post.category}</div>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug text-parchment">{post.title}</h3>
                  <p className="mt-2 text-sm text-fog line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 text-xs text-fog">{post.readMinutes} min read · {post.author} · {post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
