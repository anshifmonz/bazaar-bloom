import express from 'express';
import 'dotenv/config';

import sessionConfig from './config/sessionConfig.js';
import passportConfig from './config/passportConfig.js';
import Routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

passportConfig(app);

app.use('/', Routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('auth service running on http://localhost:' + PORT);
});
