import express from 'express';
import 'dotenv/config';

import Routes from './routes/routes.js';
import registerMetrics from './observability/metrics.js';

const app = express();
const PORT = process.env.PORT || 8080;

registerMetrics(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('order service running on http://localhost:' + PORT);
});
