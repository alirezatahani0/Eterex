# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PUBLIC_API_URL
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_ASSET_PREFIX
ARG NEXT_PUBLIC_ICON_BASE_URL
ARG GOOGLE_VERIFICATION

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Set build-time environment variables
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_PUBLIC_API_URL=${NEXT_PUBLIC_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
ENV NEXT_PUBLIC_ASSET_PREFIX=${NEXT_PUBLIC_ASSET_PREFIX}
ENV NEXT_PUBLIC_ICON_BASE_URL=${NEXT_PUBLIC_ICON_BASE_URL}
ENV GOOGLE_VERIFICATION=${GOOGLE_VERIFICATION}

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Runtime environment variables should be set when running the container
# They are not needed at build time for the runner stage
# Set defaults (can be overridden at runtime)
ENV NEXT_PUBLIC_SITE_URL=https://eterex.com
ENV NEXT_PUBLIC_API_URL=https://api.eterex.com/api
ENV NEXT_PUBLIC_PUBLIC_API_URL=https://publicv2.eterex.com/public/api
ENV NEXT_PUBLIC_BASE_PATH=
ENV NEXT_PUBLIC_ASSET_PREFIX=
ENV NEXT_PUBLIC_ICON_BASE_URL=https://static-dl.eterex.com/icons-v2/svg
ENV GOOGLE_VERIFICATION=

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from standalone build
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

