"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/homepage";

export default function MobileNav({
  navLinks,
  ctaText,
  ctaHref,
}: {
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#07575B]/20 bg-white text-[#07575B] transition hover:bg-[#E3F5F3]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8}>
          {open ? (
            <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" strokeLinecap="round" />
          ) : (
            <path d="M4 6.5h16M4 12h16M4 17.5h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="absolute inset-x-0 top-full z-40 h-screen bg-[#102A43]/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-full z-40 max-h-[80vh] overflow-y-auto border-b border-[#07575B]/10 bg-white shadow-2xl">
            <nav className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[#102A43]/10 py-3.5 text-base font-semibold text-[#102A43] transition hover:text-[#F15A24] last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-4 pb-5 pt-2">
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-[#F15A24] py-3 text-center text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-[#F15A24]/20 transition hover:bg-[#D94612]"
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
