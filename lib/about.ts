import { sql } from "./db";

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const DEFAULT_CONTENT = `<h2>Our Mission</h2>
<p>We built this independent guide with one mission: Siam Park is one of the most talked-about water parks in the world — but only if you book the right ticket. With several ticket types and multiple booking partners to choose from, prices and inclusions vary dramatically.</p>
<p>We are an independent booking resource — not Siam Park or Loro Parque S.A. itself. We rigorously screen and compare verified ticket options, from standard general admission to all-inclusive fast-track passes, sold through trusted, established booking partners.</p>
<h2>How We Screen & Select Siam Park Tickets</h2>
<p>Every ticket featured on this site is vetted against four strict criteria before earning a recommendation:</p>
<ul>
<li><strong>Genuine, Valid Tickets</strong> — Every ticket we list is sold through an established, verified booking partner and grants real entry to Siam Park.</li>
<li><strong>Verified Traveler Reviews</strong> — We only recommend tickets with thousands of authentic, verified reviews and average ratings above 4.5 stars.</li>
<li><strong>Transparent Pricing & Inclusions</strong> — What you see is what you pay: fast track, food, drinks, towel and locker inclusions are clearly stated upfront with zero hidden charges.</li>
<li><strong>Free Cancellation</strong> — Most tickets include flexibility with free cancellation up to 24 hours before your visit.</li>
</ul>
<h2>Independent Booking Resource</h2>
<p>This website is an independent travel companion. We don't operate the park or sell tickets directly — all bookings go securely through GetYourGuide, a globally trusted partner, protected by official customer support and generous cancellation guarantees.</p>
<h2>Affiliate Disclosure</h2>
<p>When you book a Siam Park ticket through links on our site, we may earn a modest affiliate commission at zero additional cost to you. This support allows us to maintain up-to-date guides and independent comparisons.</p>
<p>Have questions before you book your visit? Feel free to reach out via our <a href="/contact">contact page</a>.</p>`;

const DEFAULT_ABOUT: AboutPageContent = {
  heroEyebrow: "About Us",
  heroHeading: "Your Independent Guide to Siam Park Tickets",
  heroSubheading:
    "We help travelers discover and book the best Siam Park tickets — from standard general admission to all-inclusive fast-track passes and twin tickets with Loro Parque.",
  heroImage: "https://images.unsplash.com/photo-1642717841683-c0323214617c?q=80&w=2000&auto=format&fit=crop",
  heroImageAlt: "Wave Palace, the world's largest artificial wave, at Siam Park",
  content: DEFAULT_CONTENT,
  metaTitle: "About Us | Siam Park Ticket Booking Guide",
  metaDescription:
    "Learn about our independent travel guide, and how we curate the best Siam Park tickets, fast-track passes, and twin tickets with Loro Parque.",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function rowToAbout(row: any): AboutPageContent {
  return {
    heroEyebrow: row.hero_eyebrow || DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading || DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading || DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image || DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt || DEFAULT_ABOUT.heroImageAlt,
    content: row.content || DEFAULT_ABOUT.content,
    metaTitle: row.meta_title || DEFAULT_ABOUT.metaTitle,
    metaDescription: row.meta_description || DEFAULT_ABOUT.metaDescription,
    canonicalUrl: row.canonical_url || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  try {
    const rows = await sql`SELECT * FROM about_page WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToAbout(rows[0]) : DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function setAboutIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO about_page (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveAboutPage(data: Partial<AboutPageContent>): Promise<void> {
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      content, meta_title, meta_description, canonical_url, no_index, no_follow,
      og_title, og_description, og_image
    ) VALUES (
      1,
      ${data.heroEyebrow ?? DEFAULT_ABOUT.heroEyebrow},
      ${data.heroHeading ?? DEFAULT_ABOUT.heroHeading},
      ${data.heroSubheading ?? DEFAULT_ABOUT.heroSubheading},
      ${data.heroImage ?? DEFAULT_ABOUT.heroImage},
      ${data.heroImageAlt ?? DEFAULT_ABOUT.heroImageAlt},
      ${data.content ?? DEFAULT_ABOUT.content},
      ${data.metaTitle ?? DEFAULT_ABOUT.metaTitle},
      ${data.metaDescription ?? DEFAULT_ABOUT.metaDescription},
      ${data.canonicalUrl ?? ""},
      ${!!data.noIndex},
      ${!!data.noFollow},
      ${data.ogTitle ?? ""},
      ${data.ogDescription ?? ""},
      ${data.ogImage ?? ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      content = EXCLUDED.content,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      canonical_url = EXCLUDED.canonical_url,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}
