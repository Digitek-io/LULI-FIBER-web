import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lulifiber.com",
        pathname: "/blog/wp-content/uploads/**",
      },
      // TODO: if WordPress moves to a subdomain (e.g. cms.lulifiber.com),
      // add that hostname here too -- old post content will still
      // reference the lulifiber.com/blog/... media URLs unless images
      // are migrated, so don't remove the pattern above when that happens.
    ],
  },
};

export default nextConfig;
