import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error(`Redis Client Error: ${err.message}`);
    });
  }

  /**
   * Checks if the Redis client is alive
   * @returns {boolean} true if connected, otherwise false
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Gets the value from Redis by key
   * @param {string} key - Key to look up
   * @returns {promise<string|null>} - Value if not found
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  /**
   * Sets the value in redis with expiration time
   * @param {string} key - The key to set
   * @param {string} value - The value to set
   * @param {number} duration - expiration time
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Deletes a key from redis
   * @param {string} key - Key to be deleted
   * @returns {Promise<void>}
   */
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
