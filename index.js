const express = require("express");
const app = express();
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

const consumer_key = `oodln5TJZ5T4dLPOxhKKSTGeb`;
const consumer_secret = `DzuYLDGh540lw0CgVxj1Hwn9cCqkAaPXONPTKZc8vVDzh84HND`;
const redirectUri = encodeURIComponent(
  `https://697f-202-134-14-139.ngrok-free.app/gala/contact`
);
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

const request_data = {
  url: "https://api.twitter.com/oauth/request_token",
  method: "POST",
  data: {
    oauth_callback: redirectUri,
  },
};

const requestData = {
  url: request_data.url,
  method: request_data.method,
  data: request_data.data,
};

const oauth_header = oauth.toHeader(oauth.authorize(requestData));

console.log(oauth_header.Authorization);

app.get("/", (request, response) => {
  response.send("Hi there, this a simple server for twitter api testing.");
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
