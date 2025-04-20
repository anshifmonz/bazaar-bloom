import express from 'express';
import 'dotenv/config';

import sessionConfig from './config/sessionConfig.js';
import passportConfig from './config/passportConfig.js';
import registerMetrics from './observability/metrics.js';
import Routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT;

registerMetrics(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

passportConfig(app);

app.use('/', Routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('auth service running on http://localhost:' + PORT);
});
