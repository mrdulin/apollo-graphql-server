import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';

import { logger } from '../../utils';

// const typePath = path.join(__dirname, './src/graphql/**/*.graphql');

const typePath = path.join(__dirname, './**/*.graphql');

logger.info(typePath);

const typesArray = fileLoader(typePath);
const typeDefs = mergeTypes(typesArray, { all: true });

const resolverArray = fileLoader(path.resolve(process.cwd(), './**/*.resolvers.*'));
const resolvers = mergeResolvers(resolverArray);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
