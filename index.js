const express = require("express");
const app = express();
const cors = require("cors");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
const axios = require("axios");

// middleware
app.use(cors());
app.use(express.json());

const consumer_key = `oodln5TJZ5T4dLPOxhKKSTGeb`;
const consumer_secret = `DzuYLDGh540lw0CgVxj1Hwn9cCqkAaPXONPTKZc8vVDzh84HND`;
const redirectUri = `https://8959-202-134-8-139.ngrok-free.app/gala/contact`;
// Oauth
const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});
// twitter request token
app.get("/token", async (req, res) => {
  try {
    const requestData = {
      url: "https://api.twitter.com/oauth/request_token",
      method: "POST",
      data: {
        oauth_callback: redirectUri,
      },
    };
    const oauthHeader = oauth.toHeader(oauth.authorize(requestData));
    const response = await axios.post(requestData.url, requestData.data, {
      headers: oauthHeader,
    });
    const responseData = response.data;
    res.send(responseData);
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/", (request, response) => {
  response.send("Hi there, this a simple server for twitter api testing.");
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
