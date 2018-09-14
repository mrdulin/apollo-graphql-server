import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, { services }) => {
      return services.User.login(email, password);
    },
    register: async (_, { email, name, password }, { services }) => {
      return services.User.register(email, name, password);
    }
  }
};

export { resolvers };
