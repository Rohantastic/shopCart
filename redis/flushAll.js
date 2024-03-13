const Redis = require('ioredis');

const redis = new Redis();

// Flush all data from Redis memory
module.exports = redis.flushall();
