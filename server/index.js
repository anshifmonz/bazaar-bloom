import express from 'express';
import proxy from 'express-http-proxy';
import registerMetrics from './observability/metrics.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

registerMetrics(app);

app.use('/api/user', proxy('http://user-service:3001'));
app.use('/api/cart', proxy('http://cart-service:3001'));
app.use('/api/product', proxy('http://product-service:3001'));
app.use('/api/favorite', proxy('http://favorite-service:3001'));
app.use('/api/order', proxy('http://order-service:3001'));
app.use('/api/checkout', proxy('http://checkout-service:3001'));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server running on http://localhost:' + PORT);
});
