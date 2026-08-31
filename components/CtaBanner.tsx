import { getHomepageContent } from "@/lib/homepage";

export default async function CtaBanner() {
  const { sections } = await getHomepageContent();
  const s = sections.ctaBanner;

  return (
    <section className="py-14 sm:py-16 bg-[#F5FAF9]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#0A3D42] px-6 py-8 sm:px-10 sm:py-10 shadow-xl shadow-black/15 border border-white/10">
          {/* Subtle gold pyramid watermarks */}
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 opacity-10">
            <svg viewBox="0 0 100 100" fill="none" stroke="#F0A93A" strokeWidth="2" className="h-full w-full">
              <path d="M10 80L50 20L90 80Z" />
              <path d="M25 60H75M35 45H65" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F0A93A] border border-white/15">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M2 20h20M5 20L12 4l7 16" />
                  <path d="M8 14h8M10 9h4" />
                </svg>
              </div>

              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {s.heading}
                </h2>
                <p className="mt-1 text-xs text-white/75">{s.subtext}</p>
              </div>
            </div>

            {/* Right Action Button */}
            <a
              href={s.buttonHref}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#F0A93A] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#0A3D42] shadow-md transition-all hover:bg-[#D9A441] hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{s.buttonText}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
