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

  const heroSection = content.sections?.hero || {
    tagline: "Feel the Thrill. Live the Adventure.",
    badge1Line1: "Best Price",
    badge1Line2: "Guarantee",
    badge2Line1: "Instant",
    badge2Line2: "E-Tickets",
    badge3Line1: "Skip the Line",
    badge3Line2: "Entry",
    badge4Line1: "24/7 Customer",
    badge4Line2: "Support",
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between bg-white overflow-hidden pt-20 sm:pt-24 pb-0">
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
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 pt-8 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 flex-1 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#3D8B40] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C11.5 2 11 3 11 4.5C11 6 10 7 9 7C7 7 4 8 3 11C2.5 12.5 3 13 4 13C5.5 13 8 11.5 9 10C8.5 11.5 8 13.5 9 15C9.5 15.8 10.5 16 11 16V22H13V15.5C14 15.5 15.5 14.5 16 13C16.5 11.5 16 9.5 15 8C16 8.5 18 10 19.5 10C20.5 10 21.5 9.5 21 8C20 5 17 4 15 4C14 4 13 3 13 2C13 2 12.5 2 12 2Z" />
            </svg>
            <p className="text-xs sm:text-[13px] font-extrabold tracking-[0.18em] uppercase text-[#F15A24]">
              {eyebrowBadge}
            </p>
          </div>

          {/* Main Headline */}
          <div className="mt-2 sm:mt-3">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold leading-[1.02] tracking-tight text-[#102A43]">
              {mainHeading}
            </h1>
            <p className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-normal text-[#F15A24] leading-[0.95] -mt-1 sm:-mt-2">
              Tickets
            </p>
          </div>

          {/* Subtitle Line */}
          <p className="mt-3.5 sm:mt-4 text-xl sm:text-2xl font-bold text-[#102A43]">
            {heroSection.tagline || "Feel the Thrill. Live the Adventure."}
          </p>

          {/* Subtitle / Description */}
          <p className="mt-2 text-base sm:text-lg text-[#102A43]/80 font-medium leading-relaxed max-w-xl">
            {content.heroSubheading
              ? content.heroSubheading.replace(/<[^>]+>/g, " ")
              : "Book your Siam Park tickets online and enjoy a full day of unforgettable fun at Tenerife's award-winning water park."}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href={content.heroCtaPrimaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#F15A24] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#F15A24]/25 transition-all duration-300 hover:bg-[#D94612] hover:shadow-xl hover:-translate-y-0.5"
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
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#07575B] bg-white/80 sm:bg-white/60 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#07575B] backdrop-blur-sm transition-all duration-300 hover:bg-[#07575B] hover:text-white hover:-translate-y-0.5"
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
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm font-bold text-[#102A43]">
            {/* 1. Best Price Guarantee */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#F15A24] bg-[#F15A24]/10 text-[#F15A24]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">{heroSection.badge1Line1 || "Best Price"}</span>
                <span className="block text-[11px] sm:text-xs text-[#102A43]/70 font-medium">{heroSection.badge1Line2 || "Guarantee"}</span>
              </div>
            </div>

            {/* 2. Instant E-Tickets */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#08A6A6] bg-[#08A6A6]/10 text-[#08A6A6]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">{heroSection.badge2Line1 || "Instant"}</span>
                <span className="block text-[11px] sm:text-xs text-[#102A43]/70 font-medium">{heroSection.badge2Line2 || "E-Tickets"}</span>
              </div>
            </div>

            {/* 3. Skip the Line Entry */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#07575B] bg-[#07575B]/10 text-[#07575B]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">{heroSection.badge3Line1 || "Skip the Line"}</span>
                <span className="block text-[11px] sm:text-xs text-[#102A43]/70 font-medium">{heroSection.badge3Line2 || "Entry"}</span>
              </div>
            </div>

            {/* 4. 24/7 Customer Support */}
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#3D8B40] bg-[#3D8B40]/10 text-[#3D8B40]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </span>
              <div className="leading-tight">
                <span className="block font-bold">{heroSection.badge4Line1 || "24/7 Customer"}</span>
                <span className="block text-[11px] sm:text-xs text-[#102A43]/70 font-medium">{heroSection.badge4Line2 || "Support"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle organic wave SVG divider at bottom */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none -mt-6">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 text-white fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}


