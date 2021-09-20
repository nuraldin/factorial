import pino from 'express-pino-logger';
import dotenv from 'dotenv';

import { startDB } from './src/services/db/index.js';

dotenv.config();
const port = process.env.LOCAL_SERVER_PORT || 8000;
const host = process.env.HOST || 'localhost';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

const models = await startDB(
  process.env.DB_USER,
  process.env.DB_PASSWORD
);

export default {
  port,
  host,
  logger,
  models
};