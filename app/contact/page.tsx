import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MailIcon } from "@/components/icons";
import { getContactPage } from "@/lib/contact";
import { getIconComponent } from "@/lib/iconMap";
import { resolveRobots, resolveCanonical, resolveOg } from "@/lib/seo";

export const dynamic = "force-dynamic";

// Every field below (title, description, canonical, indexing, follow, OG)
// comes from the admin-editable Contact page content (lib/contact.ts) —
// nothing here is hardcoded. See /admin/contact.
export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage();
  const og = resolveOg(
    { ogTitle: contact.ogTitle, ogDescription: contact.ogDescription, ogImage: contact.ogImage },
    { title: contact.metaTitle, description: contact.metaDescription }
  );
  return {
    title: contact.metaTitle,
    description: contact.metaDescription,
    alternates: { canonical: resolveCanonical("/contact", contact.canonicalUrl) },
    robots: resolveRobots(contact.noIndex, contact.noFollow),
    openGraph: { title: og.title, description: og.description, url: "/contact", images: og.image ? [{ url: og.image }] : undefined },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function ContactPage() {
  const contact = await getContactPage();

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block rounded-lg bg-[#E3F5F3] border border-[#07575B]/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F15A24] shadow-sm">
              {contact.heroEyebrow}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-[#102A43] sm:text-4xl">
              {contact.heroHeading}
            </h1>
            <div
              className="rich-content mx-auto mt-3 max-w-md text-[#102A43]/80 leading-relaxed text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: contact.heroSubheading }}
            />
          </div>

          {/* Primary email card */}
          <div className="mt-10 flex flex-col items-center gap-3.5 rounded-2xl border border-[#07575B]/15 bg-[#E3F5F3]/50 p-8 sm:p-10 text-center shadow-sm">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07575B] text-white shadow-md">
              <MailIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#102A43]/70">{contact.emailLabel}</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 block break-all font-display text-2xl sm:text-3xl font-bold text-[#07575B] hover:text-[#F15A24] transition-colors"
              >
                {contact.email}
              </a>
            </div>
            <p className="text-xs text-[#102A43]/70 max-w-sm">{contact.emailNote}</p>
          </div>

          {/* What we can help with */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {contact.reasons.map(({ icon, title, body }) => {
              const Icon = getIconComponent(icon);
              return (
                <div key={title} className="rounded-2xl border border-[#07575B]/15 bg-white p-6 shadow-sm text-center sm:text-left transition-all hover:shadow-md hover:border-[#08A6A6]/50 hover:-translate-y-0.5">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3F5F3] border border-[#07575B]/10 text-[#07575B] sm:mx-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-[#102A43]">{title}</p>
                  <div
                    className="rich-content mt-1.5 text-xs text-[#102A43]/75 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="rich-content mt-10 border-t border-[#07575B]/10 pt-8 text-center text-xs sm:text-sm text-[#102A43]/70"
            dangerouslySetInnerHTML={{ __html: contact.footerNote }}
          />

          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-[#07575B] p-8 text-center text-white shadow-xl border border-white/10">
            <p className="text-lg font-bold text-white">{contact.ctaHeading}</p>
            <a
              href="/#tours"
              className="rounded-xl bg-[#F15A24] px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#F15A24]/25 transition-all duration-300 hover:bg-[#D94612] hover:scale-105"
            >
              {contact.ctaButtonLabel} →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
