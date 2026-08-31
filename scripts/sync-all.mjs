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
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const dataDir = path.join(process.cwd(), "data");

function readJsonFile(name) {
  const filePath = path.join(dataDir, name);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

async function syncAll() {
  console.log("Checking and syncing all tables with updated data and images...");

  // 1. Sync Homepage
  const h = readJsonFile("homepage.json");
  if (h) {
    await sql`
      INSERT INTO homepage (
        id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
        rating_value, rating_count, show_featured_tour, featured_tour_id,
        featured_badge_label, featured_urgency_text, featured_reasons
      ) VALUES (
        1, ${h.heroBadge || ""}, ${h.heroHeading || ""}, ${h.heroSubheading || ""},
        ${h.heroImage || "/images/chichen-itza-hero.jpg"}, ${h.heroImageAlt || ""},
        ${h.ratingValue || ""}, ${h.ratingCount || ""}, ${!!h.showFeaturedTour},
        ${h.featuredTourId || ""}, ${h.featuredBadgeLabel || ""}, ${h.featuredUrgencyText || ""},
        ${JSON.stringify(h.featuredReasons || [])}::jsonb
      )
      ON CONFLICT (id) DO UPDATE SET
        hero_badge = EXCLUDED.hero_badge,
        hero_heading = EXCLUDED.hero_heading,
        hero_subheading = EXCLUDED.hero_subheading,
        hero_image = EXCLUDED.hero_image,
        hero_image_alt = EXCLUDED.hero_image_alt,
        rating_value = EXCLUDED.rating_value,
        rating_count = EXCLUDED.rating_count,
        show_featured_tour = EXCLUDED.show_featured_tour,
        featured_tour_id = EXCLUDED.featured_tour_id,
        featured_badge_label = EXCLUDED.featured_badge_label,
        featured_urgency_text = EXCLUDED.featured_urgency_text,
        featured_reasons = EXCLUDED.featured_reasons
    `;
    console.log("Homepage synced successfully: hero_image =", h.heroImage);
  }

  // 2. Sync Tours
  const tours = readJsonFile("tours.json");
  if (tours && tours.length > 0) {
    for (let i = 0; i < tours.length; i++) {
      const t = tours[i];
      await sql`
        INSERT INTO tours (
          id, badge, ribbon, title, description, includes, duration, rating,
          reviews, price, original_price, image, image_alt, href_path,
          href_extra, featured, best_for, sort_order
        ) VALUES (
          ${t.id}, ${t.badge}, ${t.ribbon || null}, ${t.title}, ${t.description},
          ${JSON.stringify(t.includes || [])}::jsonb, ${t.duration || null},
          ${t.rating ?? 5}, ${t.reviews ?? 0}, ${t.price ?? 0}, ${t.originalPrice ?? null},
          ${t.image}, ${t.imageAlt}, ${t.hrefPath}, ${t.hrefExtra || null},
          ${!!t.featured}, ${t.bestFor || ""}, ${i}
        )
        ON CONFLICT (id) DO UPDATE SET
          badge = EXCLUDED.badge,
          ribbon = EXCLUDED.ribbon,
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          includes = EXCLUDED.includes,
          duration = EXCLUDED.duration,
          rating = EXCLUDED.rating,
          reviews = EXCLUDED.reviews,
          price = EXCLUDED.price,
          original_price = EXCLUDED.original_price,
          image = EXCLUDED.image,
          image_alt = EXCLUDED.image_alt,
          href_path = EXCLUDED.href_path,
          href_extra = EXCLUDED.href_extra,
          featured = EXCLUDED.featured,
          best_for = EXCLUDED.best_for,
          sort_order = EXCLUDED.sort_order
      `;
    }
    console.log(`Synced ${tours.length} tours.`);
  }

  // 3. Sync Posts
  const posts = readJsonFile("posts.json");
  if (posts && posts.length > 0) {
    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      await sql`
        INSERT INTO posts (
          slug, title, meta_title, meta_description, category, excerpt,
          quick_answer, read_time, date, image, image_alt,
          recommended_tour_id, recommended_tour_after_block, content, sort_order
        ) VALUES (
          ${p.slug}, ${p.title}, ${p.metaTitle}, ${p.metaDescription}, ${p.category},
          ${p.excerpt}, ${p.quickAnswer}, ${p.readTime}, ${p.date}, ${p.image}, ${p.imageAlt},
          ${p.recommendedTourId || ""}, ${p.recommendedTourAfterBlock ?? null},
          ${JSON.stringify(p.content || [])}::jsonb, ${i}
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
          image = EXCLUDED.image,
          image_alt = EXCLUDED.image_alt,
          recommended_tour_id = EXCLUDED.recommended_tour_id,
          recommended_tour_after_block = EXCLUDED.recommended_tour_after_block,
          content = EXCLUDED.content,
          sort_order = EXCLUDED.sort_order
      `;
    }
    console.log(`Synced ${posts.length} blog posts.`);
  }

  console.log("All tables synced with fresh image URLs!");
}

syncAll().catch(console.error);
