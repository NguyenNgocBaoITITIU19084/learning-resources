const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const {
  setAsync,
  setNXAsync,
  increaseByOne,
  setAddAsync,
  setMembersAsync,
  hashSetAsync,
  hashGetAllAsync,
  expireAsync,
  zAddAsync,
  zRevRangeAsync,
  setIsMemberAsync,
  hashIncreaseByAsync,
  zIncreaseByAsync,
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

const ZSET_ARTICLE_SCORES = "article:scores";
const ZSET_ARTICLE_TIME = "article:time";

const LIST_ARTICLE_VOTING = "vote:article:";

const SCORE_PER_VOTE = 432;

const EXPIRE_TIME_IN_SECONDS = 3600;

app.post("/user/", async (req, res) => {
  // generate primary user id
  await setNXAsync(PRIMARY_USER_KEY, 0);

  // create 10 users
  for (let i = 0; i < 10; i++) {
    // increase id by 1 to create new user
    const newUserId = await increaseByOne(PRIMARY_USER_KEY);

    const USER_ID = `userId:${newUserId}`;
    await setAddAsync(LIST_USER_ID, USER_ID);
    await expireAsync(LIST_USER_ID, EXPIRE_TIME_IN_SECONDS);
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
    const currentDate = new Date();

    const article_infor = {
      id: `${ARTICLE_ID}`,
      title: `title:${ARTICLE_ID}`,
      poster: `userId:example`,
      time: currentDate,
      vote: 0,
    };

    // save article info, article score, and article posting time
    await hashSetAsync(ARTICLE_ID, converJSONtoArray(article_infor));
    await zAddAsync(ZSET_ARTICLE_TIME, [currentDate.getTime(), ARTICLE_ID]);
    await zAddAsync(ZSET_ARTICLE_SCORES, [
      currentDate.getTime() + SCORE_PER_VOTE * 0,
      ARTICLE_ID,
    ]);

    // set expire time
    await expireAsync(ARTICLE_ID, EXPIRE_TIME_IN_SECONDS);
    await expireAsync(ZSET_ARTICLE_TIME, EXPIRE_TIME_IN_SECONDS);
  }

  return res.json({ message: "success create 10 articles" });
});

app.get("/article/", async (req, res) => {
  const { article_id } = req.body;
  const article = await hashGetAllAsync(article_id);
  return res.json({ article });
});

app.get("/list-articles/", async (req, res) => {
  const { page, amountPerPage } = req.body;
  if (page < 0 || amountPerPage <= 0) {
    return res.json({
      message: "page or amount article per pages must be greater than 0",
    });
  }
  const startIndex = (page - 1) * amountPerPage;
  const endIndex = startIndex + amountPerPage - 1;

  const listArticles = await zRevRangeAsync(
    ZSET_ARTICLE_TIME,
    startIndex,
    endIndex
  );

  let listArticle_Infor = [];
  for (let i = 0; i < listArticles.length; i++) {
    const infor = await hashGetAllAsync(listArticles[i]);
    listArticle_Infor.push(infor);
  }
  return res.json(listArticle_Infor);
});

app.post("/voting/", async (req, res) => {
  const { userId, articleId } = req.body;
  if (!userId || !articleId)
    return res.json({ message: "userId or articleId is invalid!" });

  // check user is in system
  const isExisted = await setIsMemberAsync(LIST_USER_ID, userId);
  if (!isExisted) return res.json({ message: "user is not existed" });

  //check article is in system
  const articleInfor = await hashGetAllAsync(articleId);
  if (!articleInfor) return res.json({ message: "article is not existed" });

  // check user is existed in a list LIST_ARTICLE_VOTING
  // if already existed, mean that user are already voting that article
  // if not, mean that user have voted the article yet
  const isVoted = await setIsMemberAsync(
    LIST_ARTICLE_VOTING + articleId,
    userId
  );
  if (isVoted) return res.json({ message: "already voted" });

  await setAddAsync(LIST_ARTICLE_VOTING + articleId, userId);
  await hashIncreaseByAsync(articleId, "vote", 1);

  await zIncreaseByAsync(ZSET_ARTICLE_SCORES, SCORE_PER_VOTE, articleId);

  return res.json({ message: "voting success" });
});

app.listen(3000, (req, res) => {
  console.log(`Server Voting Post On Redis running on PORT:${PORT}`);
});
