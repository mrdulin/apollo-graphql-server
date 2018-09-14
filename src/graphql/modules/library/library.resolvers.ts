import { withFilter } from 'graphql-subscriptions';
import { IResolvers } from 'graphql-tools';

import { pubsub } from '../../../utils';

const resolvers: IResolvers = {
  Query: {
    books: (_, args, { services }) => {
      return services.Book.getAll();
    },
    bookById: (_, { id }, { services }) => {
      return services.Book.getById(id);
    },
    commentsByPage: (_, { id, offset, limit }, { services }) => {
      return services.Comment.getByPage(id, offset, limit);
    }
  },
  Mutation: {
    addBook: (_, { book }, { services }) => {
      return services.Book.create(book);
    },
    addComment: (_, { comment }, { services }) => {
      return services.Comment.create(comment);
    }
  },
  Subscription: {
    addComment: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['addComment']),
        (payload, variables) => {
          return payload.bookId === variables.bookId;
        }
      )
    }
  }
};

export { resolvers };
