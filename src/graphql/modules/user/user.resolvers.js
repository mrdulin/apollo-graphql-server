const resolvers = {
  Mutation: {
    login: async (_, { email, password }, { services }) => {
      return services.User.login(email, password);
    },
    register: async (_, { email, name, password }, { services }) => {
      return services.User.register(email, name, password);
    }
  },
  User: {
    __resolveType: obj => {
      if (obj.createdAt) {
        return 'UserProfile';
      }
      if (obj.token) {
        return 'UserAuth';
      }
      return null;
    }
  }
};

module.exports = resolvers;
