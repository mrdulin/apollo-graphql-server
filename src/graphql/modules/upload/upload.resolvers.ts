import { GraphQLUpload } from 'apollo-upload-server';
import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers = {
  Upload: GraphQLUpload,
  Query: {
    uploads: (_, args, { services }) => {
      return services.Upload.getAll();
    }
  },
  Mutation: {
    singleUpload: (_, { file }, { services }) => {
      return services.Upload.singleUpload(file);
    },
    multipleUpload: async (_, { files }, { services }) => {
      return services.Upload.multipleUpload(files);
    }
  }
};

export default resolvers;
