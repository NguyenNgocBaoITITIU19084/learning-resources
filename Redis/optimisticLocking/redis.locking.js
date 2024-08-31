"use strict";

const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", function (error) {
  console.log("success connect");
});

const setAsync = promisify(client.setnx).bind(client);
const getAsync = promisify(client.get).bind(client);

const pexpired = promisify(client.pexpire).bind(client);

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

const result = setNX("key", "valueee");
console.log(result.then(console.log));

getAsync("key").then(console.log).catch(console.error);
pexpired("key", 30000).then(console.log).catch(console.error);
