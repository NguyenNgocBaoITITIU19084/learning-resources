"use strict";

const redis = require("redis");
const { promisify } = require("util");

const connectRedis = () => {
  const client = redis.createClient();

  client.on("error", function (error) {
    console.error(error);
  });

  client.on("connect", function (error) {
    console.log("Connect Redis Success!");
  });

  return client;
};

const setAsync = async (key, value) => {
  const client = connectRedis();
  const setAsync = promisify(client.set).bind(client);
  await setAsync(key, value).then(console.log).catch(console.log);
};

const setNXAsync = async (key, value) => {
  const client = connectRedis();
  const setNXAsync = promisify(client.setnx).bind(client);
  await setNXAsync(key, value).then(console.log).catch(console.log);
};

const getAsync = async (key) => {
  const client = connectRedis();
  const getAsync = promisify(client.get).bind(client);
  await getAsync(key).then(console.log).catch(console.log);
};

const increaseByOne = async (key) => {
  let currentValue;
  const client = connectRedis();
  const incrAsync = promisify(client.incr).bind(client);
  await incrAsync(key)
    .then((data) => {
      console.log();
      currentValue = data;
    })
    .catch(console.log);
  return currentValue;
};

// SETs

const setAddAsync = async (key, value) => {
  const client = connectRedis();
  const setAddAsync = promisify(client.sadd).bind(client);
  await setAddAsync(key, value).then(console.log).catch(console.log);
};

const setMembersAsync = async (key) => {
  let listMembers;
  const client = connectRedis();
  const setMembersAsync = promisify(client.smembers).bind(client);
  await setMembersAsync(key)
    .then((data) => {
      console.log(data);
      listMembers = data;
    })
    .catch(console.log);
  return listMembers;
};

// HASHs

const hashSetAsync = async (key, keyValuePairs) => {
  const client = connectRedis();
  const hashSetAsync = promisify(client.hset).bind(client);
  await hashSetAsync(key, keyValuePairs).then(console.log).catch(console.log);
};
module.exports = {
  connectRedis,
  setAsync,
  setNXAsync,
  getAsync,
  increaseByOne,
  setAddAsync,
  setMembersAsync,
  hashSetAsync,
};
