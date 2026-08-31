import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getAboutPage } from "@/lib/about";
import { resolveRobots, resolveCanonical, resolveOg, buildBreadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

// Every field below (title, description, canonical, indexing, follow, OG)
// comes from the admin-editable About page content (lib/about.ts) —
// nothing here is hardcoded. See /admin/about.
export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const og = resolveOg(
    { ogTitle: about.ogTitle, ogDescription: about.ogDescription, ogImage: about.ogImage },
    { title: about.metaTitle, description: about.metaDescription, image: about.heroImage }
  );
  return {
    title: about.metaTitle,
    description: about.metaDescription,
    alternates: { canonical: resolveCanonical("/about", about.canonicalUrl) },
    robots: resolveRobots(about.noIndex, about.noFollow),
    openGraph: {
      title: og.title,
      description: og.description,
      url: "/about",
      images: og.image ? [{ url: og.image, alt: about.heroImageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function AboutPage() {
  const about = await getAboutPage();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero banner — light background with the hero photo bled in from
            the right and a soft gradient wash (left-aligned copy, image
            never fully hides the text at any breakpoint). */}
        <section className="relative overflow-hidden bg-white border-b border-chichen-sand/40">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <SafeImage
              src={about.heroImage}
              alt={about.heroImageAlt}
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
              <nav aria-label="Breadcrumb" className="text-xs font-medium text-chichen-charcoal/70">
                <ol className="flex items-center gap-1.5">
                  <li>
                    <Link href="/" className="hover:text-chichen-gold transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-chichen-charcoal/40">&gt;</li>
                  <li className="font-semibold text-chichen-navy" aria-current="page">
                    About Us
                  </li>
                </ol>
              </nav>

              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-chichen-gold">
                {about.heroEyebrow}
              </span>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-chichen-navy sm:text-4xl lg:text-5xl">
                {about.heroHeading}
              </h1>

              {/* Gold accent line */}
              <div className="mt-3.5 mb-4 h-[2.5px] w-12 rounded-full bg-chichen-gold" />

              <div
                className="rich-content mt-3 text-xs leading-relaxed text-chichen-charcoal/85 sm:text-sm"
                dangerouslySetInnerHTML={{ __html: about.heroSubheading }}
              />
            </div>
          </div>
        </section>

        {/* Page body — one flowing rich-text article, written and edited
            just like a blog post (see lib/about.ts's `content` field). */}
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <div
            className="rich-content text-sm sm:text-[15px] leading-relaxed text-chichen-charcoal/85"
            dangerouslySetInnerHTML={{ __html: about.content }}
          />
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
