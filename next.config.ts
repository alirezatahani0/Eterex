import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  // Base path configuration (for subdirectory deployment)
  basePath: basePath,
  
  // Asset prefix (if using CDN)
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Production optimizations
  output: 'standalone', // Enable standalone output for Docker
  
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-dl.eterex.com',
        pathname: '/icons-v2/svg/**',
      },
      {
        protocol: 'https',
        hostname: 'eterex.com',
        pathname: '/blog/wp-content/uploads/**',
      },
    ],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@tanstack/react-query"],
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        // Cache static assets
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache images
        source: "/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects (if needed)
  async redirects() {
    return [];
  },
};

export default nextConfig;
