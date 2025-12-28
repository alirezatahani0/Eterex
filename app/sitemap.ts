import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eterex.com";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/contact-us",
    "/faq",
    "/terms",
    "/privacy",
  ];

  // Dynamic pages (market data pages)
  const dynamicPages = [
    "/markets/bitcoin",
    "/markets/ethereum",
    "/markets/crypto",
  ];

  const routes = [...staticPages, ...dynamicPages].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/markets") ? "hourly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/markets") ? 0.8 : 0.7,
  }));

  return routes;
}

