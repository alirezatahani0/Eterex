This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Production

- **Env:** Copy `.env.production.example` to `.env.production` (or set in CI/CD). All `NEXT_PUBLIC_*` vars are inlined at build time.
- **Build:** `npm run build` (sets `NODE_ENV=production`).
- **Run:** `npm run start` or use the standalone output with `node server.js` (see Docker).
- **Docker:** `docker-compose up -d --build` or `npm run docker:compose:build`. See [README.DOCKER.md](./README.DOCKER.md).
- **Security:** `next.config.ts` sets security headers, `reactStrictMode`, and disables `X-Powered-By`.
- **Back/forward cache (bfcache):** The **Gapify** chat widget uses a WebSocket; pages with an active WebSocket cannot enter bfcache. The widget is therefore loaded only after the user scrolls ~20% or after 30s, so quick back/forward navigations often don’t open the socket and bfcache can work.
- **Third-party cookies & DevTools Issues:** Analytics and ads (e.g. Yektanet, Mediaad, Matomo) are loaded via **Google Tag Manager** (GTM). They may set third-party cookies (Chrome may block them). Chrome DevTools **Issues** panel can show Cookie/fingerprinting issues for Yektanet (`cdn.yektanet.com`, `ua.yektanet.com`, `audience.yektanet.com`) and Mediaad (`s1.mediaad.org`, `mediacdn.mediaad.org`, `api.mediaad.org`) — these come from GTM tags. To reduce issues: in GTM use first-party storage or server-side tagging where supported, or restrict/remove tags. [Chrome cookie deprecation](https://developer.chrome.com/docs/privacy-sandbox/cookie-deprecation/). For a **404 for cdn.matomo.cloud**, fix or remove the Matomo tag in GTM.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
