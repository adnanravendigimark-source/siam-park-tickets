import SafeImage from "./SafeImage";
import StarRating from "./StarRating";
import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";
import { LockIcon } from "./icons";

export default async function TourGrid() {
  const [toursRaw, homepage] = await Promise.all([getTours(), getHomepageContent()]);
  const s = homepage.sections.tours;
  const bookNowText = homepage.header.bookNowText || "Book Tickets";

  // Recommended Tour (admin → Recommended Tour panel): pin the chosen tour
  // first in the grid, matching the admin UI's own description of what
  // toggling this on does.
  const recommendedId = homepage.showFeaturedTour ? homepage.featuredTourId : "";
  const tours = recommendedId
    ? [...toursRaw].sort((a, b) => (a.id === recommendedId ? -1 : b.id === recommendedId ? 1 : 0))
    : toursRaw;

  return (
    <section id="tours" className="py-16 sm:py-20 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header — admin-editable (Tour Grid section) */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-chichen-gold">
            {s.eyebrow}
          </p>
          <h2 className="mt-2.5 font-display text-3xl sm:text-[2.25rem] font-bold text-chichen-navy tracking-tight">
            {s.heading}
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-stone-900/80">
            {s.subheading}
          </p>
        </div>

        {/* Ticket Cards Grid — one card per tour from the admin Tours list */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tours.map((tour) => {
            const isRecommended = !!recommendedId && tour.id === recommendedId;
            return (
              <div
                key={tour.id}
                className={`group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 ${
                  isRecommended || tour.featured
                    ? "border-2 border-chichen-gold shadow-lg shadow-chichen-gold/10 relative ring-1 ring-chichen-gold/20"
                    : "border border-stone-200 shadow-sm hover:shadow-lg hover:border-chichen-gold/40"
                }`}
              >
                {/* Card Image & Overlay Badges */}
                <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-chichen-navy">
                  <SafeImage
                    src={tour.image}
                    alt={tour.imageAlt}
                    fill
                    quality={70}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Ribbon Badge — Recommended Tour badge takes priority over the
                      tour's own ribbon text when this is the admin-picked tour */}
                  {(isRecommended || tour.ribbon) && (
                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-md bg-chichen-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                      <span>👑</span>
                      <span>{isRecommended ? (homepage.featuredBadgeLabel || "Recommended") : tour.ribbon}</span>
                    </div>
                  )}

                  {/* Rating Badge Floating Bottom Left */}
                  <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1 rounded-md bg-white/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-chichen-navy shadow-sm">
                    <StarRating rating={tour.rating} showValue reviewCount={tour.reviews} size="xs" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Title */}
                  <h3 className="font-display text-[15px] sm:text-base font-bold text-chichen-navy leading-snug group-hover:text-chichen-gold transition-colors line-clamp-2 min-h-[44px]">
                    <a href={tour.href} target="_blank" rel="noopener nofollow sponsored">
                      {tour.title}
                    </a>
                  </h3>

                  {/* Snippet Description — admin-entered rich text (bold/links/lists) */}
                  <div
                    className="rich-content mt-1.5 line-clamp-2 min-h-[2rem] text-xs text-stone-900/80 leading-relaxed [&>p]:m-0 [&>p]:line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: tour.description }}
                  />

                  {/* Feature Tags — first 3 admin "Includes" items, boxed */}
                  {tour.includes.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {tour.includes.slice(0, 3).map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 rounded-md bg-stone-50 px-2.5 py-1.5 text-[11.5px] text-stone-900 border border-stone-100"
                        >
                          <span className="mt-0.5 text-chichen-navy font-bold shrink-0">✓</span>
                          <span className="leading-tight font-medium line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Duration — admin → Tours & Tickets → "Duration" field */}
                  {tour.duration && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-900/70">
                      <span>⏱</span>
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                  )}

                  {/* Bottom Row: Price & CTA */}
                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between pt-3.5 border-t border-stone-100">
                      <div>
                        <span className="block text-[9.5px] font-bold uppercase tracking-wider text-stone-900/70">
                          FROM
                        </span>
                        <div className="flex items-baseline gap-1">
                          {tour.originalPrice && (
                            <span className="text-xs text-stone-900/35 line-through">€{tour.originalPrice}</span>
                          )}
                          <span className="font-display text-xl sm:text-2xl font-bold text-chichen-navy">
                            €{tour.price}
                          </span>
                          <span className="text-[11px] text-stone-900/70">/person</span>
                        </div>
                      </div>

                      <a
                        href={tour.href}
                        target="_blank"
                        rel="noopener nofollow sponsored"
                        className="inline-flex items-center justify-center rounded-lg bg-chichen-navy px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-chichen-navy/90 hover:shadow-md"
                      >
                        {bookNowText}
                      </a>
                    </div>
                    {isRecommended && homepage.featuredUrgencyText && (
                      <p className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-chichen-gold">
                        <LockIcon className="h-3 w-3" /> {homepage.featuredUrgencyText}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
