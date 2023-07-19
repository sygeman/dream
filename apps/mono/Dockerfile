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

COPY --chown=nextjs:nodejs dist/apps/mono/.next/standalone ./
COPY --chown=nextjs:nodejs dist/apps/mono/.next/static ./dist/apps/mono/.next/static
COPY --chown=nextjs:nodejs dist/apps/mono/public ./apps/mono/public

USER nextjs

EXPOSE 3000

CMD ["node", "apps/mono/server.js"]