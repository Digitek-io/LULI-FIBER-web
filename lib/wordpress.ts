import axios from "axios";
import https from "https";

// Typed client for the headless WordPress blog at lulifiber.com/blog/.
//
// IMPORTANT: WordPress is installed in a *subdirectory* (/blog/), not the
// domain root or a subdomain -- confirmed by wp-content living at
// lulifiber.com/blog/wp-content/. If/when this gets migrated to a
// dedicated subdomain (e.g. cms.lulifiber.com), this is the one constant
// to update -- nothing else in the app should need to change.
const WP_API_BASE = "https://lulifiber.com/blog/wp-json/wp/v2";

// Revalidate hourly -- new posts show up within an hour with zero rebuild.
// Swap to on-demand revalidation (a publish-hook webhook calling
// revalidatePath) later if near-instant publishing matters.
//
// NOTE: axios doesn't integrate with Next's fetch-level caching the way
// native fetch's `next: { revalidate }` option does, so this constant is
// applied as route-segment config (`export const revalidate = ...`) in
// app/blog/page.tsx and app/blog/[slug]/page.tsx instead -- exported here
// so both stay in sync with a single value.
export const REVALIDATE_SECONDS = 3600;

export interface WPMedia {
  source_url: string;
  alt_text: string;
}

export interface WPAuthor {
  name: string;
  avatar_urls?: Record<string, string>;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded?: {
    author?: WPAuthor[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPCategory[][];
  };
}

interface WPListResult<T> {
  items: T[];
  totalPages: number;
  total: number;
}

const httpsAgent = new https.Agent({ family: 4 });

async function wpFetch<T>(
  path: string,
  retries = 2
): Promise<{ data: T; headers: { get: (key: string) => string | null } }> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.get<T>(`${WP_API_BASE}${path}`, {
        timeout: 15_000,
        httpsAgent,
        headers: {
          // A custom/identifying User-Agent (e.g. "Lulifiber-Website/1.0")
          // can itself trip bot-detection on some WAFs -- a standard browser
          // UA string is the safer default here, since the actual issue
          // turned out to be the hosting firewall silently dropping
          // connections it fingerprinted as non-browser traffic (undici's
          // TLS handshake specifically -- axios avoids this by using
          // Node's classic http/https modules instead of undici).
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
      });

      // Normalize axios's header object into the same `.get()` shape the
      // rest of this file already expects (from when this used native
      // fetch's Headers) -- keeps every caller below unchanged.
      const rawHeaders = res.headers as Record<string, string>;
      return {
        data: res.data,
        headers: {
          get: (key: string) => rawHeaders[key.toLowerCase()] ?? null,
        },
      };
    } catch (err) {
      lastError = err;
      // Don't wait after the final attempt
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  throw new Error(
    `Could not reach WordPress at ${WP_API_BASE}${path}. Original error: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`
  );
}

export async function getPosts({
  page = 1,
  perPage = 9,
  categorySlug,
}: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
} = {}): Promise<WPListResult<WPPost>> {
  let categoryId: number | undefined;
  if (categorySlug) {
    const categories = await getCategories();
    categoryId = categories.find((c) => c.slug === categorySlug)?.id;
    // Category slug didn't match anything real -- return empty rather
    // than silently falling back to unfiltered results.
    if (!categoryId) return { items: [], totalPages: 0, total: 0 };
  }

  const params = new URLSearchParams({
    _embed: "1",
    page: String(page),
    per_page: String(perPage),
  });
  if (categoryId) params.set("categories", String(categoryId));

  const { data, headers } = await wpFetch<WPPost[]>(`/posts?${params.toString()}`);

  return {
    items: data,
    totalPages: Number(headers.get("X-WP-TotalPages") ?? 1),
    total: Number(headers.get("X-WP-Total") ?? data.length),
  };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const { data } = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=1`);
  return data[0] ?? null;
}

export async function getCategories(): Promise<WPCategory[]> {
  const { data } = await wpFetch<WPCategory[]>("/categories?per_page=100&hide_empty=true");
  return data;
}

// ---- Small helpers for pulling embedded data out cleanly ----------------

export function getFeaturedImage(post: WPPost): WPMedia | null {
  return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? "Lulifiber";
}

export function getPostCategories(post: WPPost): WPCategory[] {
  return post._embedded?.["wp:term"]?.[0] ?? [];
}

// WordPress excerpts come with a trailing "[&hellip;]" link and HTML tags
// baked in -- strip both for use in plain-text card previews.
export function stripExcerpt(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\[&hellip;\]|\[…\]/g, "…")
    .trim();
}
