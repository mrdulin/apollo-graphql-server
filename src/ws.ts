import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

function createSubscriptionServer() {
  return new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams, webSocket, context) => {
        console.log('onConnect\n');
        // console.log(connectionParams, context);
        return connectionParams;
      },
      onOperation: (message, params, webSocket) => {
        console.log('onOperation\n');
        // console.log(message, params, webSocket);
        console.log(message);
        return message;
      },
      onOperationDone: webSocket => {
        console.log('onOperationDone');
      },
      onDisconnect: (webSocket, context) => {
        console.log('onDisconnect\n');
      }
    },
    {
      server: httpServer,
      path: wsPath
    }
  );
}

export { createSubscriptionServer };
