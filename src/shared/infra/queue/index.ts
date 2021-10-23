import Queue from "bull";

import redis from "@config/redis";
import * as jobs from "@jobs/index";

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { redis }),
  name: job.key,
  handle: job.handle,
}));

interface IQueue {
  bull: Queue.Queue;
  name: string;
  handle: (data: unknown) => unknown;
}

export default {
  queues,
  add<T>(name: string, data: T) {
    const queue = this.queues.find((q: IQueue) => q.name === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue: IQueue) => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", job.name, job.data);
        console.log(err);
      });
    });
  },
};
