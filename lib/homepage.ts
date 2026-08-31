import { sql } from "./db";

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface TimelineRow {
  time: string;
  step: string;
}

export interface HoursRow {
  range: string;
  time: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface TourSection {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface WhySection {
  eyebrow: string;
  heading: string;
  intro: string;
  timelineHeading: string;
  timeline: TimelineRow[];
  learnHeading: string;
  learn: string[];
  note: string;
  extraHeading: string;
  extraItems: { name: string; note: string }[];
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
}

export interface HighlightCard {
  icon: string;
  title: string;
  body: string;
}

export interface HighlightsSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  cards: HighlightCard[];
}

export interface TopRidesSection {
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  ctaButtonText: string;
  ctaHref: string;
  images: GalleryImage[];
}

export interface PracticalSection {
  hoursHeading: string;
  hours: HoursRow[];
  hoursNote: string;
  addressHeading: string;
  address: string;
  metro: string;
  bestTimeHeading: string;
  bestTimeBody: string;
}

export interface PriceSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  note: string;
  itemLabel: string;
  priceLabel: string;
  column1Label: string;
  column2Label: string;
  bestForLabel: string;
  bookLabel: string;
}

export interface FaqSection {
  eyebrow: string;
  heading: string;
}

export interface NotFoundSection {
  heading: string;
  body: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export interface BlogTeaserSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  viewAllText: string;
  readArticleText: string;
}

export interface BlogPageSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  emptyStateText: string;
  featuredLinkText: string;
  ctaHeading: string;
  ctaButtonText: string;
  backToGuidesText: string;
  quickAnswerLabel: string;
  tocLabel: string;
  relatedGuidesHeading: string;
  sidebarRelatedHeading: string;
  sidebarRecommendedBadge: string;
  sidebarCompareLinkText: string;
  promoRecommendedText: string;
}

export interface HeroSection {
  tagline: string;
  badge1Line1: string;
  badge1Line2: string;
  badge2Line1: string;
  badge2Line2: string;
  badge3Line1: string;
  badge3Line2: string;
  badge4Line1: string;
  badge4Line2: string;
}

export interface CtaBannerSection {
  heading: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
}

export interface HomepageSections {
  hero: HeroSection;
  tours: TourSection;
  highlights: HighlightsSection;
  why: WhySection;
  topRides: TopRidesSection;
  practical: PracticalSection;
  price: PriceSection;
  ctaBanner: CtaBannerSection;
  faq: FaqSection;
  notFound: NotFoundSection;
  blogTeaser: BlogTeaserSection;
  blogPage: BlogPageSection;
}

export interface HeaderContent {
  logoImage: string;
  logoAlt: string;
  logoLine1: string;
  logoLine2: string;
  homeLabel: string;
  bookNowText: string;
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  addressHeading: string;
  addressLine1: string;
  addressLine2: string;
  copyrightText: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  dark: string;
  accent: string;
}

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
  sections: HomepageSections;
  header: HeaderContent;
  footer: FooterContent;
  theme: ThemeColors;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export const DEFAULT_HEADER: HeaderContent = {
  logoImage: "/images/siam-park-logo.png",
  logoAlt: "Siam Park Tickets",
  logoLine1: "SIAM PARK",
  logoLine2: "— TICKETS —",
  homeLabel: "Home",
  bookNowText: "BOOK TICKETS",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "BOOK TICKETS",
  ctaHref: "/#tours",
};

export const DEFAULT_FOOTER: FooterContent = {
  tagline:
    "<strong>Independent booking guide.</strong> Not affiliated with Siam Park or Loro Parque S.A. — we compare verified skip-the-line tickets from trusted booking partners and earn a commission on bookings made through our links, at no extra cost to you.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Siam Park Tickets", href: "/#tours" },
        { label: "Top Rides", href: "/#top-rides" },
        { label: "Ticket Prices", href: "/#prices" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ],
  addressHeading: "Park Location",
  addressLine1: "Av. Siam, s/n, 38660 Costa Adeje",
  addressLine2: "Santa Cruz de Tenerife, Spain",
  copyrightText:
    "Siam Park Tickets. All prices shown in EUR/USD and subject to change by the park operator.",
};

export const DEFAULT_THEME: ThemeColors = {
  primary: "#F15A24",   // Siam Orange ⭐
  secondary: "#08A6A6", // Ocean Turquoise ⭐
  dark: "#07575B",      // Deep Teal ⭐
  accent: "#E8B84A",    // Golden Sand
};

export const DEFAULT_HERO_SECTION: HeroSection = {
  tagline: "Feel the Thrill. Live the Adventure.",
  badge1Line1: "Best Price",
  badge1Line2: "Guarantee",
  badge2Line1: "Instant",
  badge2Line2: "E-Tickets",
  badge3Line1: "Skip the Line",
  badge3Line2: "Entry",
  badge4Line1: "24/7 Customer",
  badge4Line2: "Support",
};

export const DEFAULT_SECTIONS: HomepageSections = {
  hero: DEFAULT_HERO_SECTION,
  tours: {
    eyebrow: "Siam Park Tickets",
    heading: "Siam Park Tickets & Fast-Track Passes",
    subheading:
      "Compare the top-rated ways to visit Siam Park — standard general admission, an all-inclusive ticket with fast track, food, drinks and a towel, and a twin ticket combining Siam Park with Loro Parque.",
  },
  highlights: {
    eyebrow: "Why Book With Us",
    heading: "Why Book Your Siam Park Ticket Here",
    subheading:
      "Every ticket we list is compared for price, inclusions, and reliability before it earns a spot on this site.",
    cards: [
      {
        title: "Skip the Box Office",
        body: "Buy online in advance and walk straight to the turnstiles with your mobile ticket — no waiting in the entrance queue.",
        icon: "🎟️",
      },
      {
        title: "Best Price Guarantee",
        body: "We compare ticket prices across trusted booking partners so you always see a fair, competitive rate.",
        icon: "💶",
      },
      {
        title: "Instant Mobile Ticket",
        body: "Your ticket is emailed straight to your phone the moment you book — nothing to print, nothing to collect.",
        icon: "📱",
      },
      {
        title: "Free Cancellation",
        body: "Plans change — most tickets can be cancelled free of charge up to 24 hours before your visit.",
        icon: "✅",
      },
    ],
  },
  why: {
    eyebrow: "Plan Your Visit",
    heading: "What to Expect on a Day at Siam Park",
    intro:
      "185,000 m² of Thai-inspired water park spread across Tenerife's south coast. Here's a sample day to help you plan your visit.",
    timelineHeading: "A perfect day at Siam Park",
    timeline: [
      { time: "10:00", step: "Arrive at opening and head straight for Tower of Power while the queue is shortest" },
      { time: "11:00", step: "Drift the Mai Thai River past tropical gardens and waterfalls to cool down" },
      { time: "12:30", step: "Lunch break at one of the park's Thai-inspired restaurants" },
      { time: "13:30", step: "Catch the swell at Wave Palace, the world's largest artificial wave" },
      { time: "15:00", step: "Family time at The Lost City's slides and play areas" },
      { time: "17:00", step: "Wind down on Siam Beach before the park closes" },
    ],
    learnHeading: "Good to know before your visit",
    learn: [
      "General admission tickets grant flexible-date entry — check your voucher for how it's redeemed",
      "Fast Track passes are used inside the park at participating slides, one priority ride per slide",
      "The All-Inclusive ticket bundles fast track, lunch, drinks, a towel and a locker in one price",
      "Outside food and drink aren't permitted in most areas — bring swimwear, sunscreen and a water bottle",
    ],
    note: "Ride availability may vary slightly for maintenance or weather — check the park's own app on the day for live status.",
    extraHeading: "Getting to Siam Park",
    extraItems: [
      { name: "Costa Adeje", note: "Siam Park is right in Costa Adeje — many hotels are a short walk or free shuttle ride away" },
      { name: "Los Cristianos & Las Américas", note: "A free Siam Park shuttle bus service runs from many hotels in these resort areas" },
      { name: "Elsewhere in Tenerife", note: "Public TITSA buses and taxis serve the park directly; paid on-site parking is also available" },
    ],
    ctaText: "Ready to make a splash? General Admission starts at €44/person and is valid every day the park is open.",
    ctaButtonText: "Book Your Siam Park Ticket →",
    ctaHref: "#tours",
  },
  topRides: {
    eyebrow: "Top Rides & Attractions",
    heading: "Ride the World's Biggest Wave & More",
    body:
      "Siam Park holds the world record for the largest artificial wave at <strong>Wave Palace</strong>, and its signature slide, <strong>Tower of Power</strong>, drops riders 28 metres through a shark-filled aquarium tunnel. Add the gentle <strong>Mai Thai River</strong> and family-friendly <strong>Lost City</strong>, and there's a ride for every level of thrill-seeker.",
    bullets: [
      "Tower of Power plunges riders 28 metres at speeds up to 80 km/h through a shark tank",
      "Wave Palace generates the world's largest artificial wave, verified by Guinness World Records",
      "Mai Thai River is a relaxed float past tropical fish, waterfalls and lush gardens",
      "The Lost City has multiple slides and play areas designed specifically for younger children",
    ],
    ctaButtonText: "See All Siam Park Tickets",
    ctaHref: "#tours",
    images: [
      {
        src: "https://images.unsplash.com/photo-1633493093121-b2f8ac4b2b05?q=80&w=1200&auto=format&fit=crop",
        alt: "Tower of Power, Siam Park's signature 28-metre water slide",
        label: "Tower of Power",
      },
      {
        src: "https://images.unsplash.com/photo-1642717841683-c0323214617c?q=80&w=1200&auto=format&fit=crop",
        alt: "Wave Palace, the world's largest artificial wave at Siam Park",
        label: "Wave Palace",
      },
      {
        src: "https://images.unsplash.com/photo-1775807319100-caeac311698f?q=80&w=1200&auto=format&fit=crop",
        alt: "Mai Thai River winding past tropical gardens at Siam Park",
        label: "Mai Thai River",
      },
      {
        src: "https://images.unsplash.com/photo-1507445308359-ee4c04611197?q=80&w=1200&auto=format&fit=crop",
        alt: "The Lost City family play area at Siam Park",
        label: "The Lost City",
      },
    ],
  },
  practical: {
    hoursHeading: "Opening Hours & Best Time to Visit (2026)",
    hours: [
      { range: "Summer Season (May 1 – Oct 29)", time: "10:00 AM – 6:00 PM daily" },
      { range: "Winter Season (Oct 30 – Apr 30)", time: "10:00 AM – 5:00 PM daily" },
      { range: "Fast Track Redemption", time: "From park opening until each slide's daily allocation runs out" },
      { range: "Closed", time: "December 25 and January 1" },
    ],
    hoursNote: "Last entry is typically 1 hour before closing — always double-check the exact time on your ticket voucher.",
    addressHeading: "Location & Getting There",
    address:
      "Av. Siam, s/n, 38660 Costa Adeje, Santa Cruz de Tenerife, Spain.\nA free shuttle bus service runs from many hotels in Costa Adeje, Los Cristianos, and Las Américas.",
    metro: "Public TITSA buses and taxis also serve the park directly; paid parking is available on-site.",
    bestTimeHeading: "Best Time to Visit Siam Park",
    bestTimeBody:
      "Arrive right at opening (10:00 AM) to beat the queues at Tower of Power and Wave Palace. Weekdays outside Spanish and UK school holidays are noticeably quieter than weekends and August.",
  },
  price: {
    eyebrow: "Compare & Choose",
    heading: "Compare Siam Park Tickets",
    subheading:
      "All three options side by side — pick the ticket that matches your visit, then book straight from the table.",
    note: "Children under 3 typically enter free — check each ticket's own age tiers before booking.",
    itemLabel: "Ticket Type",
    priceLabel: "Price",
    column1Label: "Valid For",
    column2Label: "Food, Drinks & Fast Track",
    bestForLabel: "Best For",
    bookLabel: "Book Ticket",
  },
  ctaBanner: {
    heading: "Ready to Make a Splash at Siam Park?",
    subtext: "Book your ticket today and skip the box office queue with instant mobile confirmation.",
    buttonText: "Explore All Tickets",
    buttonHref: "#tours",
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    heading: "Siam Park Tickets FAQs",
  },
  notFound: {
    heading: "Looks like this slide doesn't lead anywhere.",
    body: "The page you're looking for doesn't exist or may have moved. Try one of these instead.",
    primaryButtonText: "Compare Siam Park Tickets →",
    primaryButtonHref: "/#tours",
    secondaryButtonText: "Read the Travel Guide",
    secondaryButtonHref: "/blog",
  },
  blogTeaser: {
    eyebrow: "From the Blog",
    heading: "Siam Park Tips & Guides",
    subheading:
      "Expert advice on picking the right ticket, beating the queues, and planning your day at Tenerife's biggest water park.",
    viewAllText: "View All Articles",
    readArticleText: "Read Article",
  },
  blogPage: {
    eyebrow: "Siam Park Travel Blog",
    heading: "Siam Park Tickets & Travel Guide",
    subheading: "Practical guides, ticket comparisons, and insider tips to help you plan the ultimate day at Siam Park.",
    emptyStateText: "No articles published yet — check back soon.",
    featuredLinkText: "Read the guide",
    ctaHeading: "Ready to book your Siam Park ticket?",
    ctaButtonText: "Compare Siam Park Tickets →",
    backToGuidesText: "← All guides",
    quickAnswerLabel: "Quick Answer",
    tocLabel: "In This Guide",
    relatedGuidesHeading: "Related Guides",
    sidebarRelatedHeading: "Related Articles",
    sidebarRecommendedBadge: "Recommended",
    sidebarCompareLinkText: "Compare all tickets →",
    promoRecommendedText: "Recommended for you",
  },
};

const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroBadge: "THE WORLD'S BEST WATER PARK",
  heroHeading: "Siam Park",
  heroSubheading:
    "Book your Siam Park tickets online and enjoy a full day of unforgettable fun at Tenerife's award-winning water park.",
  heroImage: "/images/siam-park-hero.jpg",
  heroImageAlt: "Siam Park Tenerife water slide and family splashing in inflatable raft",
  heroCtaPrimaryText: "BOOK TICKETS NOW",
  heroCtaPrimaryHref: "#tours",
  heroCtaSecondaryText: "VIEW PRICES & OPTIONS",
  heroCtaSecondaryHref: "#prices",
  showFeaturedTour: true,
  featuredTourId: "siam-park-general-admission-ticket",
  featuredBadgeLabel: "Recommended",
  featuredUrgencyText: "Best Price Guarantee · High Demand",
  featuredReasons: [
    "Most booked Siam Park ticket — thousands of verified 5-star reviews",
    "Skip the box office and get instant mobile ticket confirmation",
    "Free cancellation up to 24 hours before your visit",
  ],
  sections: DEFAULT_SECTIONS,
  header: DEFAULT_HEADER,
  footer: DEFAULT_FOOTER,
  theme: DEFAULT_THEME,
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "Siam Park Tickets",
  noIndex: false,
  noFollow: false,
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function parseReasons(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function parseJsonWithDefault<T extends object>(value: unknown, fallback: T): T {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = null;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
  return { ...fallback, ...(parsed as Partial<T>) };
}

function rowToHomepage(row: any): HomepageContent {
  const sectionsRaw = parseJsonWithDefault<HomepageSections>(row.sections_json, DEFAULT_SECTIONS);
  return {
    heroBadge: row.hero_badge || "",
    heroHeading: row.hero_heading || "",
    heroSubheading: row.hero_subheading || "",
    heroImage: row.hero_image || "",
    heroImageAlt: row.hero_image_alt || "",
    heroCtaPrimaryText: row.hero_cta_primary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryText,
    heroCtaPrimaryHref: row.hero_cta_primary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryHref,
    heroCtaSecondaryText: row.hero_cta_secondary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryText,
    heroCtaSecondaryHref: row.hero_cta_secondary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryHref,
    showFeaturedTour: !!row.show_featured_tour,
    featuredTourId: row.featured_tour_id || "",
    featuredBadgeLabel: row.featured_badge_label || "",
    featuredUrgencyText: row.featured_urgency_text || "",
    featuredReasons: parseReasons(row.featured_reasons),
    sections: {
      hero: { ...DEFAULT_SECTIONS.hero, ...(sectionsRaw.hero || {}) },
      tours: { ...DEFAULT_SECTIONS.tours, ...sectionsRaw.tours },
      highlights: { ...DEFAULT_SECTIONS.highlights, ...sectionsRaw.highlights },
      why: { ...DEFAULT_SECTIONS.why, ...sectionsRaw.why },
      topRides: { ...DEFAULT_SECTIONS.topRides, ...sectionsRaw.topRides },
      practical: { ...DEFAULT_SECTIONS.practical, ...sectionsRaw.practical },
      price: { ...DEFAULT_SECTIONS.price, ...sectionsRaw.price },
      ctaBanner: { ...DEFAULT_SECTIONS.ctaBanner, ...sectionsRaw.ctaBanner },
      faq: { ...DEFAULT_SECTIONS.faq, ...sectionsRaw.faq },
      notFound: { ...DEFAULT_SECTIONS.notFound, ...sectionsRaw.notFound },
      blogTeaser: { ...DEFAULT_SECTIONS.blogTeaser, ...sectionsRaw.blogTeaser },
      blogPage: { ...DEFAULT_SECTIONS.blogPage, ...sectionsRaw.blogPage },
    },
    header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
    footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
    theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const rows = await sql`SELECT * FROM homepage WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToHomepage(rows[0]) : DEFAULT_HOMEPAGE_CONTENT;
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}

export async function getSiteChrome(): Promise<{ header: HeaderContent; footer: FooterContent; theme: ThemeColors }> {
  try {
    const rows = await sql`SELECT header_json, footer_json, theme_json FROM homepage WHERE id = 1 LIMIT 1`;
    if (!rows.length) return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
    const row = rows[0] as any;
    return {
      header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
      footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
      theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    };
  } catch {
    return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
  }
}

export async function saveHomepageCopy(data: {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      hero_cta_primary_text, hero_cta_primary_href,
      hero_cta_secondary_text, hero_cta_secondary_href,
      meta_title, meta_description, focus_keyword,
      canonical_url, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt},
      ${data.heroCtaPrimaryText || ""}, ${data.heroCtaPrimaryHref || ""},
      ${data.heroCtaSecondaryText || ""}, ${data.heroCtaSecondaryHref || ""},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.focusKeyword || ""},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      hero_cta_primary_text = EXCLUDED.hero_cta_primary_text,
      hero_cta_primary_href = EXCLUDED.hero_cta_primary_href,
      hero_cta_secondary_text = EXCLUDED.hero_cta_secondary_text,
      hero_cta_secondary_href = EXCLUDED.hero_cta_secondary_href,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      focus_keyword = EXCLUDED.focus_keyword,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

export async function setHomepageIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO homepage (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveRecommendedTour(data: {
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, show_featured_tour, featured_tour_id, featured_badge_label,
      featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${!!data.showFeaturedTour}, ${data.featuredTourId}, ${data.featuredBadgeLabel},
      ${data.featuredUrgencyText}, ${JSON.stringify(data.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      show_featured_tour = EXCLUDED.show_featured_tour,
      featured_tour_id = EXCLUDED.featured_tour_id,
      featured_badge_label = EXCLUDED.featured_badge_label,
      featured_urgency_text = EXCLUDED.featured_urgency_text,
      featured_reasons = EXCLUDED.featured_reasons
  `;
}

export async function saveHomepageSections(sections: HomepageSections): Promise<void> {
  await sql`
    INSERT INTO homepage (id, sections_json)
    VALUES (1, ${JSON.stringify(sections)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      sections_json = EXCLUDED.sections_json
  `;
}

export async function saveSiteHeader(header: HeaderContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, header_json)
    VALUES (1, ${JSON.stringify(header)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      header_json = EXCLUDED.header_json
  `;
}

export async function saveSiteFooter(footer: FooterContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, footer_json)
    VALUES (1, ${JSON.stringify(footer)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      footer_json = EXCLUDED.footer_json
  `;
}

export async function saveSiteTheme(theme: ThemeColors): Promise<void> {
  await sql`
    INSERT INTO homepage (id, theme_json)
    VALUES (1, ${JSON.stringify(theme)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      theme_json = EXCLUDED.theme_json
  `;
}
