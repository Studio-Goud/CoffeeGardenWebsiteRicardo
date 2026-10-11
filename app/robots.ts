import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/afrekenen", "/api/"],
    },
    sitemap: "https://www.coffeegarden.nl/sitemap.xml",
  };
}
