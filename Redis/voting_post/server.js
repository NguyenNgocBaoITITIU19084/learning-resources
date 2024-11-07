const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const {
  connectRedis,
  setAsync,
  setNXAsync,
  increaseByOne,
  setAddAsync,
  setMembersAsync,
  hashSetAsync,
} = require("./redis.connect");

const { converJSONtoArray } = require("./utils");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const PORT = 3000;

const PRIMARY_USER_KEY = "primary_user_key";
const LIST_USER_ID = "list_user_id";

const PRIMARY_ARTICLE_KEY = "primary_article_key";
const LIST_ARTICLE_ID = "list_article_id";

app.post("/user/", async (req, res) => {
  // generate primary user id
  await setNXAsync(PRIMARY_USER_KEY, 0);

  // create 10 users
  for (let i = 0; i < 10; i++) {
    // increase id by 1 to create new user
    const newUserId = await increaseByOne(PRIMARY_USER_KEY);

    const USER_ID = `userId:${newUserId}`;
    await setAddAsync(LIST_USER_ID, USER_ID);
  }
  return res.json({ message: "success create 10 users" });
});

app.get("/user/", async (req, res) => {
  // get list users
  const listUsers = await setMembersAsync(LIST_USER_ID);
  return res.json(listUsers);
});

app.post("/article/", async (req, res) => {
  const { amount } = req.body;

  // generate primary article id
  await setNXAsync(PRIMARY_ARTICLE_KEY, 0);

  // create 10 articles
  for (let i = 0; i < amount; i++) {
    // increase id by 1 to create new user
    const newArticleId = await increaseByOne(PRIMARY_ARTICLE_KEY);

    const ARTICLE_ID = `articleId:${newArticleId}`;

    const article_infor = {
      id: `${ARTICLE_ID}`,
      title: `title_articleId:${ARTICLE_ID}`,
      poster: `userId:example`,
      time: new Date(),
      vote: 0,
    };
    await hashSetAsync(ARTICLE_ID, converJSONtoArray(article_infor));
  }

  return res.json({ message: "success create 10 articles" });
});

app.use("/", async (req, res) => {
  await setAsync("time:", new Date());
});

app.listen(3000, (req, res) => {
  console.log(`Server Voting Post On Redis running on PORT:${PORT}`);
});
