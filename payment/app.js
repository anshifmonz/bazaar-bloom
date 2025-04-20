import express from 'express';
import 'dotenv/config';

import Routes from './routes/routes.js';
import isAuthenticated from './middleware/authCheckMiddleware.js'
import registerMetrics from './observability/metrics.js';

const app = express();
const PORT = process.env.PORT;

registerMetrics(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(isAuthenticated);

app.use('/', Routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('payment service running on http://localhost:' + PORT);
});
