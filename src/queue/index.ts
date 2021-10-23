import "reflect-metadata";
import "dotenv/config";

import "@shared/container";
import queue from "@shared/infra/queue";
import createConnection from "@shared/infra/typeorm/index";

createConnection().then(() => {
  queue.process();
});
