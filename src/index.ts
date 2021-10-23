import "reflect-metadata";

import "dotenv/config";
import createConnection from "@shared/infra/typeorm/index";

import "./shared/container";
import { app as server } from "./shared/infra/http/server";

createConnection()
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(() => {
    process.exit(1);
  });
