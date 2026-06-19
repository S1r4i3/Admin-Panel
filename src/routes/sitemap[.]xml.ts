import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/accounts", changefreq: "weekly", priority: "0.8" },
          { path: "/users", changefreq: "weekly", priority: "0.9" },
          { path: "/ai-jobs", changefreq: "weekly", priority: "0.9" },
          { path: "/analytics", changefreq: "weekly", priority: "0.9" },
          { path: "/cms", changefreq: "weekly", priority: "0.8" },
          { path: "/api-keys", changefreq: "weekly", priority: "0.7" },
          { path: "/credits", changefreq: "weekly", priority: "0.7" },
          { path: "/notifications", changefreq: "weekly", priority: "0.8" },
          { path: "/payments", changefreq: "weekly", priority: "0.9" },
          { path: "/security", changefreq: "weekly", priority: "0.8" },
          { path: "/subscriptions", changefreq: "weekly", priority: "0.9" },
          { path: "/website", changefreq: "weekly", priority: "0.7" },
          { path: "/support", changefreq: "weekly", priority: "0.7" },
          { path: "/settings", changefreq: "weekly", priority: "0.8" },
        ];

        const urls = entries.map((e) => [
          "  <url>",
          `    <loc>${BASE_URL}${e.path}</loc>`,
          e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
          e.priority ? `    <priority>${e.priority}</priority>` : null,
          "  </url>",
        ].filter(Boolean).join("\n"));

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
