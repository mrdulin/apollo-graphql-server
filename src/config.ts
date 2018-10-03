import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3200,
  HOST: process.env.HOST || "localhost",
  API_ROOT_URL: "https://cnodejs.org/api/v1",
  GRAPHQL_ROUTE: "/graphql",
  GRAPHIQL_ROUTE: "/graphiql",
  GRAPHQL_ENDPOINT: "",
  SUBSCRIPTION_ENDPOINT: "",
  WS_ROUTE: "/subscriptions",
  cnodejs: {
    accessToken: process.env.CNODE_ACCESS_TOKEN || ""
  },
  JWT_SCERET: process.env.JWT_SCERET || "",
  JWT_EXPIRES: process.env.JWT_EXPIRES || "1d",

  MONGO_HOST: process.env.MONGO_HOST || "127.0.0.1",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGODB_APPLICATION_USER: process.env.MONGODB_APPLICATION_USER || "",
  MONGODB_APPLICATION_PASS: process.env.MONGODB_APPLICATION_PASS || "",
  MONGODB_APPLICATION_DATABASE: process.env.MONGODB_APPLICATION_DATABASE || ""
};

config.GRAPHQL_ENDPOINT = `http://${config.HOST}:${config.PORT}${
  config.GRAPHQL_ROUTE
}`;
config.SUBSCRIPTION_ENDPOINT = `ws://localhost:${config.PORT}${
  config.WS_ROUTE
}`;

export { config };
