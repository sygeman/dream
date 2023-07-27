# Dream

## Local dev

Install deps with pnpm 
```
pnpm i
```

Run docker compose 
```
docker compose -f ./docker-compose.dev.yml up -d
```

Preparate prisma
```
pnpm dlx prisma db push
pnpm dlx prisma generate
```

Run client
```
pnpm start client
```
