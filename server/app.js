import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';

import sessionConfig from './config/sessionConfig.js';
import passportConfig from './config/passportConfig.js';
import Routes from './routes/routes.js';

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(sessionConfig);
passportConfig(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', Routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server running on http://localhost:' + PORT);
});
