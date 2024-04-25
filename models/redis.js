const Redis = require('ioredis');

class RedisModel {
  constructor(redis) {
    this.redis =redis;
  }

  async set(key, value,expire=null) {
    try {
      console.log(value)
      value=JSON.stringify(value)
      expire? await this.redis.set(key, value,"EX",expire): await this.redis.set(key, value);
      
    } catch (err) {
      throw err;  
    }
  }

  async get(key) {
    let result=await this.redis.get(key);
    result=JSON.parse(result)
    return result;
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