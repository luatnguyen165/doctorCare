const redis = require("redis");
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1'
  });

redisClient.on("error", function(error) {
  console.error(error);
});
redisClient.on("connect",()=>{
    console.log("Connect Redis")
})
module.exports =redisClient;
