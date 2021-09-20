import express from 'express';
import cors from 'cors';

import routes from './src/routes/index.js';
import config from './config.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(config.logger);
app.use('/contacts', routes.contacts);
app.use('/history', routes.history);
app.set('models', config.models);

const server = app.listen(config.port, config.host, () => {
  console.log(`Basic factorial assesment's back-end listening at http://${config.host}:${config.port}...\n`);
});

export default server;