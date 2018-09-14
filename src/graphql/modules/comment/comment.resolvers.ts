import { IResolvers } from 'graphql-tools';
import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../../../utils';

const resolvers: IResolvers = {
  Query: {
    commentsByPage: (_, { id, offset, limit }, { services }) => {
      return services.Comment.getByPage(id, offset, limit);
    }
  },
  Mutation: {
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

export default resolvers;
