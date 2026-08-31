import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

export default async function TopRides() {
  const { sections } = await getHomepageContent();
  const s = sections.topRides;

  return (
    <section id="top-rides" className="bg-white py-20 sm:py-24 border-y border-stone-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 border border-stone-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-maya-gold">
            <span>🌊</span> {s.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-maya-emerald leading-[1.2] tracking-tight">
            {s.heading}
          </h2>
          <div
            className="rich-content mt-4 text-sm text-stone-900/85 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: s.body }}
          />
          <ul className="mt-6 space-y-3.5 text-xs sm:text-sm font-medium text-stone-900">
            {s.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maya-emerald text-white text-[10px] font-bold">
                  ✓
                </span>
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
          <a
            href={s.ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-maya-emerald px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-maya-emerald/90 hover:shadow-md"
          >
            {s.ctaButtonText} →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {s.images.map((img, i) => (
            <div
              key={img.label + i}
              className="group relative h-36 overflow-hidden rounded-2xl border border-stone-200 shadow-md sm:h-44 bg-maya-emerald"
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                fill
                quality={75}
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white drop-shadow">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
