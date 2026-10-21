// Script to seed the "Best Time of Year to Visit Siam Park: Seasons, Water Temps & Crowds" article.
// Safe to re-run: Uses ON CONFLICT (slug) DO UPDATE to prevent duplicate rows.
// Also synchronizes data/posts.json with all active posts in the database.

import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const article = {
  slug: "best-time-of-year-to-visit-siam-park",
  title: "Best Time of Year to Visit Siam Park: Seasons, Water Temps & Crowds",
  metaTitle: "Best Time of Year to Visit Siam Park (Seasons, Weather & Crowds)",
  metaDescription: "Discover the best time of year to visit Siam Park in Tenerife. Learn about heated water temps, quiet shoulder months, summer rush, and opening hour tips.",
  category: "Trip Planning",
  excerpt: "From warm spring days to winter visits with 24°C heated water, discover the best months and hours to experience Siam Park with minimal queues.",
  quickAnswer: "The best time of year to visit Siam Park is during the shoulder months of May, June, September, and October. Arriving at 9:30 AM before the 10:00 AM opening allows you to ride headline slides like Tower of Power and Singha with virtually no waiting before tour groups arrive.",
  readTime: "5 min read",
  date: "2026-10-21",
  updatedAt: "2026-10-21",
  image: "https://xa5ngjxopr0wukkt.public.blob.vercel-storage.com/uploads/1792568911528-siam-park-best-time-cover-Nf96a7aXuCDnrQnrEkhYjZxlBBrrKX.jpg",
  imageAlt: "Siam Park Tenerife water slide tower with turquoise water pools and tropical palms",
  recommendedTourId: "siam-park-general-admission-ticket",
  recommendedTourAfterBlock: 1,
  focusKeyword: "best time to visit Siam Park",
  ctaHeading: "Ready for an unforgettable day at Siam Park?",
  ctaBody: "Compare standard admission tickets and all-inclusive packages with fast track and lunch included.",
  ctaButtonText: "View Siam Park Tickets",
  ctaButtonHref: "/#tours",
  content: `<p>Planning a trip to Tenerife’s premier Thai-themed water park requires smart scheduling. Understanding the <strong>best time to visit Siam Park</strong> can transform your day from waiting in hour-long queues to breezing through world-class flumes and lounging along white sand lagoons.</p>

<h2>Ideal Seasons: Shoulder Months vs. Peak Summer</h2>
<p>Siam Park enjoys south Tenerife’s reliable subtropical sunshine throughout the entire calendar year. However, guest volumes fluctuate dramatically depending on European holiday calendars and seasonal weather patterns.</p>

<h3>Spring & Autumn Sweet Spot (May–June & September–October)</h3>
<p>For the ultimate balance of warm Atlantic sunshine and manageable queue times, late spring (May to June) and early autumn (September to October) are undeniably the prime windows. Daily temperatures hover pleasantly between 24°C and 28°C, ideal for water slides and sunbathing. Because primary European school terms are active during these periods, ride wait times rarely exceed 15 to 20 minutes outside of weekend afternoons.</p>

<h3>Summer Rush (July & August)</h3>
<p>July and August represent the busiest months of the year. Daily temperatures frequently top 30°C, drawing massive family crowds and vacation groups. Popular thrill rides such as the Tower of Power, Singha, and Kinnaree can see waits stretching past 60 to 75 minutes by midday. If your only window coincides with peak summer, buying tickets online in advance and investing in a Fast Track pass is virtually mandatory to maximize your slide count.</p>

<h3>Winter Visiting & Heated Water Temperatures (November–April)</h3>
<p>Visiting during winter offers remarkably quiet park grounds. A common concern is water temperature, but Siam Park utilizes an eco-friendly heating system that warms all pool and slide water to a comfortable 24°C (75°F) year-round. While ambient air temperatures can feel cool when exiting rides on breezy January afternoons, queue times drop to negligible levels, allowing you to walk directly onto headline attractions.</p>

<figure>
  <img src="https://xa5ngjxopr0wukkt.public.blob.vercel-storage.com/uploads/1792568915246-siam-park-seasonal-crowds-waves-NEZDiBzjG4PwfLxLk1L7Fy7JqlYp5d.jpg" alt="Tropical wave pool and relaxation beach area at Siam Park Tenerife" />
  <figcaption>Siam Park maintains heated 24°C water year-round, making off-peak visits comfortable across every season.</figcaption>
</figure>

<h2>Best Time of Day & Opening Rope-Drop Strategy</h2>
<p>Arriving early is the single most effective tactic for any Siam Park visit. The park gates open promptly at 10:00 AM daily. Aim to reach the entrance turnstiles by 09:30 AM to clear security checks, rent your locker, and position yourself before the main rush.</p>

<h3>Morning Rush vs. Afternoon Lull</h3>
<p>Tour buses and resort excursions typically arrive between 11:30 AM and 1:00 PM, creating peak congestion until mid-afternoon. Ride headline attractions—Tower of Power, Dragon, and Mekong Rapids—during the first 90 minutes. When lines peak midday, drift along the tranquil Mai Thai River, catch artificial swells at the Wave Palace, or grab lunch. Queues taper off again during the final two hours before closing.</p>

<h2>Best Days of the Week to Avoid Crowds</h2>
<p>Tuesdays and Wednesdays are statistically the quietest days at Siam Park. Many holidaymakers arrive in Tenerife on weekends or Mondays, saving major theme park visits for Thursday through Sunday. Local residents also flock to the park on Saturdays and Sundays, making midweek visits far smoother.</p>

<h2>Essential Tips for a Smooth Visit</h2>
<ul>
  <li><strong>Book tickets online in advance:</strong> Skip the morning box-office queue and head straight to barcode turnstiles.</li>
  <li><strong>Wear neoprene water shoes:</strong> Dark concrete paths heat up under the Canary Island sun, and water shoes can be worn on most slides.</li>
  <li><strong>Rent a locker immediately:</strong> Lockers near the entrance fill rapidly; secure one first thing to stow dry clothes and valuables.</li>
  <li><strong>Consider the All-Inclusive ticket:</strong> Bundles priority fast track, lunch, lockers, and towels, proving high value in high season.</li>
</ul>

<p>By timing your arrival for 09:30 AM on a midweek shoulder-season morning, you will experience the <strong>best time to visit Siam Park</strong> with minimal queues, perfect sunshine, and maximum thrills.</p>`
};

async function seed() {
  console.log("Seeding article into posts table...");

  await sql`
    INSERT INTO posts (
      slug, title, meta_title, meta_description, category, excerpt,
      quick_answer, read_time, date, updated_at, image, image_alt,
      recommended_tour_id, recommended_tour_after_block, content, sort_order,
      cta_heading, cta_body, cta_button_text, cta_button_href, focus_keyword,
      no_index, no_follow, canonical_url, og_title, og_description, og_image
    ) VALUES (
      ${article.slug}, ${article.title}, ${article.metaTitle}, ${article.metaDescription}, ${article.category},
      ${article.excerpt}, ${article.quickAnswer}, ${article.readTime}, ${article.date}, ${article.updatedAt},
      ${article.image}, ${article.imageAlt}, ${article.recommendedTourId}, ${article.recommendedTourAfterBlock},
      ${JSON.stringify(article.content)}::jsonb, 0,
      ${article.ctaHeading}, ${article.ctaBody}, ${article.ctaButtonText}, ${article.ctaButtonHref},
      ${article.focusKeyword}, false, false, '', '', '', ''
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      category = EXCLUDED.category,
      excerpt = EXCLUDED.excerpt,
      quick_answer = EXCLUDED.quick_answer,
      read_time = EXCLUDED.read_time,
      date = EXCLUDED.date,
      updated_at = EXCLUDED.updated_at,
      image = EXCLUDED.image,
      image_alt = EXCLUDED.image_alt,
      recommended_tour_id = EXCLUDED.recommended_tour_id,
      recommended_tour_after_block = EXCLUDED.recommended_tour_after_block,
      content = EXCLUDED.content,
      cta_heading = EXCLUDED.cta_heading,
      cta_body = EXCLUDED.cta_body,
      cta_button_text = EXCLUDED.cta_button_text,
      cta_button_href = EXCLUDED.cta_button_href,
      focus_keyword = EXCLUDED.focus_keyword,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow;
  `;

  console.log("Article upserted successfully.");

  // Fetch all posts from DB and synchronize data/posts.json
  const allRows = await sql`SELECT * FROM posts ORDER BY date DESC, sort_order ASC;`;
  console.log(`Retrieved ${allRows.length} posts from database.`);

  const mapped = allRows.map((row) => ({
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    category: row.category,
    excerpt: row.excerpt,
    quickAnswer: row.quick_answer,
    readTime: row.read_time,
    date: row.date,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString().slice(0, 10) : row.date,
    image: row.image,
    imageAlt: row.image_alt,
    recommendedTourId: row.recommended_tour_id || "",
    recommendedTourAfterBlock: row.recommended_tour_after_block === null ? undefined : Number(row.recommended_tour_after_block),
    content: typeof row.content === "string" ? row.content : row.content,
    ctaHeading: row.cta_heading || "Ready to book?",
    ctaBody: row.cta_body || "Compare tour prices and tickets on the homepage.",
    ctaButtonText: row.cta_button_text || "See Price Comparison",
    ctaButtonHref: row.cta_button_href || "/#prices",
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || ""
  }));

  const postsJsonPath = path.join(process.cwd(), "data", "posts.json");
  fs.writeFileSync(postsJsonPath, JSON.stringify(mapped, null, 2) + "\n", "utf-8");
  console.log(`Updated ${postsJsonPath} with ${mapped.length} posts.`);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
