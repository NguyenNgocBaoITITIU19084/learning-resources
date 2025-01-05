const schedule = require("node-schedule");

const {
  hashSetAsync,
  zAddAsync,
  zRemRangeByRankAsync,
  expireAsync,
  zCardAsync,
  zRangeAsync,
  zRemAsync,
} = require("./redis.connect");
const { converJSONtoArray } = require("./utils");

const TOKEN_KEY = "token_key:";
const RECENT_KEY = "recent_key:";
const VIEW_KEY = "view_key:";

const START_INDEX = 0;
const END_INDEX = -26;

const TIME_EXPIRE = 600;

const SIZE_LIMITED = 50;

let COUNT = 0;

const update_token = async (token, user, item) => {
  const date = new Date();
  const infor = { token, user };
  console.log(infor);
  console.log(converJSONtoArray(infor));

  await hashSetAsync(TOKEN_KEY + token, converJSONtoArray(infor));
  await zAddAsync(RECENT_KEY, [date.getTime(), token]);
  await zAddAsync(VIEW_KEY, [date.getTime(), item]);
  await zRemRangeByRankAsync(VIEW_KEY, START_INDEX, END_INDEX);

  // SET EXPIRE TIME
  await expireAsync(TOKEN_KEY + token, TIME_EXPIRE);
  await expireAsync(RECENT_KEY, TIME_EXPIRE);
  await expireAsync(VIEW_KEY, TIME_EXPIRE);
};

const clean_disk = async (key) => {
  const size = await zCardAsync(key);
  console.log("size:::", size);
  if (size > SIZE_LIMITED) {
    const endIndex = size - SIZE_LIMITED;
    console.log("endIndex", endIndex);

    const listCleanUp = await zRangeAsync(RECENT_KEY, 0, endIndex - 1);
    console.log(listCleanUp);
    await zRemAsync(RECENT_KEY, listCleanUp);
  }
};

const job1 = schedule.scheduleJob("* * * * * *", function () {
  const token = `token-${COUNT++}`;
  const user = `user-${COUNT++}`;
  const item = `item-${COUNT++}`;

  update_token(token, user, item);
});

const job = schedule.scheduleJob(" */10 * * * * *", function async() {
  clean_disk(RECENT_KEY);
});
