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

const expireAsync = async (key, timeInSecond) => {
  const client = connectRedis();
  const expireAsync = promisify(client.expire).bind(client);
  await expireAsync(key, timeInSecond)
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);
};

// STRINGs

const setAsync = async (key, value) => {
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

const setIsMemberAsync = async (key, value) => {
  let result;
  const client = connectRedis();
  const setIsMemberAsync = promisify(client.sismember).bind(client);
  await setIsMemberAsync(key, value)
    .then((data) => {
      console.log(data);
      result = data;
    })
    .catch(console.log);
  return result;
};
// HASHs

const hashSetAsync = async (key, keyValuePairs) => {
  const client = connectRedis();
  const hashSetAsync = promisify(client.hset).bind(client);
  await hashSetAsync(key, keyValuePairs).then(console.log).catch(console.log);
};

const hashGetAllAsync = async (key) => {
  let value;
  const client = connectRedis();
  const hashGetAllAsync = promisify(client.hgetall).bind(client);
  await hashGetAllAsync(key)
    .then((data) => {
      console.log(data);
      value = data;
    })
    .catch(console.log);
  return value;
};

const hashIncreaseByAsync = async (key, field, increment) => {
  const client = connectRedis();
  const hashIncreaseByAsync = promisify(client.hincrby).bind(client);
  await hashIncreaseByAsync(key, field, increment);
};

// ZSETs

const zAddAsync = async (key, keyValuePairs) => {
  const client = connectRedis();
  const zAddAsync = promisify(client.zadd).bind(client);
  await zAddAsync(key, keyValuePairs).then(console.log).catch(console.log);
};

const zRevRangeAsync = async (key, start, stop) => {
  let result;
  const client = connectRedis();
  const zRevRangeAsync = promisify(client.zrevrange).bind(client);
  await zRevRangeAsync(key, start, stop)
    .then((data) => {
      console.log(data);
      result = data;
    })
    .catch(console.log);
  return result;
};

const zIncreaseByAsync = async (key, increment, member) => {
  const client = connectRedis();
  const zIncreaseByAsync = promisify(client.zincrby).bind(client);
  zIncreaseByAsync(key, increment, member).then(console.log).catch(console.log);
};

module.exports = {
  connectRedis,
  expireAsync,
  setAsync,
  setNXAsync,
  getAsync,
  increaseByOne,
  setAddAsync,
  setMembersAsync,
  setIsMemberAsync,
  hashSetAsync,
  hashGetAllAsync,
  hashIncreaseByAsync,
  zAddAsync,
  zRevRangeAsync,
  zIncreaseByAsync,
};
