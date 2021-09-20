import express from 'express';
import cors from 'cors';
import pino from 'express-pino-logger';
import dotenv from 'dotenv';

import routes from './src/routes/index.js';
import { startDB } from './src/services/db/index.js';

// get environment conf
dotenv.config();
const server_port = process.env.LOCAL_SERVER_PORT || 8000;
const host = process.env.HOST || 'localhost';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

const models = await startDB(
  process.env.DB_USER,
  process.env.DB_PASSWORD
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/contacts', routes.contacts);
app.use('/history', routes.history);
app.set('models', models);

// start server
const server = app.listen(server_port, host, () => {
  console.log(`Basic factorial assesment's back-end listening at http://${host}:${server_port}...\n`);
});

export default server;