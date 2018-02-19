import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { config } from './config';

import { createSubscriptionServer } from './ws';
import { graphiqlHandler, graphqlHandler } from './routes';

function main() {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(graphiqlHandler());
  app.use(graphqlHandler());

  return httpServer.listen(config.PORT, () => {
    createSubscriptionServer();
  });
}

export { main };
