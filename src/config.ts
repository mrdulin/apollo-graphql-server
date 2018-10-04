import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3200,
  HOST: process.env.HOST || "localhost",
  ENABLE_GRAPHIQL: process.env.ENABLE_GRAPHIQL || false,
  GRAPHQL_ROUTE: "/graphql",
  GRAPHIQL_ROUTE: "/graphiql",
  GRAPHQL_ENDPOINT: "",
  SUBSCRIPTION_ENDPOINT: "",
  WS_ROUTE: "/subscriptions",
  cnodejs: {
    accessToken: process.env.CNODE_ACCESS_TOKEN || "",
    baseUrl: "https://cnodejs.org/api/v1"
  },
  JWT_SCERET: process.env.JWT_SCERET || "",
  JWT_EXPIRES: process.env.JWT_EXPIRES || "1d",

  MONGODB_HOST: process.env.MONGODB_HOST || "127.0.0.1",
  MONGODB_PORT: process.env.MONGODB_PORT || 27017,
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

console.log("config: ", config);

export { config };
