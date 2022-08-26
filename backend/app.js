import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweet = [];
const tweets = [];
app.post("/sign-up", (req, res) => {
  users.push(req.body);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  tweet.push(req.body);
  const userTweet = users.find((user) => user.username === req.body.username);
  console.log(userTweet);
  tweets.push({
    ...tweets,
    avatar: userTweet.avatar,
    username: req.body.username,
    tweet: req.body.tweet,
  });
  res.send("OK");
});
app.get("/tweets", (req, res) => {
  const avatar = users.find((user) => user.username === tweet.username);

  res.send(tweets);
});
app.listen(5000);
