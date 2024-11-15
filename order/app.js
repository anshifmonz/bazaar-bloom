import express from 'express';
import 'dotenv/config';

import Routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('order service running on http://localhost:' + PORT);
});
