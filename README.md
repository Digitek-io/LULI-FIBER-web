# Lulifiber Website

This is the Lulifiber marketing website, built with [Next.js](https://nextjs.org) (App Router). It is intended to **replace the current live site at [lulifiber.com](https://lulifiber.com)**.

This README is written for the engineers who will take this project and deploy/update the live site. Please read it fully in particular the **Blog / WordPress integration** section below, since the blog is *not* self-contained in this repo and depends on the current live WordPress install.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Animation:** Framer Motion, GSAP (`ScrollTrigger`)
- **3D/Canvas:** `three`, `@react-three/fiber`, `@react-three/drei` (used for the hero fiber-strand visuals, solution icons, and background particles)
- **Blog content:** Headless WordPress (REST API), fetched at request/build time via `axios`
- **Sanitization:** `isomorphic-dompurify` (used to sanitize raw HTML returned from WordPress before rendering)
- **Language:** TypeScript

---

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# production build
npm run build

# start the production build
npm run start

# lint
npm run lint
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

Node version: the `next` package used here (16.x) requires **Node.js >= 20.9.0**.

---

## Environment variables

Create a `.env.local` file in the project root (this file is git-ignored by default  see `.gitignore`).

| Variable | Required | Used in | Purpose |
|---|---|---|---|
| `N8N_WEBHOOK_URL` | Yes (for lead capture to work) | `app/api/leads/route.ts` | The webhook URL for the n8n workflow that receives form submissions (Contact form, exit-intent popup, newsletter signup). If this variable is missing, the `/api/leads` route will **not** throw an error  it will silently log a warning server-side (`N8N_WEBHOOK_URL is missing. Lead was not forwarded:`) and the lead will be lost. **Make sure this is set in every deployment environment (staging + production), or leads will silently disappear.** |

There are currently no other required environment variables (no API keys for the WordPress blog  see below, it's a plain public REST endpoint).

If you add any new secrets/env vars going forward, please update this table.

---

## ⚠️ Blog / WordPress integration  read before deploying

The `/blog` and `/blog/[slug]` pages do **not** contain any blog content themselves. They fetch live content from a **headless WordPress install that currently lives at `https://lulifiber.com/blog/`** (i.e. WordPress is installed in a *subdirectory* of the current live domain, not on a separate subdomain).

This is configured in **`lib/wordpress.ts`**:

```ts
const WP_API_BASE = "https://lulifiber.com/blog/wp-json/wp/v2";
```

And images pulled from WordPress posts are allow-listed in **`next.config.ts`**:

```ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "lulifiber.com",
      pathname: "/blog/wp-content/uploads/**",
    },
  ],
},
```

### Why this matters for the update

Since this new Next.js site is meant to **replace what's currently deployed at `lulifiber.com`**, you need a plan for what happens to the WordPress install at `lulifiber.com/blog/` when you cut over:

1. **If you point `lulifiber.com` at this Next.js app and WordPress is torn down or moved**, the blog pages (`/blog`, `/blog/[slug]`) will break  `getPosts()` / `getPostBySlug()` in `lib/wordpress.ts` will throw, and blog images will 404 because of the `remotePatterns` hostname restriction. The blog index page has a graceful fallback (`fetchFailed` state → "Couldn't load posts right now"), but blog post pages have no such fallback and will hit Next's error boundary / 404.
2. **The safest path** is to keep WordPress running exactly where it is today (`lulifiber.com/blog/...`) as a separate service/reverse-proxy path, and only swap the *rest* of the site (everything outside `/blog`) over to this Next.js app. Your infra/reverse proxy needs to route `lulifiber.com/blog/*` to the existing WordPress install while everything else goes to this Next.js app.
3. **If WordPress moves to a dedicated subdomain** (e.g. `cms.lulifiber.com`) instead of staying at `lulifiber.com/blog/`, you must update **both**:
   - `WP_API_BASE` in `lib/wordpress.ts`
   - the `hostname` (and `pathname`, if it changes) in the `remotePatterns` array in `next.config.ts`

   Note: old published posts will still reference `lulifiber.com/blog/wp-content/uploads/...` image URLs unless media is migrated too, so **don't remove the old hostname pattern** from `next.config.ts` when adding a new one  keep both until all post content has been re-pointed to the new location.
4. Blog content is revalidated **hourly** (`export const revalidate = 3600` in `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`, driven by `REVALIDATE_SECONDS` in `lib/wordpress.ts`). New WordPress posts will show up within an hour automatically  no rebuild needed. If instant publishing is required later, switch to on-demand revalidation via a WordPress publish webhook calling Next's `revalidatePath`.
5. `wpFetch()` in `lib/wordpress.ts` deliberately uses `axios` (not native `fetch`) with a spoofed browser `User-Agent` and a forced IPv4 agent  this was a workaround for the current host's WAF silently dropping requests it fingerprinted as non-browser traffic. **Don't casually "clean this up" to native fetch** without first confirming the new hosting/WAF setup doesn't have the same issue.

**Bottom line: test the `/blog` and `/blog/[slug]` routes against whatever the final production WordPress URL will be *before* going live**, and confirm blog post images actually render (not just the post list/text).

---

## Content that still needs real data before launch

- **Pricing plans** (`lib/constants.ts` → `LULI_PLANS`): this is currently **placeholder data**. The comment above it explains that the live site's plan grid is populated by client-side JS this project's scraping/extraction couldn't see. **Every speed/price value per city/tier needs to be replaced with the real, current pricing sheet before this goes live**, or the site will publish incorrect prices.
- **About page video** (`app/about/page.tsx`): currently embeds a specific Vimeo video by ID as a placeholder. Confirm this is still the correct video, or swap it for the real one, before launch.
- **Waitlist link** (`lib/constants.ts` → `LINKS.waitlist`): currently an empty string; the actual waitlist CTA on the pricing section links directly to `https://waitlist.lulifiber.com/` instead (hardcoded in `components/sections/Pricing.tsx`). Confirm which of these should be the source of truth.

---

## Lead capture

All three lead-capture surfaces (`components/ui/ContactForm.tsx`, `components/ui/PromoPopup.tsx`, `components/ui/NewsletterForm.tsx`) POST to the internal API route `app/api/leads/route.ts`, which:

- Validates the payload (requires at least an `email` or `phone`)
- Rate-limits by IP (5 submissions / 10 minutes, **in-memory**  this resets on every server restart/redeploy and does **not** work correctly across multiple server instances/regions; if this app is deployed to a multi-instance or serverless-per-request platform, replace this with a shared store, e.g. Redis, before relying on it for abuse protection)
- Forwards the lead to the n8n webhook configured via `N8N_WEBHOOK_URL` (see [Environment variables](#environment-variables) above)

---

## Domain-specific hardcoded values to check on cutover

A few files assume the production domain is `https://lulifiber.com`. If the domain changes, update these:

- `app/layout.tsx`  `metadataBase: new URL("https://lulifiber.com")`
- `app/sitemap.ts`  `BASE_URL`
- `app/robots.ts`  `sitemap: "https://lulifiber.com/sitemap.xml"`
- `lib/wordpress.ts`  `WP_API_BASE` (see Blog section above)
- `next.config.ts`  image `remotePatterns` hostname (see Blog section above)

Also note `app/sitemap.ts` has a `TODO` to merge in real blog post slugs (currently only static routes are listed)  worth wiring up via `getPosts()` before launch for blog SEO.

---

## Design system notes

- Brand colors, light/dark tokens, and shared utility classes (`.glass`, `.btn-primary`, `.btn-secondary`, WordPress content typography under `.wp-content`) all live in `app/globals.css` under `@theme` / `@layer`. Update brand colors there, not by hunting through individual components.
- Site-wide constants (contact info, socials, nav links, legal links, pricing data, coverage area lists) all live in `lib/constants.ts`  update this file rather than editing hardcoded strings across components.
- Dark mode exists in the CSS tokens but is currently **forced to light mode** in `app/layout.tsx` (`forcedTheme="light"`, `enableSystem={false}`). Remove those props if dark mode should be re-enabled for users.

---

## Deployment checklist (recap)

- [ ] Set `N8N_WEBHOOK_URL` in the hosting environment
- [ ] Confirm WordPress blog routing/URL strategy (see Blog section) and test `/blog` + `/blog/[slug]` end-to-end, including images
- [ ] Replace placeholder pricing data in `lib/constants.ts`
- [ ] Confirm the About page Vimeo embed is correct
- [ ] Double-check all `lulifiber.com`-hardcoded values above if the domain/subdomain structure changes
- [ ] Confirm required public assets exist at deploy time: `/icon.png`, `/lulifiber2.png`, `/technician.png`, `/hero.jpeg`, `/panoramicHero.jpeg`, `/review1.jpg`–`/review7.jpg`

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)