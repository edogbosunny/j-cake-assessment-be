import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import { dbConfig } from './src/configs/keys';

const port = 5000 || process.env.PORT;

/**
 * Body parser config
 */
const app = express();
app.use(bodyParser.json({
  limit: '2000kb',
}));
app.use(bodyParser.urlencoded({ extended: true }));

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

