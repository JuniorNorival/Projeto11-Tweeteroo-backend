import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweet = [];
const tweets = [];
app.post("/sign-up", (req, res) => {
  if (users.find((user) => user.username === req.body.username)) {
    res.sendStatus(409);
    return;
  }
  users.push(req.body);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  tweet.push(req.body);
  const userTweet = users.find((user) => user.username === req.body.username);

  tweets.push({
    ...tweets,
    avatar: userTweet.avatar,
    username: req.body.username,
    tweet: req.body.tweet,
  });
  res.sendStatus(200);
});
function get10Tweets() {
  const lastTweets = [];
  for (let i = tweets.length - 1; i >= 0; i--) {
    lastTweets.push(tweets[i]);
    if (lastTweets.length === 10) {
      break;
    }
  }
  return lastTweets;
}

app.get("/tweets", (req, res) => {
  res.send(get10Tweets());
});
app.listen(5000);
