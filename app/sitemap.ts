import type { MetadataRoute } from "next";

const BASE_URL = "https://lulifiber.com";

// TODO: merge in real post slugs too -- fetch getPosts() and map each to
// { url: `${BASE_URL}/blog/${slug}`, lastModified: post.date } so new
// articles show up in the sitemap automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/contact", "/blog", "/acceptable-use", "/terms-of-service"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}