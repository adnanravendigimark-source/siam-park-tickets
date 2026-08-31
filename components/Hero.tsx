import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

export default async function Hero() {
  const content = await getHomepageContent();
  const heroImageSrc = content.heroImage || "https://images.unsplash.com/photo-1642717841683-c0323214617c?q=80&w=2400&auto=format&fit=crop";

  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center bg-[#F5FAF9] overflow-hidden">
      {/* Full-bleed Panoramic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SafeImage
          src={heroImageSrc}
          alt={content.heroImageAlt || "Guests riding Wave Palace, the world's largest artificial wave, at Siam Park Tenerife"}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[80%_center] md:object-[78%_center] lg:object-right"
        />
        {/* Atmospheric gradient overlay matching the site's Sea Foam Ivory background tone, ensuring seamless flow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5FAF9]/95 via-[#F5FAF9]/80 via-50% to-transparent sm:bg-gradient-to-r sm:from-[#F5FAF9]/95 sm:via-[#F5FAF9]/75 sm:via-42% md:from-[#F5FAF9]/90 md:via-[#F5FAF9]/50 md:via-48% lg:via-50% md:to-transparent" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-28 flex-1 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow in Sun Gold */}
          <p className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#F0A93A]">
            {content.heroBadge || "TENERIFE'S #1 WATER PARK EXPERIENCE"}
          </p>

          {/* Main Headline */}
          <h1 className="mt-2.5 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight text-[#0A3D42]">
            {content.heroHeading || "Siam Park Tickets"}
          </h1>

          {/* Cursive / Calligraphy Script Subtitle */}
          <p className="mt-1 font-script text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F0A93A] leading-tight">
            Splash. Slide. Be Amazed.
          </p>

          {/* Subtitle / Description */}
          <p className="mt-3.5 text-base sm:text-lg lg:text-[19px] text-[#0A2E33] font-semibold leading-relaxed max-w-xl">
            {content.heroSubheading
              ? content.heroSubheading.replace(/<[^>]+>/g, " ")
              : "Book your ticket to Siam Park — the world's best water park — with instant mobile confirmation and free cancellation up to 24 hours before your visit."}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href={content.heroCtaPrimaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A3D42] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-[#0E7C86] hover:shadow-md hover:-translate-y-0.5"
            >
              <span>{content.heroCtaPrimaryText || "EXPLORE TICKETS"}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href={content.heroCtaSecondaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0A3D42] bg-white/40 md:bg-transparent px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A3D42] backdrop-blur-sm transition-all duration-300 hover:bg-[#0A3D42] hover:text-white hover:-translate-y-0.5"
            >
              <span>{content.heroCtaSecondaryText || "VIEW ALL TICKETS"}</span>
            </a>
          </div>

          {/* Trust Badges Row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-xs sm:text-sm font-semibold text-[#0A3D42]">
            {/* Free Cancellation */}
            <div className="inline-flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D42] text-white">
                <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5 stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                </svg>
              </span>
              <span>Free Cancellation</span>
            </div>

            {/* Best Price Guarantee */}
            <div className="inline-flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F0A93A] text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span>Best Price Guarantee</span>
            </div>

            {/* Instant Confirmation */}
            <div className="inline-flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D42] text-white">
                <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5 stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                </svg>
              </span>
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
