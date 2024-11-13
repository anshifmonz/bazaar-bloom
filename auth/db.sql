CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL  CHECK (email <> ''),
  password VARCHAR(255) NOT NULL CHECK (password <> ''),
  role VARCHAR(10) DEFAULT 'user', -- admin or user
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "session" (
  "sid" VARCHAR(44) PRIMARY KEY NOT NULL,
  "sess" json NOT NULL,
  "expire" TIMESTAMP(3) NOT NULL
);
