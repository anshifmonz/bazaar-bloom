import express from 'express';
import bodyParser from 'body-parser';
import proxy from 'express-http-proxy';
import 'dotenv/config';

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', proxy('http://user-service:3001'));
app.use('/api/cart', proxy('http://cart-service:3002'));
app.use('/api/product', proxy('http://product-service:3003'));
app.use('/api/favorite', proxy('http://favorite-service:3003'));
app.use('/api/order', proxy('http://order-service:3005'));
app.use('/api/checkout', proxy('http://checkout-service:3006'));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server running on http://localhost:' + PORT);
});
