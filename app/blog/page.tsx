import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import BlogIndexContainer from "@/components/BlogIndexContainer";
import { getPosts } from "@/lib/posts";
import { getBlogSeoSettings } from "@/lib/settings";
import { getHomepageContent } from "@/lib/homepage";
import { resolveRobots, resolveCanonical, resolveOg, buildBreadcrumbJsonLd } from "@/lib/seo";

// Posts live in /data/posts.json (or Postgres once configured), editable
// from /admin/posts — render dynamically so new/edited posts show up
// without a rebuild.
export const dynamic = "force-dynamic";

// Every field below comes from the Blog listing page's admin-editable SEO
// settings (lib/settings.ts, edited at /admin/pages) — nothing is hardcoded.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSeoSettings();
  const og = resolveOg(settings, { title: settings.metaTitle, description: settings.metaDescription });
  return {
    title: settings.metaTitle,
    description: settings.metaDescription,
    alternates: { canonical: resolveCanonical("/blog", settings.canonicalUrl) },
    robots: resolveRobots(settings.noIndex, settings.noFollow),
    openGraph: { title: og.title, description: og.description, url: "/blog", type: "website", images: og.image ? [{ url: og.image }] : undefined },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function BlogIndexPage() {
  const [posts, { sections, heroImage, heroImageAlt }] = await Promise.all([getPosts(), getHomepageContent()]);
  const s = sections.blogPage;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Blog Hero Banner — matching the About page's light hero */}
        <section className="relative overflow-hidden bg-white border-b border-chichen-sand/40">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <SafeImage
              src={heroImage}
              alt={heroImageAlt || "Wave Palace at Siam Park under golden hour light"}
              fill
              priority
              quality={75}
              sizes="100vw"
              className="object-cover object-[80%_center] md:object-[78%_center] lg:object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 via-45% md:from-white/90 md:via-white/60 md:via-50% lg:via-52% to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-2xl">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="text-xs font-medium text-chichen-charcoal/70">
                <ol className="flex items-center gap-1.5">
                  <li>
                    <Link href="/" className="hover:text-chichen-gold transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-chichen-charcoal/40">&gt;</li>
                  <li className="font-semibold text-chichen-navy" aria-current="page">
                    Blog &amp; Guides
                  </li>
                </ol>
              </nav>

              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-chichen-gold">
                {s.eyebrow}
              </span>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-chichen-navy sm:text-4xl lg:text-5xl">
                {s.heading}
              </h1>

              {/* Gold accent line */}
              <div className="mt-3.5 mb-4 h-[2.5px] w-12 rounded-full bg-chichen-gold" />

              <p className="mt-2 text-xs leading-relaxed text-chichen-charcoal/85 sm:text-sm">
                {s.subheading}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <BlogIndexContainer
          posts={posts}
          emptyStateText={s.emptyStateText}
          ctaHeading={s.ctaHeading}
          ctaBody="Best tour prices, instant confirmation, and free cancellation on most tickets."
          ctaButtonText={s.ctaButtonText}
        />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
