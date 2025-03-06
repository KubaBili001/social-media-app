import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: config.env.redis.url,
  token: config.env.redis.token,
});

export default redis;
