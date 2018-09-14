import mongoose, { Mongoose } from 'mongoose';

import { config } from '../../config';
import { logger } from '../../utils';

async function MongoConnect(): Promise<Mongoose | undefined> {
  const { MONGO_HOST, MONGO_PORT, MONGO_APPLICATION_DATABASE } = config;
  const uri: string = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_APPLICATION_DATABASE}`;
  mongoose.connection
    .on('connecting', () => {
      logger.info(`trying to establish a connection to mongo, uri address is ${uri}`);
    })
    .on('disconnected', () => {
      logger.info('disconnect mongodb');
    })
    .on('connected', () => {
      logger.info('Connect mongodb successfully');
    })
    .on('error', () => {
      logger.error('Connect mongodb failed');
    });

  return mongoose.connect(
    uri,
    { useNewUrlParser: true }
  );
}

export { MongoConnect };
