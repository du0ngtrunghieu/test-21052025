# Use fixed version tags, avoid using 'latest'
# Define base image versions
ARG NODE_VERSION=22.14.0
ARG ALPINE_VERSION=3.21
ARG PNPM_VERSION=10.4.1

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS deps
WORKDIR /app

# Copy only dependency-related files to improve cache hit rate
COPY package.json pnpm-lock.yaml ./

# Install pnpm and set up dependencies
RUN npm i -g corepack@latest && \
    corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate && \
    pnpm i --frozen-lockfile --ignore-scripts && \
    # Clean up cache
    pnpm store prune && \
    rm -rf /root/.npm /root/.pnpm-store /tmp/*

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder
WORKDIR /app

# Define build arguments
ARG NUXT_PUBLIC_SITE_URL
ARG NUXT_PUBLIC_SITE_NAME
ARG NUXT_PUBLIC_API_BASE
ARG NUXT_PUBLIC_TYPEWRITER_ENABLED
ARG NUXT_PUBLIC_TYPEWRITER_SPEED

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NODE_ENV=production \
    NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL} \
    NUXT_PUBLIC_SITE_NAME=${NUXT_PUBLIC_SITE_NAME} \
    NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE} \
    NUXT_PUBLIC_TYPEWRITER_ENABLED=${NUXT_PUBLIC_TYPEWRITER_ENABLED} \
    NUXT_PUBLIC_TYPEWRITER_SPEED=${NUXT_PUBLIC_TYPEWRITER_SPEED} \    
    NUXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm i -g corepack@latest && \
    corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate && \
    pnpm build

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner
WORKDIR /app

# Install necessary security updates and tools
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Set production environment
ENV NODE_ENV=production \
    NUXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    # Set Node.js environment parameters
    NODE_OPTIONS="--max-old-space-size=8192"

# Copy build output from builder stage
COPY --from=builder /app/.output ./.output

# Set security-related configurations
RUN chmod -R 550 ./.output && \
    chmod -R 770 ./.output/public && \
    # Remove unnecessary files
    rm -rf /tmp/* /var/cache/apk/* && \
    # Set directory ownership
    chown -R nuxtjs:nodejs .

# Switch to non-root user
USER nuxtjs

# Add labels
LABEL maintainer="support@hieu98.space" \
      version="1.0.0" \
      description="Nuxt Starter" \
      node.version="${NODE_VERSION}"

EXPOSE ${PORT}

# Use exec form for CMD
CMD ["node", ".output/server/index.mjs"]
