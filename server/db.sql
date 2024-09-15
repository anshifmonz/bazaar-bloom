CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL  CHECK (email <> ''),
  password VARCHAR(255) NOT NULL CHECK (password <> ''),
  role VARCHAR(10) DEFAULT 'user', -- admin or user
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES cart(id) ON DELETE CASCADE NOT NULL,
  product_id INT REFERENCES products(id) NOT NULL,
  quantity INT NOT NULL DEFAULT 1
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  product_id INT REFERENCES products(id) NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, cancelled
  total_price DECIMAL(10, 2) CHECK (total_price <> ''),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL CHECK (price_at_purchase <> '')
);

CREATE TABLE "session" (
    "sid" VARCHAR(44) PRIMARY KEY NOT NULL,
    "sess" json NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL
);
