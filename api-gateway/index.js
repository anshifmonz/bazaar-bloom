import express from 'express';
import proxy from 'express-http-proxy';
import registerMetrics from './observability/metrics.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

registerMetrics(app);

app.get('/health', (_req, res) => res.status(200).send('OK'));

const services = [
  { path: '/api/user',     url: 'http://user-service:3001' },
  { path: '/api/cart',     url: 'http://cart-service:3001' },
  { path: '/api/product',  url: 'http://product-service:3001' },
  { path: '/api/favorite', url: 'http://favorite-service:3001' },
  { path: '/api/order',    url: 'http://order-service:3001' },
  { path: '/api/checkout', url: 'http://checkout-service:3001' },
];

services.forEach(({ path, url }) => {
  app.use(
    path,
    proxy(url, {
      timeout: 5000,
      proxyErrorHandler: (_err, res, _next) => {
        const svc = path.replace('/api/', '');
        res.status(502).json({
          error: 'Bad Gateway',
          service: svc,
          message: `${svc} service is unreachable`,
        });
      }
    })
  );
});

app.all('*', (_req, res) => res.status(404).send('Invalid path'));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server running on http://localhost:' + PORT);
});
