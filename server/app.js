import express from 'express';
import bodyParser from 'body-parser';
import proxy from 'express-http-proxy';
import 'dotenv/config';

import Routes from './routes/routes.js';

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', proxy('http://user-service:3001'));
app.use('/api/cart', proxy('http://cart-service:3002'));
app.use('/', Routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server running on http://localhost:' + PORT);
});
