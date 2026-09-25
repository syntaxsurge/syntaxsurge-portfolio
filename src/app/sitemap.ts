import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
import { siteHref } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteHref("/"), priority: 1 },
    ...projects.map((project) => ({
      url: siteHref(`/work/${project.id}`),
      priority: 0.8,
    })),
  ];
}
