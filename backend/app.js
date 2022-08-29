import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  if (users.find((user) => user.username === username)) {
    res.sendStatus(409);
    return;
  }

  users.push({ username: username, avatar: avatar });

  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const userTweet = users.find((user) => user.username === username);
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  tweets.push({
    avatar: userTweet.avatar,
    username: username,
    tweet: tweet,
  });
  res.status(201).send("OK");
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
  const last10Tweets = get10Tweets();
  res.send(last10Tweets);
});

app.listen(5000);
