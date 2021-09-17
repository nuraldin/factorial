import express from 'express';
import cors from 'cors';
import pino from 'express-pino-logger';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import routes from './src/routes/index.js';
import schemas from './src/schemas/index.js';

// get environment conf
dotenv.config();
const server_port = process.env.LOCAL_SERVER_PORT || 8000;
const host = process.env.HOST || 'localhost';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

// connect to DB
await mongoose.connect(`mongodb+srv://${process.env.DB_USER || 'user' }:${process.env.DB_PASSWORD || 'pass' }@cluster0.yimby.mongodb.net/contactsDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
const CurrentContact = db.model('CurrentContact', schemas.ContactSchema);
const ContactRevision = db.model('ContactRevision', schemas.ContactRevisionSchema);

// set up express server
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.set('models', {
  CurrentContact,
  ContactRevision
});
app.use('/contacts', routes.contacts);
app.use('/history', routes.history);

// start server
const server = app.listen(server_port, host, () => {
  console.log(`Basic factorial assesment's back-end listening at http://${host}:${server_port}...\n`);
});

export default server;