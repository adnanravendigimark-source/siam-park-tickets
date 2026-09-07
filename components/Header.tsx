import Logo from "./Logo";
import MobileNav from "./MobileNav";
import HeaderNav from "./HeaderNav";
import StickyHeader from "./StickyHeader";
import { getHomepageContent } from "@/lib/homepage";

export default async function Header() {
  const content = await getHomepageContent();
  const header = content.header;
  // Admin-editable (Homepage → Content → Navbar → "Nav links"). Falls back
  // to a sane default set only if the admin has never saved any (e.g. a
  // fresh DB row before the first save), so the header is never empty.
  const navLinks = header.navLinks?.length
    ? header.navLinks
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ];
  const ctaText = header.ctaText || header.bookNowText || "BOOK TICKETS";
  const rawCtaHref = header.ctaHref || "#tours";
  const ctaHref = rawCtaHref.startsWith("#") ? `/${rawCtaHref}` : rawCtaHref;

  return (
    <StickyHeader>
      <div className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Logo
          logoImage={header.logoImage}
          logoAlt={header.logoAlt || "Siam Park Tickets"}
          line1={header.logoLine1 || "SIAM PARK"}
          line2={header.logoLine2 || "— TICKETS —"}
        />

        <HeaderNav links={navLinks} />

        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            className="hidden items-center gap-2 rounded-xl bg-[#F15A24] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#F15A24]/25 transition-all duration-300 hover:bg-[#D94612] hover:shadow-lg hover:-translate-y-0.5 md:inline-flex"
          >
            {/* Ticket Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-white/90"
            >
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M9 6v12M15 6v12" strokeDasharray="2 2" />
            </svg>
            <span>{ctaText.toUpperCase()}</span>
          </a>
          <MobileNav navLinks={navLinks} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </StickyHeader>
  );
}

