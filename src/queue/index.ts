import "dotenv/config";

import queue from "@shared/infra/queue";

queue.process();
