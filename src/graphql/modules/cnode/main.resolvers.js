module.exports = {
  Query: {
    topics: (_, { qs }, ctx) => {
      return ctx.services.Topic.getHomeTopics(qs);
    },
    topic: (_, { id }, ctx) => {
      return ctx.services.Topic.getTopicById(id);
    }
  }
};
