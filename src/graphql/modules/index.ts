import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";

import { logger } from "../../utils";

let typePath = "";
if (process.env.NODE === "production") {
  typePath = path.resolve(__dirname, "./typeDefs/*.graphql");
} else {
  typePath = path.resolve(__dirname, "./**/*.graphql");
}
logger.info(typePath);

const typesArray = fileLoader(typePath);
const typeDefs = mergeTypes(typesArray, { all: true });

const resolverArray = fileLoader(path.resolve(__dirname, "./**/*.resolvers.*"));
const resolvers = mergeResolvers(resolverArray);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
