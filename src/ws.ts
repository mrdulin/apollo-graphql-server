import { SubscriptionServer, ServerOptions } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import http from 'http';
import https from 'https';

import { schema } from './graphql';
import { logger } from './utils';
import { config } from './config';

function createSubscriptionServer(server: http.Server | https.Server) {
  const serverOptions: ServerOptions = {
    execute,
    subscribe,
    schema,
    onConnect: (connectionParams: any) => {
      logger.info('onConnect');
      return connectionParams;
    },
    onOperation: (message: any, params: any) => {
      logger.info('onOperation');
      return {
        ...params,
        context: {
          ...params.context
        }
      };
    },
    onOperationComplete: () => {
      logger.info('onOperationComplete');
    },
    onDisconnect: () => {
      logger.info('onDisconnect');
    }
  };

  return new SubscriptionServer(serverOptions, { server, path: config.WS_ROUTE });
}

export { createSubscriptionServer };
