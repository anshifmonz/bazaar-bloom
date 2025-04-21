import client from 'prom-client';

const SERVICE_NAME = process.env.SERVICE_NAME || 'product-service';
const ENV = process.env.NODE_ENV || 'development';

const registry = new client.Registry();

registry.setDefaultLabels({ service: SERVICE_NAME, env: ENV });

client.collectDefaultMetrics({ register: registry, timeout: 10000 });

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'statusCode'],
  registers: [registry],
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'statusCode'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.3, 1, 5],
  registers: [registry],
});

const httpInflightRequests = new client.Gauge({
  name: 'http_inflight_requests',
  help: 'Number of HTTP requests in progress',
  labelNames: ['method', 'route'],
  registers: [registry],
});

const httpErrorTotal = new client.Counter({
  name: 'http_requests_errors_total',
  help: 'Total number of HTTP 5xx responses',
  labelNames: ['method', 'route', 'statusCode'],
  registers: [registry],
});

// Utility to sanitize route strings for labels
function sanitizeRoute(route) {
  return route.replace(/[\/]+/g, '_') || 'root';
}

/**
 * @param {import('express').Express} app
 * @param {{ metricsPath?: string; includeRoutes?: Array<string|RegExp>; excludeRoutes?: Array<string|RegExp> }} options
 */
function registerMetrics(app, options = {}) {
  const metricsPath = options.metricsPath || '/metrics';
  const includeRoutes = options.includeRoutes || [/^\//];
  const excludeRoutes = options.excludeRoutes || [metricsPath, '/health'];

  app.use((req, res, next) => {
    if (excludeRoutes.some(r => (r instanceof RegExp ? r.test(req.path) : r === req.path))) {
      return next();
    }
    const route = includeRoutes.some(r => (r instanceof RegExp ? r.test(req.path) : r === req.path))
      ? req.route?.path || req.path
      : 'untracked';

    const labels = { method: req.method, route: sanitizeRoute(route) };
    httpInflightRequests.labels(labels.method, labels.route).inc();
    const endTimer = httpRequestDuration.labels({ ...labels, statusCode: '' }).startTimer();

    res.on('finish', () => {
      httpInflightRequests.labels(labels.method, labels.route).dec();
      const statusCode = String(res.statusCode);
      httpRequestsTotal.labels({ ...labels, statusCode }).inc();
      endTimer({ statusCode });
      if (res.statusCode >= 500) {
        httpErrorTotal.labels({ ...labels, statusCode }).inc();
      }
    });
    next();
  });

  app.get(metricsPath, async (_req, res) => {
    try {
      const metrics = await registry.metrics();
      res.setHeader('Content-Type', registry.contentType);
      res.end(metrics);
    } catch (err) {
      res.status(500).end(err.message);
    }
  });
}

export default registerMetrics;
