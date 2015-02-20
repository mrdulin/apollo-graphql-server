import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolverArray = fileLoader(path.resolve(__dirname, './**/*.resolvers.*'));
const resolvers = mergeResolvers(resolverArray);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
