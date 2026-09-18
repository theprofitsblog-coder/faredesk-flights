import type { MetadataRoute } from "next";
import { AIRLINES } from "@/lib/airlines";
import { CITIES, citySlug } from "@/lib/cities";
import { SITE_URL } from "@/lib/config";

const url = (path: string) => `${SITE_URL}${path}/`;

// Required for `output: "export"` — emits a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url(""), changeFrequency: "weekly", priority: 1 },
    { url: url("/flights"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/airlines"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/how-it-works"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/faq"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.5 },
    { url: url("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const airlinePages: MetadataRoute.Sitemap = AIRLINES.map((a) => ({
    url: url(`/airlines/${a.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: url(`/flights/${citySlug(c)}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const routePages: MetadataRoute.Sitemap = CITIES.flatMap((origin) =>
    CITIES.filter((d) => d.code !== origin.code).map((destination) => ({
      url: url(`/flights/${citySlug(origin)}/${citySlug(destination)}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }))
  );

  return [...staticPages, ...airlinePages, ...cityPages, ...routePages];
}
