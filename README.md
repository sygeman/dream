# Dream

## Local dev

Install deps with pnpm 
```
pnpm i
```

Copy and fill env
```
cp .env.example .env.local
```

Run docker compose 
```
docker compose -f ./docker-compose.dev.yml up -d
```

Preparate prisma
```
pnpm dbpush
pnpm generate
```

Run client
```
pnpm dev
```
