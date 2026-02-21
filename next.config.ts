import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Base path configuration (for subdirectory deployment)
  basePath: basePath,

  // Asset prefix (if using CDN)
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,

  // Production & security
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: isProduction,

  // Production: standalone output for Docker
  output: 'standalone',

  // Minification: no source maps in production (smaller, more secure)
  productionBrowserSourceMaps: false,

  // Strip console.* in production (keep error/warn for logging)
  compiler: {
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },

  // Image optimization (imageSizes for smaller/UI images, deviceSizes for layout)
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 144, 256, 288, 384, 520],
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
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          ...(isProduction
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
                },
              ]
            : []),
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
