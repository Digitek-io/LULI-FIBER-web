import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";
import {
  getPostBySlug,
  getPosts,
  getFeaturedImage,
  getAuthorName,
  getPostCategories,
} from "@/lib/wordpress";

export const revalidate = 3600;

// Pre-build the most recent posts at build time; anything older or newer
// renders on first request and gets cached from then on (same
// revalidate window as the index, set in lib/wordpress.ts).
export async function generateStaticParams() {
  try {
    const { items } = await getPosts({ perPage: 20 });
    return items.map((post) => ({ slug: post.slug }));
  } catch (err) {
    // If WordPress is unreachable at build time, don't fail the whole
    // build over it -- posts just render on-demand on first visit instead
    // of being pre-built.
    console.error("Failed to pre-build blog post params:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const image = getFeaturedImage(post);
  const title = post.title.rendered.replace(/<[^>]+>/g, "");

  return {
    title,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: image ? { images: [image.source_url] } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const image = getFeaturedImage(post);
  const categories = getPostCategories(post);
  const author = getAuthorName(post);
  const date = new Date(post.date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // WordPress content is raw HTML from the editor -- never trust it
  // directly, even though it's your own CMS. Sanitize before rendering.
  const cleanContent = DOMPurify.sanitize(post.content.rendered);

  return (
    <main className="px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-signal">
          <FiArrowLeft size={14} />
          Back to blog
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c.id} className="text-xs font-semibold uppercase tracking-wide text-signal">
              {c.name}
            </span>
          ))}
        </div>

        <h1
          className="mt-3 text-3xl font-bold leading-tight sm:text-4xl"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <FiUser size={14} />
            {author}
          </span>
          <span className="flex items-center gap-1.5">
            <FiCalendar size={14} />
            {date}
          </span>
        </div>

        {image && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={image.source_url}
              alt={image.alt_text || ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="wp-content mt-10" dangerouslySetInnerHTML={{ __html: cleanContent }} />
      </article>
    </main>
  );
}