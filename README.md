# Siam Park Tickets — Homepage (Next.js)

A GetYourGuide affiliate site for Siam Park tickets — a ticket-first
homepage (hero, trust badges, ticket grid, price comparison, FAQ with
schema) plus a full `/admin` content CMS, targeting the focus keyword
"Siam Park Tickets" in the title/H1/meta. General admission, all-inclusive
fast-track, and Loro Parque twin ticket types, by design.

## 1. Install & run locally

Requires Node.js 18.17+.

```bash
cd siam-park-tickets
npm install
npm run dev
```

Open http://localhost:3000. The site works immediately with real starter
content (ticket products, FAQs, blog posts) even before you set up a
database — see "Content storage" below.

## 2. Add your real GetYourGuide affiliate link

Open `lib/data.ts` and replace:

```ts
export const PARTNER_ID = process.env.GYG_PARTNER_ID || "YOUR_PARTNER_ID";
```

with your actual GetYourGuide partner ID (either directly here, or via the
`GYG_PARTNER_ID` value in `.env`). Every "Book Now" button reads from this
one constant. Once you're logged into `/admin`, you can also edit each
ticket's GetYourGuide link path directly from the Tours & Tickets page — no
code changes needed for day-to-day edits.

## 3. Content storage (database is optional to get started)

All admin-editable content (tickets, posts, homepage copy, FAQs, users) is
designed to live in Neon Postgres so a non-technical editor can change it
from `/admin` with the change going live immediately — no rebuild or
redeploy.

**Until you set up a database, the site falls back to the real Siam Park
Tickets starter content baked into `/data` (tickets, FAQs, homepage copy,
and blog posts)** — so it's fully browsable and demo-ready out of the box.
Saving changes from `/admin` won't persist anywhere until `DATABASE_URL` is
set, though — the admin panel will show a "couldn't be reached" error on
save until then.

To turn on the live CMS:

1. Create a free project at [neon.tech](https://neon.tech).
2. Copy Connection Details → "Pooled connection" string into `DATABASE_URL`
   in `.env`.
3. Also add the same `DATABASE_URL` to your Vercel project's Settings →
   Environment Variables (all environments) before deploying.
4. Run: `node scripts/setup-db.mjs` — creates the tables and seeds them
   from the `/data/*.json` files (safe to re-run; only seeds empty tables).
5. Redeploy.

## 4. Admin CMS

Visit `/admin/login`. The owner account is whatever you set
`ADMIN_EMAIL` / `ADMIN_PASSWORD` to in `.env` — there is no built-in
default, so both must be set or the owner account can't log in. From
there you can add editor accounts with access to specific sections (Tours,
Blog Posts, FAQs, Homepage, Privacy Policy, or About/Contact/Blog SEO) from
the Users page.

## 5. Photography

The hero and ticket photography use real, free-to-use photos of water
park slides, wave pools, and tropical wildlife from Unsplash (free for
commercial use, no attribution required). Swap in your own or licensed
photos of Siam Park itself whenever you have them — nothing beats real
photos of the actual experience.

## 6. Before you launch

A few placeholders need your own real values before this goes live:

- `lib/site.ts` → `SITE_URL` — set to whatever domain you actually connect
  in Vercel (currently set to `siamparktickets.com`).
- `app/layout.tsx` → the `G-XXXXXXXXXX` Google Analytics ID (two spots) —
  replace with this site's own GA4 measurement ID. Don't reuse another
  site's ID, or you'll mix both sites' traffic together.
- `.env` → `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` /
  `DATABASE_URL` / `GYG_PARTNER_ID` (see the comments in that file).

## 7. Deploying

Standard Next.js App Router project — deploys as-is to Vercel, Netlify, or
any Node host. `npm run build && npm run start` for a production build.
