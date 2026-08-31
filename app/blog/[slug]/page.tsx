import type { Metadata } from "next";
import Link from "next/link";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { notFound, permanentRedirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostBody from "@/components/BlogPostBody";
import BlogSidebar from "@/components/BlogSidebar";
import QuickAnswer from "@/components/QuickAnswer";
import RelatedPosts from "@/components/RelatedPosts";
import SafeImage from "@/components/SafeImage";
import { CalendarIcon, ClockPayIcon, TicketIcon } from "@/components/icons";
import { getPost, getPosts } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";
import { getRedirectTarget } from "@/lib/redirects";
import { resolveRobots, resolveCanonical, resolveOg, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { extractTableOfContents } from "@/lib/tableOfContents";

// Fallback route for any post created from /admin/posts that doesn't have
// its own hand-built page file (the 3 original launch articles do, for
// slightly more custom keyword targeting in their metadata — new posts
// added later are served here automatically).
export const dynamic = "force-dynamic";

// Blog-only font pairing, matching the amsterdam-boat-tours article page —
// Outfit for headings, Plus Jakarta Sans for body copy. Loaded here (rather
// than in the root layout) and applied only inside this page's <main> below,
// so it overrides the site's usual Cormorant Garamond serif branding just
// for the article itself, without touching the header, homepage, or any
// other page.
const blogDisplayFont = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const blogBodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  const og = resolveOg(
    { ogTitle: post.ogTitle, ogDescription: post.ogDescription, ogImage: post.ogImage },
    { title: post.metaTitle, description: post.metaDescription, image: post.image }
  );
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: resolveCanonical(`/blog/${params.slug}`, post.canonicalUrl) },
    robots: resolveRobots(post.noIndex, post.noFollow),
    openGraph: {
      title: og.title,
      description: og.description,
      url: `/blog/${params.slug}`,
      type: "article",
      images: og.image ? [{ url: og.image, alt: post.imageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function Post({ params }: { params: { slug: string } }) {
  const [post, allPosts, { sections }] = await Promise.all([
    getPost(params.slug),
    getPosts(),
    getHomepageContent(),
  ]);
  const s = sections.blogPage;

  if (!post) {
    // This slug isn't a live post — but it might be an old address for one
    // that's since been renamed from the admin. Redirecting instead of a
    // flat 404 keeps old links and search rankings working.
    const target = await getRedirectTarget(params.slug);
    if (target) permanentRedirect(`/blog/${target}`);
    notFound();
  }

  const articleJsonLd = buildArticleJsonLd({
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    authorName: "Siam Park Tickets",
    siteName: "Siam Park Tickets",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  // Auto-built from the article's own H2/H3 headings — see
  // lib/tableOfContents.ts. "Quick Answer" is prepended by hand since it's
  // its own component/field rather than a heading inside `content`.
  const { toc: headingToc, html: contentHtml } = extractTableOfContents(post.content);
  const toc = post.quickAnswer.trim()
    ? [{ id: "quick-answer", text: s.quickAnswerLabel, level: 2 as const }, ...headingToc]
    : headingToc;
  const popularPosts = allPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Header />
      <main
        className="min-h-screen bg-white font-body"
        style={{
          ["--font-display" as string]: blogDisplayFont.style.fontFamily,
          ["--font-body" as string]: blogBodyFont.style.fontFamily,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 sm:pt-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-chichen-navy hover:text-chichen-gold transition-colors"
          >
            {s.backToGuidesText}
          </Link>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mt-3 text-xs font-medium text-chichen-charcoal/80">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-chichen-gold transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-chichen-charcoal/40">&gt;</li>
              <li>
                <Link href="/blog" className="hover:text-chichen-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li className="text-chichen-charcoal/40">&gt;</li>
              <li className="font-semibold text-chichen-navy line-clamp-1" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Post Header */}
          <div className="mt-5">
            <span className="inline-block rounded-md bg-white border border-chichen-sand/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-chichen-gold shadow-sm">
              {post.category}
            </span>

            <h1 className="mt-3.5 font-display text-3xl font-bold leading-tight text-chichen-navy sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-chichen-charcoal/80 sm:text-base">
                {post.excerpt}
              </p>
            )}

            {/* Meta Row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-chichen-charcoal/80">
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4 text-chichen-gold" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockPayIcon className="h-4 w-4 text-chichen-gold" />
                {post.readTime}
              </span>
            </div>

            {/* Hero Cover Image */}
            <div className="relative mt-6 aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden rounded-2xl border border-chichen-sand/60 shadow-sm bg-chichen-navy">
              <SafeImage
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                priority
                quality={70}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 2-Column Main Content & Sidebar */}
          <div className="mt-10 pb-20 lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
            {/* Left Column: Article Body */}
            <div>
              {post.quickAnswer.trim() && (
                <QuickAnswer label={s.quickAnswerLabel}>{post.quickAnswer}</QuickAnswer>
              )}

              <BlogPostBody
                content={contentHtml}
                recommendedTourId={post.recommendedTourId}
                showRecommendedTour={!!post.recommendedTourAfterBlock}
              />

              {/* Bottom Article CTA Card — admin-editable per post (PostForm → "Ready to book?" callout) */}
              <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-chichen-navy p-6 text-center text-white sm:flex-row sm:text-left shadow-md border border-chichen-navy">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-chichen-gold border border-white/15 shadow-sm">
                    <TicketIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-white">
                      {post.ctaHeading}
                    </p>
                    <p className="mt-0.5 text-xs text-white/80">
                      {post.ctaBody}
                    </p>
                  </div>
                </div>

                <a
                  href={post.ctaButtonHref}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-chichen-gold px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 hover:scale-[1.02]"
                >
                  {post.ctaButtonText}
                </a>
              </div>

              <div className="mt-12">
                <RelatedPosts slug={post.slug} />
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="mt-12 lg:mt-0">
              <BlogSidebar
                slug={post.slug}
                popularPosts={popularPosts}
                toc={toc}
                tocLabel={s.tocLabel}
                relatedHeading={s.sidebarRelatedHeading}
                compareLinkText={s.sidebarCompareLinkText}
                recommendedBadge={s.sidebarRecommendedBadge}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
