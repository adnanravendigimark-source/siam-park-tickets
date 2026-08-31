"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/data";

// True accordion: opening one question closes whichever one was previously
// open, instead of independent <details> elements where several could be
// open (and stacking the page) at once.
export default function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-10 space-y-3">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div
            key={f.question}
            className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
              open ? "border-chichen-gold shadow-md" : "border-stone-200 hover:border-stone-300"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full cursor-pointer list-none items-center justify-between gap-3 p-5 text-left font-semibold text-chichen-navy sm:p-5.5"
            >
              <span className="font-display text-[14.5px] sm:text-base font-bold pr-3">{f.question}</span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-200 text-xs transition ${
                  open ? "rotate-45 bg-chichen-navy text-white" : "bg-stone-50 text-chichen-navy"
                }`}
              >
                +
              </span>
            </button>
            {open && (
              <div
                className="rich-content border-t border-stone-100 px-5 pb-5 pt-3 text-xs sm:text-[13px] leading-relaxed text-stone-900/80 sm:px-5.5"
                dangerouslySetInnerHTML={{ __html: f.answer }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
