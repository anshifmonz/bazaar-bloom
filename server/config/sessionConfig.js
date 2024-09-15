import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import 'dotenv/config';

import { db } from './dbConfig.js';

const pgSession = connectPgSimple(session);

const sessionConfig = session({
  store: new pgSession({
    pool: db
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge:  1000 * 60 * 5
  }
})

export default sessionConfig;
