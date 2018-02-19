import { Router, Request } from 'express';
import { graphqlExpress, ExpressGraphQLOptionsFunction, GraphQLOptions } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { apolloUploadExpress } from 'apollo-upload-server';
import path from 'path';

import { config } from '../config';
import { schema } from './graphql/schema';
import { CNodeConnector } from './graphql/connectors';
import { lowdb, collections } from './database/lowdb';
import { Book, Topic, User, Upload, Comment } from './graphql/models';
import { bypassAuth, AppError } from '../utils';

function graphqlHandler(): Router {
  const router: Router = Router();
  const uploadDir: string = path.resolve(__dirname, '../../../../uploads');

  const expressGraphQLOptionsFunction: ExpressGraphQLOptionsFunction = (req?: Request): GraphQLOptions => {
    const user = bypassAuth(req);
    const graphqlOptions: GraphQLOptions = {
      schema,
      context: {
        user,
        req,
        conn: {
          cnode: new CNodeConnector({ API_ROOT_URL: config.API_ROOT_URL }),
          lowdb
        },
        models: {
          Book: new Book({ collectionName: collections.books.name, user }),
          Comment: new Comment({ collectionName: collections.comments.name, user }),
          Topic: new Topic(),
          User: new User({ collectionName: collections.users.name }),
          Upload: new Upload({ uploadDir, user })
        }
      },
      formatError: (error: GraphQLError) => {
        console.log('formatError');
        if (error.originalError) {
          const { code, message } = error.originalError as AppError;
          return { code, message };
        }

        return error;
      },
      tracing: true
    };
    return graphqlOptions;
  };

  router.use(config.GRAPHQL_ENDPOINT, apolloUploadExpress(), graphqlExpress(expressGraphQLOptionsFunction));

  return router;
}

export { graphqlHandler };
