"use strict";

const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
  console.error("Error connected", error);
});

client.on("connect", function (error) {
  console.log("redis connect success");
});

const set = async (key, count) => {
  return new Promise((resolve, reject) => {
    client.set(key, count, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const incrBy = async (key, count) => {
  return new Promise((resolve, reject) => {
    client.incrby(key, count, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const get = async (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const decrBy = async (key, count) => {
  return new Promise((resolve, reject) => {
    client.decrBy(key, count, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const setNX = async (key, count) => {
  return new Promise((resolve, reject) => {
    client.setnx(key, count, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const exists = async (key) => {
  return new Promise((resolve, reject) => {
    client.exists(key, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  set,
  setNX,
  get,
  incrBy,
  decrBy,
  exists,
};
