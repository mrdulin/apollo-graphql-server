import { Router, Request } from "express";
import {
  graphqlExpress,
  ExpressGraphQLOptionsFunction,
  GraphQLOptions
} from "apollo-server-express";
import { GraphQLError } from "graphql";
import { apolloUploadExpress } from "apollo-upload-server";

import { config } from "../config";
import { schema } from "../graphql";
import { Comment, Book, User, Upload } from "../database/models";
import {
  BookService,
  TopicService,
  CommentService,
  UploadService,
  UserService
} from "../services";
import { bypassAuth, AppError, logger } from "../utils";

function graphqlHandler(): Router {
  const router: Router = Router();
  const {
    cnodejs: { baseUrl }
  } = config;

  const expressGraphQLOptionsFunction: ExpressGraphQLOptionsFunction = (
    req?: Request
  ): GraphQLOptions => {
    const user = { id: "1", name: "123", email: "123@qq.com" };
    const graphqlOptions: GraphQLOptions = {
      schema,
      context: {
        req,
        services: {
          Book: new BookService(Book, user),
          Comment: new CommentService(Comment, user),
          Topic: new TopicService({ baseUrl }),
          User: new UserService(User),
          Upload: new UploadService(Upload, user)
        }
      },
      formatError: (error: GraphQLError) => {
        if (error.originalError) {
          const { code, message } = error.originalError as AppError;

          if (code) {
            return { code, message };
          }
        }

        return new Error("Internal server error");
      },
      tracing: process.env.NODE_ENV !== "production"
    };
    return graphqlOptions;
  };

  router.use(
    config.GRAPHQL_ROUTE,
    apolloUploadExpress(),
    graphqlExpress(expressGraphQLOptionsFunction)
  );

  return router;
}

export { graphqlHandler };
