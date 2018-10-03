import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import { config } from "./config";
import { logger } from "./utils";
import { createSubscriptionServer } from "./ws";
import { graphiqlHandler, graphqlHandler } from "./routes";

async function bootstrap(): Promise<http.Server> {
  const app: express.Application = express();
  const httpServer: http.Server = createServer(app);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(graphqlHandler());
  if (process.env.NODE_ENV !== "production") {
    app.use(graphiqlHandler());
  }

  return httpServer.listen(config.PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      logger.info(
        `GraphiQL Server is now running on http://localhost:${config.PORT}${
          config.GRAPHIQL_ROUTE
        }`
      );
    } else {
      logger.info(
        `GraphQL Server is now running on ${config.GRAPHQL_ENDPOINT}`
      );
    }
    createSubscriptionServer(httpServer);
  });
}

export { bootstrap };
