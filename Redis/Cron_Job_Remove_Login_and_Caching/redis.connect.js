"use strict";

const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", function (error) {
  console.log("Connect Redis Success!");
});

const expireAsync = async (key, timeInSecond) => {
  const expireAsync = promisify(client.expire).bind(client);
  await expireAsync(key, timeInSecond)
    .then((data) => console.log("expireAsync:::", data))
    .catch(console.log);
};

// STRINGs

const setAsync = async (key, value) => {
  await setAsync(key, value)
    .then((data) => console.log("setASync:::", data))
    .catch(console.log);
};

const setNXAsync = async (key, value) => {
  const setNXAsync = promisify(client.setnx).bind(client);
  await setNXAsync(key, value)
    .then((data) => console.log("setNXAsync:::", data))
    .catch(console.log);
};

const getAsync = async (key) => {
  const getAsync = promisify(client.get).bind(client);
  await getAsync(key)
    .then((data) => console.log("getAsync:::", data))
    .catch(console.log);
};

const increaseByOne = async (key) => {
  let currentValue;
  const incrAsync = promisify(client.incr).bind(client);
  await incrAsync(key)
    .then((data) => {
      console.log("increaseByOne:::", data);
      currentValue = data;
    })
    .catch(console.log);
  return currentValue;
};

// SETs

const setAddAsync = async (key, value) => {
  const setAddAsync = promisify(client.sadd).bind(client);
  await setAddAsync(key, value)
    .then((data) => console.log("setAddAsync:::", data))
    .catch(console.log);
};

const setMembersAsync = async (key) => {
  let listMembers;
  const setMembersAsync = promisify(client.smembers).bind(client);
  await setMembersAsync(key)
    .then((data) => {
      console.log("setMembersAsync:::", data);
      listMembers = data;
    })
    .catch(console.log);
  return listMembers;
};

const setIsMemberAsync = async (key, value) => {
  let result;
  const setIsMemberAsync = promisify(client.sismember).bind(client);
  await setIsMemberAsync(key, value)
    .then((data) => {
      console.log("setIsMemberAsync:::", data);
      result = data;
    })
    .catch(console.log);
  return result;
};
// HASHs

const hashSetAsync = async (key, keyValuePairs) => {
  const hashSetAsync = promisify(client.hset).bind(client);
  await hashSetAsync(key, keyValuePairs)
    .then((data) => console.log("hashSetAsync:::", data))
    .catch(console.log);
};

const hashGetAllAsync = async (key) => {
  let value;
  const hashGetAllAsync = promisify(client.hgetall).bind(client);
  await hashGetAllAsync(key)
    .then((data) => {
      console.log("hashGetAllAsync:::", data);
      value = data;
    })
    .catch(console.log);
  return value;
};

const hashIncreaseByAsync = async (key, field, increment) => {
  const hashIncreaseByAsync = promisify(client.hincrby).bind(client);
  await hashIncreaseByAsync(key, field, increment)
    .then((data) => console.log("hashIncreaseByAsync:::", data))
    .catch(console.log);
};

// ZSETs

const zAddAsync = async (key, keyValuePairs) => {
  const zAddAsync = promisify(client.zadd).bind(client);
  await zAddAsync(key, keyValuePairs)
    .then((data) => console.log("zAddAsync:::", data))
    .catch(console.log);
};

const zRevRangeAsync = async (key, start, stop) => {
  let result;
  const zRevRangeAsync = promisify(client.zrevrange).bind(client);
  await zRevRangeAsync(key, start, stop)
    .then((data) => {
      console.log("zRevRangeAsync:::", data);
      result = data;
    })
    .catch(console.log);
  return result;
};

const zIncreaseByAsync = async (key, increment, member) => {
  const zIncreaseByAsync = promisify(client.zincrby).bind(client);
  await zIncreaseByAsync(key, increment, member)
    .then((data) => console.log("zIncreaseByAsync:::", data))
    .catch(console.log);
};

const zRemRangeByRankAsync = async (key, start, stop) => {
  const zRemRangeByRankAsync = promisify(client.zremrangebyrank).bind(client);
  await zRemRangeByRankAsync(key, start, stop)
    .then((data) => console.log("zRemRangeByRankAsync:::", data))
    .catch(console.log);
};

const zRemAsync = async (key, listMembers) => {
  const zRemAsync = promisify(client.zrem).bind(client);
  await zRemAsync(key, listMembers)
    .then((data) => console.log("zRemAsync:::", data))
    .catch(console.log);
};

const zRangeAsync = async (key, start, stop) => {
  let listResult = [];
  const zRangeAsync = promisify(client.zrange).bind(client);
  await zRangeAsync(key, start, stop)
    .then((data) => {
      console.log("zRangeAsync:::", data);
      listResult = data;
    })
    .catch(console.log);
  return listResult;
};

const zCardAsync = async (key) => {
  let result;
  const zCardAsync = promisify(client.zcard).bind(client);
  await zCardAsync(key)
    .then((data) => {
      console.log("zCardAsync:::", data);
      result = data;
    })
    .catch(console.log);
  return result;
};

module.exports = {
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
  zRemRangeByRankAsync,
  zCardAsync,
  zRemAsync,
  zRangeAsync,
};
