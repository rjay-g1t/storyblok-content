// for queue management
// this handles background jobs and retry logic
export const redisConfig = {
  host: 'localhost',
  port: 6379,
  password: 'your_redis_password',
  db: 0,
  keyPrefix: 'your_app_prefix:',
  retryStrategy: (attempts: number) => {
    return Math.min(attempts * 50, 2000);
  },
};
