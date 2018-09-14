import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';

import { logger } from '../../utils';

const typePath = path.join(process.cwd(), './src/graphql/**/*.graphql');

logger.info(typePath);

const typesArray = fileLoader(typePath);
const typeDefs = mergeTypes(typesArray, { all: true });

const resolverArray = fileLoader(path.resolve(process.cwd(), './src/graphql/**/*.resolvers.*'));
const resolvers = mergeResolvers(resolverArray);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
