const config = {
  PORT: process.env.PORT || 3200,
  HOST: process.env.HOST || 'localhost',
  API_ROOT_URL: 'https://cnodejs.org/api/v1',
  GRAPHQL_ROUTE: '/graphql',
  GRAPHIQL_ROUTE: '/graphiql',
  GRAPHQL_ENDPOINT: '',
  WS_ROUTE: '/subscriptions',
  ENV: process.env.NODE_ENV || 'development',
  cnodejs: {
    accessToken: '426634ce-c482-43d7-a1d6-5271b180a510'
  },
  JWT_SCERET: 'what-the-fuck??',
  JWT_EXPIRES: '1d',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_APPLICATION_DATABASE: process.env.MONGO_APPLICATION_DATABASE || 'react-apollo-grpahql'
};

config.GRAPHQL_ENDPOINT = `http://${config.HOST}:${config.PORT}/${config.GRAPHQL_ROUTE}`;

export { config };
