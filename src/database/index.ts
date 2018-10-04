import mongoose, { Mongoose } from "mongoose";

import { config } from "../config";
import { logger } from "../utils";

async function MongoConnect(): Promise<Mongoose | undefined> {
  const {
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_APPLICATION_DATABASE,
    MONGODB_APPLICATION_USER,
    MONGODB_APPLICATION_PASS
  } = config;
  const uri: string = `mongodb://${MONGODB_APPLICATION_USER}:${MONGODB_APPLICATION_PASS}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_APPLICATION_DATABASE}`;
  mongoose.connection
    .on("connecting", () => {
      logger.info(
        `trying to establish a connection to mongo, uri address is ${uri}`
      );
    })
    .on("disconnected", () => {
      logger.info("Disconnect mongodb");
    })
    .on("connected", () => {
      logger.info("Connect mongodb successfully");
    })
    .on("error", () => {
      logger.error("Connect mongodb failed");
    });

  return mongoose.connect(
    uri,
    { useNewUrlParser: true }
  );
}

export { MongoConnect };
