import { createClient } from "redis";
import { REDIS_URL } from "../../../config/config.service.js";

export const redisClient = createClient({
  url: REDIS_URL,
});

export async function redisConnection() {
  redisClient
    .connect()
    .then(() => {
      console.log("connected to redis successfully!");
    })
    .catch((err) => {
      console.log("redis connection failed!");
    });
}
