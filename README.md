# Dream

## Local dev

Install deps with bun

```
bun i
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
bunx prisma db push
bunx prisma generate
```

Run client

```
bun dev
```

Update deps

```
NPM_CHECK_INSTALLER=bun bunx npm-check -u
```
