"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { TicketIcon, CalendarIcon, SearchIcon } from "./icons";
import type { Post } from "@/lib/posts";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogIndexSidebar({
  posts,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  ctaHeading = "Ready to book your Siam Park ticket?",
  ctaBody = "Best ticket prices, instant mobile confirmation, and free cancellation on most tickets.",
  ctaButtonText = "Compare Siam Park Tickets →",
}: {
  posts: Post[];
  categories: { name: string; count: number }[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonText?: string;
}) {
  const popular = posts.slice(0, 5);

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Search Widget */}
      <div className="flex rounded-xl border border-chichen-sand/60 bg-white overflow-hidden shadow-sm focus-within:border-chichen-navy">
        <input
          type="text"
          value={searchQuery || ""}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search guides..."
          className="w-full bg-transparent px-3.5 py-2.5 text-xs text-chichen-charcoal placeholder-chichen-charcoal/60 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Search"
          className="flex items-center justify-center bg-chichen-navy px-3.5 text-white transition hover:opacity-90"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div className="rounded-2xl border border-chichen-sand/60 bg-white p-5 shadow-sm">
          <p className="font-display text-base font-bold text-chichen-navy">Categories</p>
          <div className="mt-3.5 space-y-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => onSelectCategory && onSelectCategory(isSelected ? "All" : cat.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-chichen-sky text-chichen-gold font-bold border border-chichen-sand/60"
                      : "text-chichen-charcoal/80 hover:bg-chichen-sky hover:text-chichen-navy"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-chichen-sky px-1.5 text-[10px] font-bold text-chichen-navy border border-chichen-sand/60">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular Articles Widget */}
      {popular.length > 0 && (
        <div className="rounded-2xl border border-chichen-sand/60 bg-white p-5 shadow-sm">
          <p className="font-display text-base font-bold text-chichen-navy">Popular Guides</p>
          <div className="mt-4 space-y-3.5">
            {popular.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-3"
              >
                <div className="relative h-13 w-16 shrink-0 aspect-[4/3] overflow-hidden rounded-xl bg-chichen-navy">
                  <SafeImage
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    quality={65}
                    sizes="80px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-bold leading-snug text-chichen-navy transition-colors group-hover:text-chichen-gold">
                    {post.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-chichen-charcoal/70 font-medium">
                    <CalendarIcon className="h-3 w-3 text-chichen-gold" />
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Book Your Tickets Promo Card */}
      <div className="relative overflow-hidden rounded-2xl bg-chichen-navy p-6 text-center text-white shadow-md border border-chichen-navy">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-chichen-gold border border-white/15 shadow-sm">
          <TicketIcon className="h-5 w-5" />
        </div>
        <p className="mt-3.5 font-display text-base font-bold text-white">{ctaHeading}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-white/80">{ctaBody}</p>
        <a
          href="/#tours"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-chichen-gold px-5 py-2.5 text-xs font-bold text-[#0B281E] shadow-sm transition hover:opacity-90 hover:scale-[1.02]"
        >
          {ctaButtonText}
        </a>
      </div>
    </aside>
  );
}
