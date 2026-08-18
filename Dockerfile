# syntax=docker/dockerfile:1
#
# PyGate alternate docs — Docusaurus 3, static export to build/.
#
# Single Dockerfile for Coolify's "Application" resource type.
# The image build does everything (install + build); the runtime is
# plain nginx serving static files. No Coolify Build Command needed.
#
# nginx listens on BOTH 80 and 8080 so the deploy works regardless of
# what Coolify's "Port" field is set to (80 is Coolify's default for
# Applications; 8080 is what this repo's compose file maps).

# ---- stage 1: dependencies -------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app

# Coolify injects NODE_ENV=production into the build environment, which
# would make npm skip devDependencies (TypeScript etc.). Docusaurus
# needs them at build time, so force a development install here.
ENV NODE_ENV=development

COPY package.json package-lock.json* ./

# Prefer the deterministic lockfile install; fall back to a plain
# install if the lockfile ever drifts (the same failure mode the rest
# of this monorepo documents in its root Deploy.md).
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# ---- stage 2: build ---------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

# ---- stage 3: runtime -------------------------------------------------
FROM nginx:alpine AS runner

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD sh -c "wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/ || exit 1"

CMD ["nginx", "-g", "daemon off;"]
