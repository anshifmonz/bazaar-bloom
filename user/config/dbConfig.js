import pg from "pg";
import 'dotenv/config';

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

db.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})

export {db}
