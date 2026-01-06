# Docker Deployment Guide

This guide explains how to deploy the Eterex application using Docker.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Variables

- `NEXT_PUBLIC_SITE_URL` - The full URL of your site (e.g., `https://eterex.com`)
  - Used for SEO, sitemap, canonical URLs, and metadata

### Optional Variables

- `NEXT_PUBLIC_BASE_PATH` - Base path for subdirectory deployment (e.g., `/app` or `/eterex`)
  - Leave empty if deploying to root domain
  - If set to `/app`, all routes will be prefixed with `/app`

- `NEXT_PUBLIC_ASSET_PREFIX` - CDN URL for static assets (e.g., `https://cdn.eterex.com`)
  - Leave empty to use the same domain
  - Useful for serving static assets from a CDN

- `NEXT_PUBLIC_API_URL` - Main API base URL (default: `https://api.eterex.com/api`)
  - Used for market data API calls

- `NEXT_PUBLIC_PUBLIC_API_URL` - Public API base URL (default: `https://publicv2.eterex.com/public/api`)
  - Used for assets and price data API calls

- `GOOGLE_VERIFICATION` - Google Search Console verification code
  - Optional, for Google Search Console verification

- `NEXT_PUBLIC_DOWNLOAD_BAZAR` - Cafe Bazaar download URL (default: `https://cafebazaar.ir/app/?id=com.eterex&ref=share`)
- `NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY` - Google Play download URL (default: `https://play.google.com/store/apps/details?id=com.eterex`)
- `NEXT_PUBLIC_DOWNLOAD_MYKET` - Myket download URL (default: `https://myket.ir/app/com.eterex`)
- `NEXT_PUBLIC_DOWNLOAD_DIRECT` - Direct APK download URL (default: `https://static-dl.eterex.com/eterex.apk`)
- `NEXT_PUBLIC_DOWNLOAD_SIBAPP` - Sibapp download URL (default: `https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search`)
- `NEXT_PUBLIC_DOWNLOAD_APPSTAR` - AppStar download URL (default: `https://app-star.store/app.php?id=eterex`)
- `NEXT_PUBLIC_DOWNLOAD_IAPPS` - iApps download URL (default: `https://iapps.ir/app/%D8%A7%D8%AA%D8%B1%D8%A7%DA%A9%D8%B3-%D8%B5%D8%B1%D8%A7%D9%81%DB%8C-%D8%B1%D9%85%D8%B2%D8%A7%D8%B1%D8%B2%D9%87%D8%A7/594739716`)
- `NEXT_PUBLIC_DOWNLOAD_SIBIRANI` - Sibirani download URL (default: `https://sibirani.com/apps/eterex/`)
- `NEXT_PUBLIC_DOWNLOAD_SIBCHE` - Sibche download URL (default: `https://sibche.com/applications/eterax`)
- `NEXT_PUBLIC_DOWNLOAD_PWA` - PWA/web app URL (default: `https://app.eterex.com`)

- `NEXT_PUBLIC_SOCIAL_INSTAGRAM` - Instagram profile URL (default: `https://www.instagram.com/eterexchange?utm_medium=copy_link`)
- `NEXT_PUBLIC_SOCIAL_TELEGRAM` - Telegram channel URL (default: `https://t.me/eterex`)
- `NEXT_PUBLIC_SOCIAL_LINKEDIN` - LinkedIn company page URL (default: `https://www.linkedin.com/company/eterexchange`)
- `NEXT_PUBLIC_SOCIAL_TWITTER` - Twitter/X profile URL (default: `https://x.com/eterex_official`)

- `PORT` - Server port (default: `3000`)
  - Port on which the Next.js server will run

## Building the Docker Image

### Basic Build

```bash
npm run docker:build
```

### Build with Environment Variables

```bash
npm run docker:build:args
```

Or manually:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://eterex.com \
  --build-arg NEXT_PUBLIC_API_URL=https://api.eterex.com/api \
  --build-arg NEXT_PUBLIC_PUBLIC_API_URL=https://publicv2.eterex.com/public/api \
  --build-arg NEXT_PUBLIC_BASE_PATH= \
  --build-arg NEXT_PUBLIC_ASSET_PREFIX= \
  --build-arg GOOGLE_VERIFICATION= \
  --build-arg NEXT_PUBLIC_DOWNLOAD_BAZAR=https://cafebazaar.ir/app/?id=com.eterex&ref=share \
  --build-arg NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY=https://play.google.com/store/apps/details?id=com.eterex \
  --build-arg NEXT_PUBLIC_DOWNLOAD_MYKET=https://myket.ir/app/com.eterex \
  --build-arg NEXT_PUBLIC_DOWNLOAD_DIRECT=https://static-dl.eterex.com/eterex.apk \
  --build-arg NEXT_PUBLIC_DOWNLOAD_SIBAPP=https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search \
  --build-arg NEXT_PUBLIC_DOWNLOAD_APPSTAR=https://app-star.store/app.php?id=eterex \
  --build-arg NEXT_PUBLIC_DOWNLOAD_IAPPS=https://iapps.ir/app/%D8%A7%D8%AA%D8%B1%D8%A7%DA%A9%D8%B3-%D8%B5%D8%B1%D8%A7%D9%81%DB%8C-%D8%B1%D9%85%D8%B2%D8%A7%D8%B1%D8%B2%D9%87%D8%A7/594739716 \
  --build-arg NEXT_PUBLIC_DOWNLOAD_SIBIRANI=https://sibirani.com/apps/eterex/ \
  --build-arg NEXT_PUBLIC_DOWNLOAD_SIBCHE=https://sibche.com/applications/eterax \
  --build-arg NEXT_PUBLIC_DOWNLOAD_PWA=https://app.eterex.com \
  --build-arg NEXT_PUBLIC_SOCIAL_INSTAGRAM=https://www.instagram.com/eterexchange?utm_medium=copy_link \
  --build-arg NEXT_PUBLIC_SOCIAL_TELEGRAM=https://t.me/eterex \
  --build-arg NEXT_PUBLIC_SOCIAL_LINKEDIN=https://www.linkedin.com/company/eterexchange \
  --build-arg NEXT_PUBLIC_SOCIAL_TWITTER=https://x.com/eterex_official \
  -t eterex:latest .
```

## Running the Container

### Using Docker

```bash
npm run docker:run
```

Or manually:

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://eterex.com \
  -e NEXT_PUBLIC_API_URL=https://api.eterex.com/api \
  -e NEXT_PUBLIC_PUBLIC_API_URL=https://publicv2.eterex.com/public/api \
  -e NEXT_PUBLIC_DOWNLOAD_BAZAR=https://cafebazaar.ir/app/?id=com.eterex&ref=share \
  -e NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY=https://play.google.com/store/apps/details?id=com.eterex \
  -e NEXT_PUBLIC_DOWNLOAD_MYKET=https://myket.ir/app/com.eterex \
  -e NEXT_PUBLIC_DOWNLOAD_DIRECT=https://static-dl.eterex.com/eterex.apk \
  -e NEXT_PUBLIC_DOWNLOAD_SIBAPP=https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search \
  -e NEXT_PUBLIC_DOWNLOAD_APPSTAR=https://app-star.store/app.php?id=eterex \
  -e NEXT_PUBLIC_DOWNLOAD_IAPPS=https://iapps.ir/app/%D8%A7%D8%AA%D8%B1%D8%A7%DA%A9%D8%B3-%D8%B5%D8%B1%D8%A7%D9%81%DB%8C-%D8%B1%D9%85%D8%B2%D8%A7%D8%B1%D8%B2%D9%87%D8%A7/594739716 \
  -e NEXT_PUBLIC_DOWNLOAD_SIBIRANI=https://sibirani.com/apps/eterex/ \
  -e NEXT_PUBLIC_DOWNLOAD_SIBCHE=https://sibche.com/applications/eterax \
  -e NEXT_PUBLIC_DOWNLOAD_PWA=https://app.eterex.com \
  -e NEXT_PUBLIC_SOCIAL_INSTAGRAM=https://www.instagram.com/eterexchange?utm_medium=copy_link \
  -e NEXT_PUBLIC_SOCIAL_TELEGRAM=https://t.me/eterex \
  -e NEXT_PUBLIC_SOCIAL_LINKEDIN=https://www.linkedin.com/company/eterexchange \
  -e NEXT_PUBLIC_SOCIAL_TWITTER=https://x.com/eterex_official \
  eterex:latest
```

### Using Docker Compose

1. Create a `.env` file with your environment variables
2. Run:

```bash
npm run docker:compose
```

Or to rebuild:

```bash
npm run docker:compose:build
```

## Deployment Examples

### Root Domain Deployment

```bash
# .env
NEXT_PUBLIC_SITE_URL=https://eterex.com
NEXT_PUBLIC_BASE_PATH=
```

### Subdirectory Deployment

```bash
# .env
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_BASE_PATH=/eterex
```

### With CDN for Assets

```bash
# .env
NEXT_PUBLIC_SITE_URL=https://eterex.com
NEXT_PUBLIC_ASSET_PREFIX=https://cdn.eterex.com
```

## Health Checks

The Docker container includes a health check that verifies the application is running. The health check:

- Runs every 30 seconds
- Has a 10-second timeout
- Retries 3 times before marking as unhealthy
- Starts checking after 40 seconds

## Production Considerations

1. **Security**: The container runs as a non-root user (`nextjs`) for security
2. **Performance**: Uses standalone output mode for optimal Docker deployment
3. **Caching**: Static assets are cached with long-term headers
4. **Compression**: Gzip compression is enabled
5. **Security Headers**: XSS protection, frame options, and other security headers are configured

## Troubleshooting

### Container won't start

- Check that port 3000 is not already in use
- Verify environment variables are set correctly
- Check container logs: `docker logs <container-id>`

### Build fails

- Ensure all required files are present
- Check that `package.json` and `package-lock.json` are in the root
- Verify Node.js version compatibility (requires Node 20+)

### Base path not working

- Ensure `NEXT_PUBLIC_BASE_PATH` starts with `/` (e.g., `/app`)
- Rebuild the image after changing base path
- Verify the base path is set at build time (not just runtime)

