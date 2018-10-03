const { GraphQLUpload } = require('apollo-upload-server');

const resolvers = {
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

module.exports = resolvers;
