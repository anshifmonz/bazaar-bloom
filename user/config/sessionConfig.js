import session from 'express-session';
import {RedisStore} from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({ url: "redis://redis:6379" });
redisClient.connect().catch(console.error);

const sessionConfig = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge:  1000 * 60 * 60
  }
})

export default sessionConfig;
