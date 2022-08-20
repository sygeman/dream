# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

FROM node:16-alpine AS runner
WORKDIR /app

ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs dist/apps/spotify-now/.next/standalone ./
COPY --chown=nextjs:nodejs dist/apps/spotify-now/.next/static ./dist/apps/spotify-now/.next/static
COPY --chown=nextjs:nodejs dist/apps/spotify-now/public ./apps/spotify-now/public
COPY --chown=nextjs:nodejs apps/spotify-now/prisma ./prisma

FROM runner as prisma
RUN yarn add prisma --dev
RUN yarn prisma generate

USER nextjs

EXPOSE 3000

CMD ["node", "apps/spotify-now/server.js"]