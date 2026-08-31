import { getHomepageContent } from "@/lib/homepage";

// Content editable from /admin/homepage → Content tab (see
// lib/homepage.ts's WhySection / DEFAULT_SECTIONS.why).
export default async function WhatYouSee() {
  const { sections } = await getHomepageContent();
  const s = sections.why;

  return (
    <section id="what-to-expect" className="py-20 sm:py-24 bg-white border-t border-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-chichen-gold">
            {s.eyebrow}
          </p>
          <h2 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-chichen-navy leading-[1.2] tracking-tight">
            {s.heading}
          </h2>
          <div className="mt-3.5 mb-1 h-[2.5px] w-10 rounded-full bg-chichen-gold" />
          <div
            className="rich-content mt-3 text-xs sm:text-[13.5px] text-stone-900/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: s.intro }}
          />
        </div>

        {/* Sample tour timeline + what-you'll-notice list — admin-editable */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-7 shadow-sm">
            <h3 className="font-display text-lg sm:text-xl font-bold text-chichen-navy">{s.timelineHeading}</h3>
            <ol className="mt-6 space-y-6 border-l-2 border-chichen-gold/40 pl-6">
              {s.timeline.map((row, i) => (
                <li key={row.time + i} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-chichen-gold ring-4 ring-chichen-gold/20" />
                  <span className="text-xs font-bold uppercase tracking-wider text-chichen-gold">{row.time}</span>
                  <p className="mt-1 text-sm font-semibold text-chichen-navy">{row.step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-7 shadow-sm">
            <h3 className="font-display text-lg sm:text-xl font-bold text-chichen-navy">{s.learnHeading}</h3>
            <ul className="mt-5 space-y-3">
              {s.learn.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3.5 text-sm text-stone-900/80"
                >
                  <span className="font-bold text-chichen-gold">◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {s.note && <p className="mt-4 text-xs text-stone-900/60">{s.note}</p>}
          </div>
        </div>

        {/* Optional 3rd list — boarding points / good-to-know facts */}
        {s.extraItems.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display text-lg sm:text-xl font-bold text-chichen-navy">{s.extraHeading}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {s.extraItems.map((point, i) => (
                <div
                  key={point.name + i}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-chichen-gold"
                >
                  <p className="text-sm font-bold text-chichen-gold">{point.name}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-900/80">{point.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA banner */}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-chichen-navy p-8 text-white shadow-xl border border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base sm:text-lg font-bold text-white max-w-xl">{s.ctaText}</p>
          <a
            href={s.ctaHref}
            className="shrink-0 rounded-lg bg-chichen-gold px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 hover:scale-[1.02]"
          >
            {s.ctaButtonText}
          </a>
        </div>
      </div>
    </section>
  );
}
