import type { MetadataRoute } from "next";
import { coffees } from "@/lib/products";

const BASE = "https://www.coffeegarden.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/assortiment`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/workshops`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/winkel`, changeFrequency: "monthly", priority: 0.7 },
    ...coffees.map((c) => ({
      url: `${BASE}/assortiment/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
