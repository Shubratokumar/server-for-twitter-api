const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send("Hi there, this a simple server for twitter api testing.");
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});