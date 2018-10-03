import { bootstrap } from "./app";
import { MongoConnect } from "./database";

function main() {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

  bootstrap();
  MongoConnect();
}

main();
