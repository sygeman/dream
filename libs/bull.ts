import { Queue } from "bullmq";
import IORedis from "ioredis";
import * as bullConfig from "@/config/bull";

const connection = new IORedis(bullConfig.redisConnection);
export const bullQueue = new Queue(bullConfig.mainQueueName, { connection });
