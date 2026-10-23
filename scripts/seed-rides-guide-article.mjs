// Script to seed the "Siam Park Tenerife: Rides, Attractions & Must-Try Experiences" article.
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
  slug: "siam-park-tenerife-rides-attractions-guide",
  title: "Siam Park Tenerife: Rides, Attractions & Must-Try Experiences",
  metaTitle: "Siam Park Tenerife Rides: Slides, Attractions & Guide",
  metaDescription: "Discover the best Siam Park Tenerife rides and water slides. Complete guide to Tower of Power, Singha, Wave Palace, height restrictions, and visitor tips.",
  category: "Attractions Guide",
  excerpt: "Explore the best Siam Park Tenerife rides, from the Tower of Power and Singha to lazy rivers, wave pools, height rules, and queue-busting tips.",
  quickAnswer: "Siam Park Tenerife rides cater to every thrill level, ranging from the adrenaline-fueled Tower of Power (28m vertical drop through a shark aquarium) and Singha water coaster to the 3-meter waves at Wave Palace and the 1-kilometer Mai Thai River. Most thrill flumes require a minimum height of 1.25m, while Tower of Power requires 1.40m and 14 years of age.",
  readTime: "6 min read",
  date: "2026-10-23",
  updatedAt: "2026-10-23",
  image: "https://xa5ngjxopr0wukkt.public.blob.vercel-storage.com/uploads/siam-park-rides-attractions-cover-1792738723737-kNbZ0KdSRLTt08uiw9x5XpRHFoZqdx.jpg",
  imageAlt: "Siam Park Tenerife water slides and swimming pools surrounded by tropical palms",
  recommendedTourId: "siam-park-general-admission-ticket",
  recommendedTourAfterBlock: 1,
  focusKeyword: "Siam Park Tenerife rides",
  ctaHeading: "Ready to experience Siam Park’s world-class rides?",
  ctaBody: "Book your official admission tickets in advance for direct barcode entry, or upgrade to all-inclusive packages with fast-track slide access.",
  ctaButtonText: "View Siam Park Tickets",
  ctaButtonHref: "/#tours",
  content: `<p>Perched along the sunny hills of Costa Adeje in southern Tenerife, Siam Park is celebrated globally as one of the world’s finest aquatic theme parks. Designed with authentic Thai architecture and lush tropical greenery, the park offers an exceptional variety of aquatic adventures. From sheer vertical drop flumes to tranquil lagoon loops, experiencing the iconic <strong>Siam Park Tenerife rides</strong> is a highlight of any Canary Islands holiday.</p>

<p>Whether you are chasing heart-pounding adrenaline, planning a family outing with children, or looking to unwind along warm white sand beaches, understanding how attractions are organized helps you make the most of your visit. This comprehensive guide details the <strong>best rides at Siam Park</strong>, official height restrictions, family areas, and practical tips to beat the queues.</p>

<div class="bg-blue-50/70 border border-blue-200 rounded-xl p-5 my-6 text-slate-800">
  <p class="font-semibold text-blue-950 mb-1">Rope-Drop Ride Strategy</p>
  <p class="text-sm m-0">Head straight to high-demand thrill flumes like Tower of Power, Singha, and Saifa during the first 90 minutes after opening at 10:00 AM. Tour buses arrive between 11:30 AM and 1:00 PM, making mornings and late afternoons the fastest times to ride.</p>
</div>

<h2>Top Thrill Water Slides at Siam Park</h2>
<p>For thrill-seekers, Siam Park delivers world-class engineering and record-breaking drops. The park’s adrenaline collection features steep freefalls, water-propulsion coasters, and immense zero-gravity funnels.</p>

<h3>Tower of Power</h3>
<p>The flagship attraction of Siam Park is the <strong>Tower of Power</strong>. Riders climb a 28-meter (92-foot) Thai temple tower before plunging down an almost vertical open-air drop. Reaching speeds up to 80 km/h (50 mph), the slide shoots you through a transparent acrylic tunnel surrounded by a shark and ray aquarium. Minimum height is 1.40 meters, and riders must be at least 14 years old.</p>

<h3>Singha & Saifa: High-Speed Water Coasters</h3>
<p>Unlike conventional flumes, <strong>Singha</strong> is a hybrid water roller coaster. High-pressure water jets propel three-person inline rafts uphill at speeds up to 18 m/s (65 km/h) through 14 sharp turns. <strong>Saifa</strong> is the park’s newest double-lane dueling coaster, launching two-person rafts side-by-side along parallel 306-meter tracks. Both coasters require a minimum height of 1.25 meters.</p>

<h3>The Dragon & Kinnaree</h3>
<p>Group slides offer shared excitement. <strong>The Dragon</strong> seats four riders in a cloverleaf raft that drops into a 20-meter-wide open funnel, oscillating up vertical walls under a giant dragon sculpture. <strong>Kinnaree</strong> stretches 213 meters through hillside greenery, combining an enclosed funnel, an abrupt drop, and a tornado wall turn before splashing down (minimum height: 1.25 meters).</p>

<h3>Vulcano</h3>
<p>Carrying four riders on a round tube, <strong>Vulcano</strong> plunges into pitch-black darkness inside an artificial volcano. Synchronized lasers and volcanic sound effects create a sensory descent before returning to daylight.</p>

<figure>
  <img src="https://xa5ngjxopr0wukkt.public.blob.vercel-storage.com/uploads/siam-park-lazy-river-waves-1792738726724-6c6aS1Ni4DryHvdeZXalMvlbE6GJOi.jpg" alt="Relaxing tropical waters and winding palm-fringed rivers at Siam Park Tenerife" />
  <figcaption>The Mai Thai River weaves across one kilometer of lush botanical landscaping, waterfalls, and tropical lagoons.</figcaption>
</figure>

<h2>Family Rides and Relaxation Attractions</h2>
<p>Beyond extreme freefalls, a wide selection of <strong>Siam Park attractions</strong> caters to families and guests seeking moderate adventures or scenic leisure.</p>

<h3>Mekong Rapids & Naga Racer</h3>
<p><strong>Mekong Rapids</strong> simulates a white-water expedition for four to five riders in circular rafts (minimum height: 1.10 meters). For friendly competition, <strong>Naga Racer</strong> features six parallel lanes where riders dive head-first on cushioned foam mats through undulating straightaways with speed sensor timers.</p>

<h3>The Wave Palace & Siam Beach</h3>
<p>The centerpiece of the relaxation zone is <strong>The Wave Palace</strong>, an immense heated lagoon flanked by 330 meters of natural white sand. It generates artificial surf waves up to 3 meters high—the largest in any water park worldwide. Swimmers can ride rolling swells in the deep zone or wade along the gentle shoreline.</p>

<h3>Mai Thai River</h3>
<p>Stretching over one kilometer, the <strong>Mai Thai River</strong> is one of the world’s longest lazy rivers. Drifting on inflatable rings past waterfalls and exotic greenery, guests can choose a gentle circuit or take an automated lift to a slide that passes through a shark aquarium.</p>

<h2>Children’s Areas: The Lost City & Sawasdee</h2>
<p>Families with younger children enjoy dedicated, safe aquatic zones:</p>
<ul>
  <li><strong>The Lost City:</strong> An interactive fortress with 15 child-sized slides, climbing nets, water cannons, and shallow heated pools.</li>
  <li><strong>Sawasdee:</strong> Scaled-down replicas of famous thrill rides, allowing kids under 1.25 meters to enjoy gentle <strong>Siam Park water slides</strong>.</li>
</ul>

<h2>Siam Park Rides & Height Requirements</h2>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left border-collapse border border-slate-200 text-sm">
    <thead>
      <tr class="bg-slate-100 text-slate-900 border-b border-slate-200">
        <th class="p-3 font-semibold">Attraction</th>
        <th class="p-3 font-semibold">Thrill Level</th>
        <th class="p-3 font-semibold">Min Height</th>
        <th class="p-3 font-semibold">Ride Format</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200">
      <tr>
        <td class="p-3 font-medium">Tower of Power</td>
        <td class="p-3">Extreme</td>
        <td class="p-3">1.40 m (14+ yrs)</td>
        <td class="p-3">Single body slide</td>
      </tr>
      <tr>
        <td class="p-3 font-medium">Singha & Saifa</td>
        <td class="p-3">High</td>
        <td class="p-3">1.25 m</td>
        <td class="p-3">Water coaster rafts</td>
      </tr>
      <tr>
        <td class="p-3 font-medium">The Dragon & Kinnaree</td>
        <td class="p-3">High</td>
        <td class="p-3">1.25 m</td>
        <td class="p-3">4-person group rafts</td>
      </tr>
      <tr>
        <td class="p-3 font-medium">Mekong Rapids</td>
        <td class="p-3">Medium</td>
        <td class="p-3">1.10 m</td>
        <td class="p-3">Family circular raft</td>
      </tr>
      <tr>
        <td class="p-3 font-medium">Naga Racer</td>
        <td class="p-3">Medium</td>
        <td class="p-3">1.10 m</td>
        <td class="p-3">6-lane mat racer</td>
      </tr>
      <tr>
        <td class="p-3 font-medium">The Wave Palace</td>
        <td class="p-3">Moderate</td>
        <td class="p-3">No minimum</td>
        <td class="p-3">Wave pool & beach</td>
      </tr>
      <tr>
        <td class="p-3 font-medium">Mai Thai River</td>
        <td class="p-3">Relaxing</td>
        <td class="p-3">No minimum</td>
        <td class="p-3">1 km lazy river loop</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Practical Tips for Planning Your Day</h2>
<ul>
  <li><strong>Book tickets in advance:</strong> Purchasing online lets you scan mobile barcodes and skip morning box-office queues.</li>
  <li><strong>Wear neoprene water shoes:</strong> Paved paths warm up under the sun. Shoes are permitted on almost all slides.</li>
  <li><strong>Rent a locker early:</strong> Secure belongings upon arrival near the main entrance or Siam Beach.</li>
  <li><strong>Consider the All-Inclusive ticket:</strong> Bundles priority Fast Track, lunch, drinks, lockers, and towels for busy visits.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>What is the scariest ride at Siam Park?</h3>
<p>Most visitors consider the <strong>Tower of Power</strong> the scariest attraction due to its 28-meter near-vertical drop and aquarium tunnel. The high-speed water coasters <strong>Singha</strong> and <strong>Saifa</strong> offer the greatest speed and acceleration.</p>

<h3>Are all rides included in general admission?</h3>
<p>Yes. General admission includes unlimited access to all slides, the Wave Palace, lazy river, and children’s zones all day. Fast Track and lockers are optional upgrades unless booking an all-inclusive pass.</p>

<h3>Are the pools and slides heated?</h3>
<p>Yes. All water across Siam Park is heated to 24°C (75°F) year-round, ensuring comfortable conditions in every season.</p>

<h3>What is the minimum height for major slides?</h3>
<p>Most major adrenaline slides require a height of 1.25 meters (4 ft 1 in). Mekong Rapids and Naga Racer require 1.10 meters (3 ft 7 in), while the Tower of Power requires 1.40 meters (4 ft 7 in) and an age of at least 14.</p>`
};

function countWords(str) {
  const plain = str.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/[—–]/g, " ");
  return plain.trim().split(/\s+/).filter(Boolean).length;
}

async function seed() {
  const wordCount = countWords(article.content);
  console.log(`Validating word count: ${wordCount} words (Target: 800-1000 words)...`);
  if (wordCount < 800 || wordCount > 1000) {
    throw new Error(`Word count ${wordCount} is outside the 800-1000 word range!`);
  }
  console.log("Word count verification passed.");

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
