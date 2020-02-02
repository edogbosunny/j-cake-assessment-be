import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import { dbConfig } from './src/configs/keys';
import { authentification, profile } from './src/routes'

const port = 5000 || process.env.PORT;

/**
 * Body parser config
 */
const app = express();
dotenv.config({ silent: true });
app.use(bodyParser.json({
  limit: '2000kb',
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', authentification);
app.use('/api/v1/', profile);

/**
 * server config
 */
app.listen(port, () => {
  console.log(`connected on port ${port}`);
});

/**
 * DB Config
 */
mongoose.connect(dbConfig(), {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Mongo DB Connected'))
  .catch((err) => console.log(err));

