import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";

// Built directly from the tours sold above — every row is a real, bookable
// product with its own "Book" link, so this table works as a second
// conversion surface rather than just reference info. Heading/subheading/
// note are editable from /admin/homepage → Content tab (see
// lib/homepage.ts's PriceSection / DEFAULT_SECTIONS.price).
export default async function PriceComparison() {
  const [tours, { sections }] = await Promise.all([getTours(), getHomepageContent()]);
  const s = sections.price;

  return (
    <section id="prices" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-24">
      <div className="max-w-2xl">
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-chichen-gold">
          {s.eyebrow}
        </span>
        <h2 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-chichen-navy leading-[1.2] tracking-tight">
          {s.heading}
        </h2>
        <div
          className="rich-content mt-3 text-xs sm:text-sm text-stone-900/80 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: s.subheading }}
        />
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-chichen-navy text-white">
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-wider">{s.itemLabel}</th>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-wider">{s.priceLabel}</th>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-wider">{s.column1Label}</th>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-wider">{s.column2Label}</th>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-wider">{s.bestForLabel}</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {tours.map((tour, i) => (
              <tr
                key={tour.id}
                className={`transition hover:bg-stone-50 ${
                  tour.featured ? "bg-amber-50/40 font-medium" : i % 2 ? "bg-stone-50/50" : ""
                }`}
              >
                <td className="px-6 py-4 font-semibold text-chichen-navy">{tour.title}</td>
                <td className="px-6 py-4 font-bold text-chichen-gold">
                  €{tour.price} <span className="font-normal text-xs text-stone-900/60">/ person</span>
                </td>
                <td className="px-6 py-4 text-stone-900/80">{tour.priceTableColumn1 || tour.duration}</td>
                <td className="px-6 py-4 text-stone-900/80">{tour.priceTableFeature || "No"}</td>
                <td className="px-6 py-4 text-stone-900/80">{tour.bestFor}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={tour.href}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                    className="inline-flex rounded-lg bg-chichen-navy px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-chichen-navy/90"
                  >
                    {s.bookLabel}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {s.note && <p className="mt-3.5 text-xs text-stone-900/60">{s.note}</p>}
    </section>
  );
}
