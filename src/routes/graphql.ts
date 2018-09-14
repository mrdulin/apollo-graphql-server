import { Router, Request } from 'express';
import { graphqlExpress, ExpressGraphQLOptionsFunction, GraphQLOptions } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { apolloUploadExpress } from 'apollo-upload-server';

import { config } from '../config';
import { schema } from '../graphql';
// import { CNodeConnector } from './graphql/connectors';
import { Comment, Book, User, Upload } from '../database/models';
import { BookService, TopicService, CommentService, UploadService, UserService } from '../services';
import { bypassAuth, AppError, logger } from '../utils';

function graphqlHandler(): Router {
  const router: Router = Router();

  const expressGraphQLOptionsFunction: ExpressGraphQLOptionsFunction = (req?: Request): GraphQLOptions => {
    let user;
    if (req) {
      user = bypassAuth(req);
    }
    const graphqlOptions: GraphQLOptions = {
      schema,
      context: {
        user,
        req,
        conn: {
          // cnode: new CNodeConnector({ API_ROOT_URL: config.API_ROOT_URL })
        },
        services: {
          book: new BookService(Book, user),
          comment: new CommentService(Comment, user),
          topic: new TopicService(),
          user: new UserService(User),
          upload: new UploadService(Upload, user)
        }
      },
      formatError: (error: GraphQLError) => {
        logger.info('formatError');
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
