import { Router } from 'express';
import { graphiqlExpress } from 'apollo-server-express';

import { config } from '../config';

function graphiqlHandler() {
  const router = Router();

  router.use(
    config.GRAPHIQL_ENDPOINT,
    graphiqlExpress({
      endpointURL: config.GRAPHQL_ENDPOINT,
      subscriptionsEndpoint: `ws://localhost:${config.PORT}${config.WS_PATH}`
    })
  );

  return router;
}

export { graphiqlHandler };
