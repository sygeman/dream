import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL);

new Worker(
  'next-queue',
  async ({ name, data }) => {
    await fetch('http://localhost:4200/api/bull', {
      method: 'POST',
      body: JSON.stringify({ name, data }),
    });
  },
  { connection },
);
