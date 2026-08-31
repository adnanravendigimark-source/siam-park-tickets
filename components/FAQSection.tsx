import { getFaqs } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";
import FaqAccordion from "./FaqAccordion";

// FAQPage structured data — makes these eligible for rich results /
// "People also ask" boxes. Add/edit questions from /admin/faqs. The answer
// is admin-entered rich text (bold, links, lists) — structured data needs
// plain text, so HTML tags are stripped for the JSON-LD copy while the
// accordion below renders the real formatted markup.
export default async function FAQSection() {
  const [faqs, { sections }] = await Promise.all([getFaqs(), getHomepageContent()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-chichen-gold">
            {sections.faq.eyebrow}
          </p>
          <h2 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-chichen-navy tracking-tight">
            {sections.faq.heading}
          </h2>
        </div>

        <FaqAccordion faqs={faqs} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
