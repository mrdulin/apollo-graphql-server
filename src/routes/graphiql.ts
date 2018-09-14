import { Router } from 'express';
import { graphiqlExpress } from 'apollo-server-express';

import { config } from '../config';

function graphiqlHandler(): Router {
  const router: Router = Router();

  router.use(
    config.GRAPHIQL_ROUTE,
    graphiqlExpress({
      endpointURL: config.GRAPHQL_ROUTE,
      subscriptionsEndpoint: config.SUBSCRIPTION_ENDPOINT
    })
  );

  return router;
}

export { graphiqlHandler };
