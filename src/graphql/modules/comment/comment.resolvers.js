const { withFilter } = require('graphql-subscriptions');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
const resolvers = {
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

module.exports = resolvers;
