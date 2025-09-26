// this is for managing a queue of tasks, such as processing uploaded files
// it will use redis for storing the queue and handling retries
export class QueueManager {}

export const queueManager = new QueueManager();
