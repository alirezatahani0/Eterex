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

