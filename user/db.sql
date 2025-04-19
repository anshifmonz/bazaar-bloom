CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  address JSONB[],
  preferred_currency VARCHAR(10) DEFAULT 'USD',
  language VARCHAR(20) DEFAULT 'en',
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, banned
  is_verified BOOLEAN DEFAULT FALSE,
  role VARCHAR(50) DEFAULT 'user', --user, admin, vendor
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_cards (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  card_token VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE "session" (
  "sid" VARCHAR(44) PRIMARY KEY NOT NULL,
  "sess" JSON NOT NULL,
  "expire" TIMESTAMP(3) NOT NULL
);
