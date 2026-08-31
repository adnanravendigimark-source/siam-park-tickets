import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

export default async function Hero() {
  const content = await getHomepageContent();
  const heroImageSrc = content.heroImage && content.heroImage.startsWith("/")
    ? content.heroImage
    : "/images/siam-park-hero.jpg";

  // Clean heading so "Tickets" is exclusively the script line underneath
  const rawHeading = content.heroHeading || "Siam Park";
  const mainHeading = rawHeading.replace(/\s+tickets$/i, "");
  const eyebrowBadge = content.heroBadge === "TENERIFE'S #1 WATER PARK EXPERIENCE" || !content.heroBadge
    ? "THE WORLD'S BEST WATER PARK"
    : content.heroBadge;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between bg-[#F5FAF9] overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6">
      {/* Full-bleed Panoramic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SafeImage
          src={heroImageSrc}
          alt={content.heroImageAlt || "Siam Park water slide and family enjoying inflatable raft"}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-[82%_center] lg:object-right"
        />
        {/* Crisp left-fade gradient ensuring 100% typography legibility while keeping the thrilling scene fully visible on right */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-transparent sm:bg-gradient-to-r sm:from-white/95 sm:via-white/85 sm:via-42% md:from-white/95 md:via-white/60 md:via-48% lg:via-52% md:to-transparent" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 pt-4 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#16A34A] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C11.5 2 11 3 11 4.5C11 6 10 7 9 7C7 7 4 8 3 11C2.5 12.5 3 13 4 13C5.5 13 8 11.5 9 10C8.5 11.5 8 13.5 9 15C9.5 15.8 10.5 16 11 16V22H13V15.5C14 15.5 15.5 14.5 16 13C16.5 11.5 16 9.5 15 8C16 8.5 18 10 19.5 10C20.5 10 21.5 9.5 21 8C20 5 17 4 15 4C14 4 13 3 13 2C13 2 12.5 2 12 2Z" />
            </svg>
            <p className="text-xs sm:text-[13px] font-extrabold tracking-[0.18em] uppercase text-[#E25327]">
              {eyebrowBadge}
            </p>
          </div>

          {/* Main Headline */}
          <div className="mt-2 sm:mt-3">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold leading-[1.02] tracking-tight text-[#082B38]">
              {mainHeading}
            </h1>
            <p className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-normal text-[#E25327] leading-[0.95] -mt-1 sm:-mt-2">
              Tickets
            </p>
          </div>

          {/* Subtitle Line */}
          <p className="mt-3.5 sm:mt-4 text-xl sm:text-2xl font-bold text-[#082B38]">
            Feel the Thrill. Live the Adventure.
          </p>

          {/* Subtitle / Description */}
          <p className="mt-2 text-base sm:text-lg text-[#2C4854] font-medium leading-relaxed max-w-xl">
            {content.heroSubheading
              ? content.heroSubheading.replace(/<[^>]+>/g, " ")
              : "Book your Siam Park tickets online and enjoy a full day of unforgettable fun at Tenerife's award-winning water park."}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href={content.heroCtaPrimaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#EB5A28] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#EB5A28]/25 transition-all duration-300 hover:bg-[#D94917] hover:shadow-xl hover:-translate-y-0.5"
            >
              {/* Ticket icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M9 6v12M15 6v12" strokeDasharray="2 2" />
              </svg>
              <span>{content.heroCtaPrimaryText || "BOOK TICKETS NOW"}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href={content.heroCtaSecondaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#082B38] bg-white/80 sm:bg-white/60 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#082B38] backdrop-blur-sm transition-all duration-300 hover:bg-[#082B38] hover:text-white hover:-translate-y-0.5"
            >
              {/* Calendar / Options icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{content.heroCtaSecondaryText || "VIEW PRICES & OPTIONS"}</span>
            </a>
          </div>

          {/* 4 Trust Badges Row */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm font-bold text-[#082B38]">
            {/* 1. Best Price Guarantee */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#EB5A28] bg-[#EB5A28]/10 text-[#EB5A28]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">Best Price</span>
                <span className="block text-[11px] sm:text-xs text-[#2C4854] font-medium">Guarantee</span>
              </div>
            </div>

            {/* 2. Instant E-Tickets */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#0284C7] bg-[#0284C7]/10 text-[#0284C7]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">Instant</span>
                <span className="block text-[11px] sm:text-xs text-[#2C4854] font-medium">E-Tickets</span>
              </div>
            </div>

            {/* 3. Skip the Line Entry */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#0E7C86] bg-[#0E7C86]/10 text-[#0E7C86]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">Skip the Line</span>
                <span className="block text-[11px] sm:text-xs text-[#2C4854] font-medium">Entry</span>
              </div>
            </div>

            {/* 4. 24/7 Customer Support */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">24/7 Customer</span>
                <span className="block text-[11px] sm:text-xs text-[#2C4854] font-medium">Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 4-Pillar Feature Bar */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-8 mt-6 sm:mt-10">
        <div className="rounded-2xl sm:rounded-3xl bg-[#063339]/95 backdrop-blur-md px-6 sm:px-8 py-6 sm:py-7 shadow-2xl border border-teal-800/40 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Pillar 1 */}
            <div className="flex items-center gap-4 pt-4 first:pt-0 lg:pt-0 lg:px-4 lg:first:pl-0">
              <div className="text-[#F0A93A] shrink-0">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 16.1l-4.8 2.5.9-5.3-3.8-3.7 5.3-.8z" fill="currentColor" fillOpacity="0.2" />
                  <path d="M7 21a6 6 0 0 1-4-5.2c0-3.3 2-6 5-7.8" />
                  <path d="M17 21a6 6 0 0 0 4-5.2c0-3.3-2-6-5-7.8" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  VOTED WORLD&apos;S BEST WATER PARK
                </h4>
                <p className="text-xs text-teal-100/70 mt-0.5">
                  by TripAdvisor Travelers&apos; Choice
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4">
              <div className="text-[#38BDF8] shrink-0">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  AMAZING ATTRACTIONS
                </h4>
                <p className="text-xs text-teal-100/70 mt-0.5">
                  Slides, wave pool, lazy river &amp; more
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4">
              <div className="text-[#4ADE80] shrink-0">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h11z" />
                  <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-9" />
                  <path d="M5.8 13A5.84 5.84 0 0 1 5 10c0-3.04 2.24-5.5 5-5.5" />
                  <path d="M12 10.5V22" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  FOR ALL AGES
                </h4>
                <p className="text-xs text-teal-100/70 mt-0.5">
                  Fun for families, friends &amp; adventure seekers
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 lg:last:pr-0">
              <div className="text-[#FB923C] shrink-0">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  TENERIFE SOUTH, SPAIN
                </h4>
                <p className="text-xs text-teal-100/70 mt-0.5">
                  Perfect weather, all year round
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle organic wave SVG divider at bottom */}
      <div className="relative w-full overflow-hidden leading-none mt-4 sm:mt-6 -mb-6 sm:-mb-8 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 text-[#F5FAF9] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}

