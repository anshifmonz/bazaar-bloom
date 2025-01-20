import { createClient } from 'redis';

const redisClient = createClient({ url: "redis://redis:6379" });
redisClient.connect().catch(console.error);

export default redisClient;
