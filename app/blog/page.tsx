import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import {
  getPosts,
  getCategories,
  getFeaturedImage,
  getPostCategories,
  stripExcerpt,
} from "@/lib/wordpress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: "Insightful stories, guides, and updates from Lulifiber.",
};

const PER_PAGE = 9;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page: pageParam, category } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let posts: Awaited<ReturnType<typeof getPosts>>["items"] = [];
  let totalPages = 0;
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let fetchFailed = false;

  try {
    const [postsResult, categoriesResult] = await Promise.all([
      getPosts({ page, perPage: PER_PAGE, categorySlug: category }),
      getCategories(),
    ]);
    posts = postsResult.items;
    totalPages = postsResult.totalPages;
    categories = categoriesResult;
  } catch (err) {
    // Don't take down the whole page if WordPress is temporarily
    // unreachable -- log it server-side and show an empty state instead.
    console.error("Failed to load blog content:", err);
    fetchFailed = true;
  }

  return (
    <main className="px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Blog</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Insightful Stories</h1>
          <p className="mt-4 text-base text-muted">
            Guides, tips, and updates on fiber internet, connectivity, and life online in
            Nigeria.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !category ? "border-signal bg-signal-gradient text-white" : "border-line text-muted hover:text-signal"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog?category=${c.slug}`}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === c.slug
                  ? "border-signal bg-signal-gradient text-white"
                  : "border-line text-muted hover:text-signal"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Post grid */}
        {fetchFailed ? (
          <p className="mt-16 text-center text-sm text-muted">
            Couldn&apos;t load posts right now -- the blog will be back shortly.
          </p>
        ) : posts.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">No posts found in this category yet.</p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const image = getFeaturedImage(post);
              const postCategories = getPostCategories(post);
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="glass group flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-signal/50"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-surface">
                    {image && (
                      <Image
                        src={image.source_url}
                        alt={image.alt_text || post.title.rendered}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {postCategories[0] && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-signal">
                        {postCategories[0].name}
                      </span>
                    )}
                    <h2
                      className="mt-2 text-base font-semibold leading-snug text-fiber"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {stripExcerpt(post.excerpt.rendered).slice(0, 120)}…
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
                      Read more
                      <FiArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${category ? `&category=${category}` : ""}`}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm tabular-nums transition-colors ${
                  p === page ? "bg-signal-gradient text-white" : "text-muted hover:text-signal"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}