const Redis = require('ioredis');

class RedisModel {
  constructor(redis) {
    this.redis =redis;
  }

  async set(key, value,expire=null) {
    expire? await this.redis.set(key, value): await this.redis.set(key, value,"EX",expire);
  }

  async get(key) {
    return await this.redis.get(key);
  }

  async delete(key) {
    await this.redis.del(key);
  }

  async keys(pattern) {
    return await this.redis.keys(pattern);
  }

  // مثال‌های دیگر عملیات‌ها می‌توانند اضافه شوند
}

module.exports = RedisModel;