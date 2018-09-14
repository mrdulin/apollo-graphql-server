import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

import { config } from './config';

import { createSubscriptionServer } from './ws';
import { graphiqlHandler, graphqlHandler } from './routes';

async function main(): Promise<http.Server> {
  const app: express.Application = express();
  const httpServer: http.Server = createServer(app);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(graphiqlHandler());
  app.use(graphqlHandler());

  return httpServer.listen(config.PORT, () => {
    createSubscriptionServer(httpServer);
  });
}

export { main };
